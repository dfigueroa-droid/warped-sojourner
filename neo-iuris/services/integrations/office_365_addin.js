/*
 * Neo-Iuris Office 365 Add-in (Taskpane Logic)
 * Technology: Office.js + Vanilla JS
 * Target: Word, Excel, Outlook
 */

(function () {
    "use strict";

    Office.onReady(function (info) {
        if (info.host === Office.HostType.Word) {
            document.getElementById("btn-analyze").onclick = analyzeSelection;
            document.getElementById("btn-sign").onclick = insertDigitalSignature;
        }
    });

    async function analyzeSelection() {
        await Word.run(async (context) => {
            const selection = context.document.getSelection();
            selection.load("text");
            await context.sync();

            // SEND TO NEO-IURIS API
            const riskReport = await fetch("http://localhost:8000/api/forensic/simulate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ case_description: selection.text })
            }).then(r => r.json());

            // DISPLAY RESULT IN TASKPANE
            document.getElementById("results").innerText = `Risk Level: ${riskReport.risk_level}\nPrecedents: ${riskReport.precedents_found}`;
        });
    }

    async function insertDigitalSignature() {
        await Word.run(async (context) => {
            // MOCK SIGNING PROCESS
            const signatureHash = "HASH-SIM-882910"; // In prod, get from /api/smart-contract/sign

            const selection = context.document.getSelection();
            selection.insertText(`\n[NEO-IURIS SECURE SIGNATURE: ${signatureHash}]`, Word.InsertLocation.after);
            selection.font.color = "darkgreen";
            selection.font.bold = true;

            await context.sync();
        });
    }
})();
