
import os

class GapAnalysisTool:
    """
    Analyzes the neo-iuris system against the Standards defined in the Knowledge Base.
    Simulates checks for RHEL 8 Compliance (FIPS, SELinux).
    """
    def __init__(self, system_root="."):
        self.system_root = system_root

    def check_docker_hardening(self):
        print("[GapAnalysis] Checking Dockerfiles for Hardening...")
        # Heuristic: Look for non-root user and FIPS-compliant base images (simulation)
        compliance_score = 0
        issues = []

        # Simulated check of the Ingestion Dockerfile created in Phase 1
        dockerfile_path = os.path.join(self.system_root, "services/ingestion-jurimetrica/Dockerfile")
        if os.path.exists(dockerfile_path):
            with open(dockerfile_path, "r") as f:
                content = f.read()
                if "USER appuser" in content:
                    print("  [PASS] Non-root user detected.")
                    compliance_score += 1
                else:
                    issues.append("Container runs as root (Violation of RHEL 8 Security)")
                
                if "fips" not in content.lower():
                    issues.append("Base image does not explicitly state FIPS compliance.")
        
        return compliance_score, issues

    def generate_report(self):
        score, issues = self.check_docker_hardening()
        report = f"""
# System Analysis Report: neo-iuris vs. Strategic Standards
## Compliance Score: {score}/2
## Critical Gaps Identified:
"""
        for issue in issues:
            report += f"- [CRITICAL] {issue}\n"
        
        return report

if __name__ == "__main__":
    tool = GapAnalysisTool()
    print(tool.generate_report())
