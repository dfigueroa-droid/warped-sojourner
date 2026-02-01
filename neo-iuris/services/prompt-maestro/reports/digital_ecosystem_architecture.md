# Digital Ecosystem Architecture (Vision 2030)

This document defines the technical architecture for the **Neo-Iuris Digital Ecosystem**, enabling the transition to a "Consultor Forense Preventivo" model.

## 1. High-Level Topology: The "Trinity" Architecture

The system is organized into three primary Application Modules ("The Trinity") served by a unified **LegalTech Interface**.

```mermaid
graph TD
    User((User/Client)) -->|HTTPS| UI[Neo-Iuris UI (Next.js)]
    UI -->|Auth| ID[Identity Core (Hybrid)]
    
    subgraph "The Trinity (Application Modules)"
        UI -->|Route: /regulatory| APP1[Gestor Regulatorio]
        UI -->|Route: /forensic| APP2[Forensic Shield]
        UI -->|Route: /compliance| APP3[Compliance Guardian]
    end
    
    APP1 -->|API| BE[Python Backend (FastAPI/Flask)]
    APP2 -->|API| BE
    APP3 -->|API| BE
    
    BE -->|Query| UL[Universal Librarian]
    BE -->|Fetch| GC[Global Connectors]
    BE -->|Simulate| FS[Forensic Simulator]
```

## 2. Component Specifications

### 2.1. Frontend: Neo-Iuris UI (`neo-iuris-ui`)

- **Framework**: Next.js 14 (App Router).
- **Styling**: Tailwind CSS (Premium Dark Mode, Glassmorphism).
- **Language**: TypeScript.
- **Role**:
  - Unified Dashboard for `dfigueroa.juridico@gmail.com`.
  - Client portals for status tracking.
  - Visualization of "Risk Maps" and "Forensic Reports".

### 2.2. Backend: Pan-Heuristic State Engine

- **Existing**: `forensic_simulator.py`, `bioethics_filter.py`.
- **New**: API Endpoints to serve the UI.
- **Integration**:
  - **Gestor Regulatorio**: Python scripts to fill PDFs/XMLs.
  - **Forensic Shield**: Invokes `forensic_simulator.py` with Global Data.

### 2.3. Identity Core

- **Configuration**: `hybrid_identity_config.json`.
- **Logic**: Simulates Federation between Google Workspace (Gmail) and Azure Entra ID.
- **Policy**:
  - `dfigueroa.juridico`: Root Admin.
  - Clients: Read-Only or Upload-Only access.

## 3. Data Flow

1. **Ingestion**: Global Connectors (USA, China, etc.) fetch macro-economic data.
2. **Synthesis**: `Forensic Simulator` combines Master Data with Client Data (e.g., Hospital Logs).
3. **Presentation**: UI renders "Evidence Integrity" and "Compliance Scores".

## 4. Security & Compliance

- **Audit Trails**: All UI actions logged to `forensic_logs`.
- **Data Sovereignty**: Local processing of sensitive medical data (simulated).
