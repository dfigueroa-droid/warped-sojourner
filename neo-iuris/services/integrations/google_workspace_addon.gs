/**
 * Neo-Iuris Google Workspace Add-on
 * Target: Google Docs
 */

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Analyze Contract (AI)', 'analyzeContract')
      .addItem('Translate (Legal Certified)', 'translateSelection')
      .addToUi();
}

function analyzeContract() {
  var doc = DocumentApp.getActiveDocument();
  var text = doc.getBody().getText();
  
  // Call Neo-Iuris API
  var payload = {
    "text": text.substring(0, 5000), // Limit for demo
    "standard": "ISO_14001" // Default context
  };
  
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  
  // In production, use real URL. For local dev, we need a tunnel (ngrok)
  // Mocking response for GAS environment
  var response = { "score": 88, "status": "COMPLIANT", "missing": ["Liability Clause"] }; 
  
  showSidebar(response);
}

function showSidebar(data) {
  var html = HtmlService.createHtmlOutput(
    '<style>body { font-family: sans-serif; background: #0f172a; color: #fff; }</style>' +
    '<h3>Neo-Iuris Analysis</h3>' +
    '<p>Score: <strong style="color: #10b981;">' + data.score + '/100</strong></p>' +
    '<p>Status: ' + data.status + '</p>' + 
    '<p>Missing: ' + data.missing.join(", ") + '</p>'
  ).setTitle('Neo-Iuris Intelligence');
  
  DocumentApp.getUi().showSidebar(html);
}

function translateSelection() {
  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var elements = selection.getRangeElements();
    var text = elements[0].getElement().asText().getText();
    
    // Call /api/lab/translate
    // Mock Result
    var translation = "Este acuerdo se rige por las leyes de...";
    
    DocumentApp.getUi().alert("Traducción Certificada: \n\n" + translation);
  } else {
    DocumentApp.getUi().alert("Please select text to translate.");
  }
}
