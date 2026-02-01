class EdgeAgentManager:
    """
    EJE B.2: Integración Omnipresente (Edge-AI).
    Gestiona agentes desplegados en dispositivos físicos (IoT, Cámaras, Voice Assists).
    """
    def __init__(self):
        self.active_agents = []

    def deploy_agent(self, device_id, capabilities):
        """
        Despliega un micro-modelo a un dispositivo Edge.
        """
        print(f"Deploying Agent to Device: {device_id} with caps: {capabilities}")
        agent = {
            "id": f"EDGE-{device_id}",
            "device": device_id,
            "tasks": capabilities,
            "status": "ONLINE"
        }
        self.active_agents.append(agent)
        return agent

    def receive_telemetry(self, agent_id, data):
        """
        Recibe alertas o datos del borde.
        """
        print(f"Telemetry from {agent_id}: {data}")
        # Lógica de procesamiento (ej. Alertar si una cámara ve una inspección sorpresa)
        if "INSPECTOR_DETECTED" in data.get("event", ""):
            return "TRIGGER_PROTOCOL_RED"
        return "ACK"

if __name__ == "__main__":
    manager = EdgeAgentManager()
    manager.deploy_agent("CAM-RECEPCION-01", ["FACE_RECOGNITION", "UNIFORM_CHECK"])
    resp = manager.receive_telemetry("EDGE-CAM-RECEPCION-01", {"event": "INSPECTOR_DETECTED_COFEPRIS"})
    print(f"System Response: {resp}")
