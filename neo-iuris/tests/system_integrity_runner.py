import sys
import os
import json
import time
from datetime import datetime

# Adjust path: If running from 'neo-iuris/', we don't need to append '..'.
# If running from 'neo-iuris/tests/', we do.
# Current CWD is 'neo-iuris', so standard imports like 'from services...' should work directly
# BUT if python doesn't see 'services' as a package, it fails.
current_dir = os.getcwd()
if current_dir not in sys.path:
    sys.path.append(current_dir)

# Try explict imports
try:
    from services.laboratories.forensic_simulator import ForensicSimulator
    from services.laboratories.compliance_guardian import ComplianceGuardian
    from services.ip_guardian.copyright_manager import ip_guardian as CopyrightGuardian
    from services.supremacy.JurisdictionManager import jurisdiction_bot
    from services.supremacy.QuantumShield import quantum_guard
    from services.supremacy.LedgerAnchor import ledger_notary
    from services.migration.json_exporter import UniversalJSONExporter
except ImportError as e:
    # If absolute import fails, try relative or adjust path again
    print(f"CRITICAL IMPORT ERROR: {e}")
    # Force add explicit path to 'services' folder if needed, though CWD usually sufficient.
    sys.path.append(os.path.join(current_dir, 'services'))

except ImportError as e:
    print(f"CRITICAL: Import Error - {e}")
    # Continue with available modules or exit depending on severity
    # sys.exit(1)

class OmniProtocolTester:
    def __init__(self):
        self.results = []
        self.base_dir = os.path.dirname(os.path.dirname(__file__))

    def log_result(self, protocol_id, name, status, details=""):
        res = {
            "id": protocol_id,
            "name": name,
            "status": status,
            "timestamp": datetime.now().isoformat(),
            "details": details
        }
        self.results.append(res)
        color = "\033[92m" if status == "PASS" else "\033[91m"
        reset = "\033[0m"
        print(f"[{protocol_id}] {name.ljust(40)} {color}{status}{reset} | {details}")

    def run_all(self):
        print(">>> INICIANDO PROTOCOLO MAESTRO DE PRUEBAS NEO-IURIS V8.0 <<<\n")
        
        # 1. Core Integrity
        self.test_core_integrity()
        
        # 2. Functional Labs
        self.test_labs()
        
        # 3. Supremacy
        self.test_supremacy()
        
        # 4. Portability
        self.test_portability()
        
        self.generate_report()

    def test_core_integrity(self):
        # T-01 Config
        config_path = os.path.join(self.base_dir, "config", "user_identity.json")
        if os.path.exists(config_path):
            self.log_result("T-01", "User Identity Config", "PASS", "File exists")
        else:
            self.log_result("T-01", "User Identity Config", "FAIL", "Missing config")
            
        # T-02 DB/Repo
        repo_path = os.path.join(self.base_dir, "data", "repository")
        if os.path.exists(repo_path):
             self.log_result("T-02", "Repository Storage", "PASS", "Dir exists")
        else:
             self.log_result("T-02", "Repository Storage", "FAIL", "Missing dir")

    def test_labs(self):
        # T-05 Forensic
        try:
            simulator = ForensicSimulator()
            # method signature: generate_report(case_id, evidence_data, methodology, conclusion)
            report = simulator.generate_report(
                "TEST-CASE-001", 
                {"test_val": 100}, 
                "Automated Testing Methodology", 
                "Conclusion: System is operational."
            )
            if "FORENSIC DICTAMEN" in report:
                self.log_result("T-05", "Forensic Simulator", "PASS", "Report Generated")
            else:
                self.log_result("T-05", "Forensic Simulator", "FAIL", "Invalid Output")
        except Exception as e:
            self.log_result("T-05", "Forensic Simulator", "FAIL", str(e))

        # T-06 Compliance
        try:
            guardian = ComplianceGuardian()
            audit = guardian.audit_company("Neo-Tech Corp", "ISO-37301")
            if audit["compliance_score"] > 0:
                self.log_result("T-06", "Compliance Guardian", "PASS", f"Score: {audit['compliance_score']}")
            else:
                self.log_result("T-06", "Compliance Guardian", "FAIL", "Audit Failed")
        except Exception as e:
            self.log_result("T-06", "Compliance Guardian", "FAIL", str(e))

    def test_supremacy(self):
        # T-08 Jurisdiction
        try:
            res = jurisdiction_bot.switch_jurisdiction("EU")
            if res["region"]["framework"] == "GDPR":
                self.log_result("T-08", "Jurisdiction Switch (GDPR)", "PASS", "Active")
            else:
                self.log_result("T-08", "Jurisdiction Switch (GDPR)", "FAIL", "Wrong Region")
        except Exception as e:
            self.log_result("T-08", "Jurisdiction Switch", "FAIL", str(e))

        # T-09 Quantum
        try:
            enc = quantum_guard.encrypt_quantum_safe("Secret Data")
            if "lat::" in enc["ciphertext"]:
                self.log_result("T-09", "Quantum Encryption", "PASS", enc["algorithm"])
            else:
                self.log_result("T-09", "Quantum Encryption", "FAIL", "Bad Ciphertext")
        except Exception as e:
            self.log_result("T-09", "Quantum Encryption", "FAIL", str(e))

        # T-10 Blockchain
        try:
            anchor = ledger_notary.anchor_evidence("hash123", "CASE-001")
            if anchor["status"] == "ANCHORED":
                self.log_result("T-10", "Blockchain Anchoring", "PASS", f"Tx: {anchor['tx_hash'][:10]}...")
            else:
                self.log_result("T-10", "Blockchain Anchoring", "FAIL", "Not Anchored")
        except Exception as e:
            self.log_result("T-10", "Blockchain Anchoring", "FAIL", str(e))

    def test_portability(self):
        # T-11 IP Proof
        try:
            proof = CopyrightGuardian.generate_proof_of_existence()
            if proof["master_hash"]:
                self.log_result("T-11", "IP Proof Generation", "PASS", "Hash Generated")
            else:
                self.log_result("T-11", "IP Proof Generation", "FAIL", "No Hash")
        except Exception as e:
            self.log_result("T-11", "IP Proof Generation", "FAIL", str(e))
            
        # T-12 JSON Export
        try:
            exporter = UniversalJSONExporter(self.base_dir)
            dump = exporter.generate_full_dump()
            if dump["status"] == "success":
                self.log_result("T-12", "Universal JSON Export", "PASS", f"Size: {dump['size_kb']} KB")
            else:
                self.log_result("T-12", "Universal JSON Export", "FAIL", "Export Failed")
        except Exception as e:
            self.log_result("T-12", "Universal JSON Export", "FAIL", str(e))

    def generate_report(self):
        passed = len([x for x in self.results if x["status"] == "PASS"])
        total = len(self.results)
        score = (passed / total) * 100 if total > 0 else 0
        
        print(f"\n>>> RESULTADO FINAL: {score}% DE COBERTURA EXITOSA ({passed}/{total}) <<<")
        
        # Save detailed report
        report_path = os.path.join(self.base_dir, "data", "final_test_report.json")
        with open(report_path, "w") as f:
            json.dump(self.results, f, indent=2)

if __name__ == "__main__":
    tester = OmniProtocolTester()
    tester.run_all()
