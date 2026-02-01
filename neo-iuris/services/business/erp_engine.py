import datetime

class ERPEngine:
    """
    Motor ERP Especializado en Gestión de Proyectos Legales.
    Maneja plazos fatales, silencio administrativo y carga de trabajo.
    """
    
    def __init__(self):
        self.resources = [
            {"id": "L-01", "name": "Lic. Ana García", "role": "Senior Associate", "capacity": 0.8},
            {"id": "L-02", "name": "Ing. Pedro Ruiz", "role": "Regulatory Affairs", "capacity": 0.4}
        ]
        self.projects = [
            {
                "id": "PROJ-101",
                "name": "Alta de Dispositivo Clase II",
                "client": "MedTech Imports",
                "start_date": "2025-01-10",
                "stages": [
                    {"name": "Armado de Dossier", "duration": 15, "assigned_to": "L-02"},
                    {"name": "Ingreso COFEPRIS", "duration": 1, "assigned_to": "L-01"},
                    {"name": "Plazo de Prevención (Legal)", "duration": 40, "assigned_to": "SYSTEM", "type": "WAITING"},
                    {"name": "Resolución", "duration": 5, "assigned_to": "L-01"}
                ]
            }
        ]

    def get_gantt_data(self):
        """Genera estructura de datos para visualización Gantt."""
        timeline = []
        for p in self.projects:
            current_date = datetime.datetime.strptime(p["start_date"], "%Y-%m-%d")
            for stage in p["stages"]:
                end_date = current_date + datetime.timedelta(days=stage["duration"])
                timeline.append({
                    "project": p["name"],
                    "task": stage["name"],
                    "start": current_date.strftime("%Y-%m-%d"),
                    "end": end_date.strftime("%Y-%m-%d"),
                    "resource": stage["assigned_to"],
                    "type": stage.get("type", "WORK")
                })
                current_date = end_date
        return timeline

    def calculate_resource_load(self):
        """Mapa de calor de recursos."""
        load = {r["id"]: 0 for r in self.resources}
        # Mock logic: simply counting tasks assigned
        for p in self.projects:
            for s in p["stages"]:
                if s["assigned_to"] in load:
                    load[s["assigned_to"]] += s["duration"] * 1.5 # Weighting factor
        return load

if __name__ == "__main__":
    erp = ERPEngine()
    print(erp.get_gantt_data())
