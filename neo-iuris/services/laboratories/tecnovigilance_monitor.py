import datetime

class TecnoVigilanceMonitor:
    """
    Tecnovigilancia Laboratory.
    
    Legal Framework: 
    - Ley de Infraestructura de la Calidad (2020)
    - NOM-240-SSA1-2012 (Instalación y operación de la tecnovigilancia)
    
    Objective: Monitor adverse events in medical devices and ensure reporting compliance.
    """
    
    def __init__(self):
        self.legal_basis = "Ley de Infraestructura de la Calidad (Art 3, 10, 30)"
        self.severity_levels = {
            "MILD": "No injury or transient injury.",
            "MODERATE": "Reversible injury requiring intervention.",
            "SERIOUS": "Death, life-threatening, or permanent damage."
        }
        
    def assess_incident(self, incident_data):
        """
        Evaluates an incident to determine if it requires a 'Reporte Inicial'.
        """
        device_type = incident_data.get("device_type")
        severity = incident_data.get("severity", "MILD")
        
        report_required = False
        deadline_hours = 0
        
        # NOM-240 Logic
        if severity == "SERIOUS" or severity == "DEATH":
            report_required = True
            deadline_hours = 48 # Immediate reporting
        elif device_type in ["Class III", "Implantable"]:
            report_required = True
            deadline_hours = 120 # 5 days
            
        return {
            "incident_id": incident_data.get("id"),
            "legal_basis": self.legal_basis,
            "report_required": report_required,
            "deadline_hours": deadline_hours,
            "action": "NOTIFY_COFEPRIS" if report_required else "INTERNAL_LOG"
        }

    def generate_annual_report(self, incidents):
        """Generates the Annual Technovigilance Report for the Sanitary Registry holder."""
        total = len(incidents)
        serious = sum(1 for i in incidents if i.get("severity") == "SERIOUS")
        
        return {
            "report_type": "INFORME_ANUAL_TECNOVIGILANCIA",
            "period": datetime.datetime.now().year,
            "total_incidents": total,
            "serious_events": serious,
            "compliance_status": "COMPLIANT" if serious == 0 else "REVIEW_REQUIRED"
        }

if __name__ == "__main__":
    monitor = TecnoVigilanceMonitor()
    alert = {"id": "INC-2025-001", "device_type": "Pacemaker (Class III)", "severity": "MODERATE"}
    print(monitor.assess_incident(alert))
