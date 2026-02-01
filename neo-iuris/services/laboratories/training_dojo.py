import random
import datetime

class TrainingDojo:
    """
    Laboratorio: Campo de Entrenamiento Jurídico.
    
    Objective: Train and certify the user in specialized legal areas.
    Methodology: Based on CONOCER Standards & Official CNBV/PLD Curricula.
    
    Initial Program: Oficial de Cumplimiento (CNBV - PLD/FT).
    """

    def __init__(self):
        self.certification_programs = {
            "CNBV_PLD_FT": {
                "title": "Certificación en Prevención de Lavado de Dinero y Financiamiento al Terrorismo",
                "authority": "Comisión Nacional Bancaria y de Valores (CNBV)",
                "areas": [
                    {
                        "id": "AREA_1", 
                        "name": "Conocimientos Básicos en PLD/FT",
                        "topics": ["Conceptos Fundamentales", "Organismos Internacionales (GAFI)", "Autoridades Nacionales"]
                    },
                    {
                        "id": "AREA_2", 
                        "name": "Conocimientos Técnicos",
                        "topics": ["Leyes del Sistema Financiero", "Ley Fintech", "Disposiciones Generales"]
                    },
                    {
                        "id": "AREA_3", 
                        "name": "Auditoría y Enfoque Basado en Riesgos",
                        "topics": ["Metodología de Riesgos", "Evaluación Nacional de Riesgos (ENR)", "Auditoría Interna/Externa"]
                    }
                ]
            }
        }
        self.user_progress = {}

    def enroll_user(self, user_id, program_code="CNBV_PLD_FT"):
        """Enrolls a user in a certification program."""
        if program_code not in self.certification_programs:
            return {"error": "Program not found"}
            
        self.user_progress[user_id] = {
            "program": program_code,
            "enrolled_at": datetime.datetime.now().isoformat(),
            "completed_modules": [],
            "current_score": 0
        }
        return {
            "status": "ENROLLED",
            "program_details": self.certification_programs[program_code]
        }

    def simulate_exam_session(self, user_id, area_id):
        """
        Simulates an evaluation session for a specific knowledge area.
        Includes pedagogical feedback based on 'Competence Standards'.
        """
        if user_id not in self.user_progress:
            return {"error": "User not enrolled"}
            
        # Simulation Logic
        score = random.randint(70, 100)
        feedback = "Competent" if score >= 80 else "Not Yet Competent"
        
        result = {
            "area_tested": area_id,
            "score": score,
            "pedagogical_status": feedback,
            "recommendation": "Advance to next module." if score >= 80 else "Review 'Ley Fintech' and 'GAFI Recommendations'."
        }
        
        if score >= 80:
            self.user_progress[user_id]["completed_modules"].append(area_id)
            
        return result

    def issue_certificate(self, user_id):
        """Issues a simulated CNBV certificate if all areas are passed."""
        progress = self.user_progress.get(user_id)
        if not progress:
            return {"error": "No records found"}
            
        program = self.certification_programs[progress["program"]]
        required_modules = [a["id"] for a in program["areas"]]
        
        if set(progress["completed_modules"]) == set(required_modules):
            return {
                "certificate_id": f"CNBV-{random.randint(10000,99999)}",
                "holder": user_id,
                "title": program["title"],
                "issued_by": "Neo-Iuris Training Dojo (Simulated)",
                "valid_until": (datetime.datetime.now() + datetime.timedelta(days=365*5)).strftime("%Y-%m-%d")
            }
        else:
            return {"status": "INCOMPLETE", "missing_modules": list(set(required_modules) - set(progress["completed_modules"]))}

if __name__ == "__main__":
    dojo = TrainingDojo()
    uid = "abogado_junior"
    print(dojo.enroll_user(uid))
    print(dojo.simulate_exam_session(uid, "AREA_1"))
