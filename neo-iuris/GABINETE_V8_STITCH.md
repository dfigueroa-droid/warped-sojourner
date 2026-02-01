# MASTER STITCH KIT: GABINETE DE INTELIGENCIA V8.0
>
> **Architecture Level**: Premium Suite (Role-Based)
> **Target Engine**: Google Stitch (or React/Next.js Vercel Environments)
> **Identity**: dfigueroa.juridico (ROOT)

## 1. Contexto y Rol del Sistema

```text
Eres "Neo-Iuris v8", un ecosistema de defensa corporativa autónoma.
Tu objetivo es gestionar riesgos regulatorios, formular defensas penales y auditar cumplimiento ISO en tiempo real.
Operas bajo una arquitectura "Topológica" donde cada contrato, persona y ley son nodos interconectados.
```

## 2. Master Prompt: Interfaz Principal (Premium Dashboard)

Use este prompt para generar el Dashboard Principal con selectores de Rol y Módulo Topológico.

**Prompt:**

```text
Crea un Dashboard en Next.js (Tailwind CSS) con diseño "Dark Glassmorphism".
1. Barra Superior:
   - Logo "Neo-Iuris v8"
   - Switch de Rol: [User View] vs [Admin View].
   - Al activar "Admin View", muestra métricas de servidor (CPU, Latency) y Logs en vivo.
2. Sección Central (Hero):
   - Título Grande: "Consultoría Forense Preventiva".
   - Input de Búsqueda Transparencia: Valida trámites contra API.
3. Componente "Stitch Interface":
   - Un mapa visual de nodos interactivos (Canvas o Divs absolutos).
   - Al hacer click en un nodo, abre un "Side Panel" de cristal con detalles de riesgo.
4. Grid de Aplicaciones (3 Tarjetas):
   - Gestor Regulatorio (Link a /regulatory).
   - Forensic Shield (Link a /forensic).
   - Compliance Guardian (Link a /compliance).
```

## 3. Sub-Módulo 1: Gestor Regulatorio (DIGIPRiS Auto-Filing)

**Prompt:**

```text
Crea una página `/regulatory` que simule la interfaz de COFEPRIS DIGIPRiS.
- Formulario: Razón Social, Responsable Sanitario, Tipo de Aviso.
- Botón de Acción: "Submit to Bot".
- Feedback: Muestra un JSON de respuesta con "Sello Digital" simulado.
- Barra Lateral: Muestra el componente <StitchInterface /> minimizado.
```

## 4. Sub-Módulo 2: Forensic Shield (Evidence Analysis)

**Prompt:**

```text
Crea una página `/forensic` para análisis de evidencia penal.
- Área de Texto: Para pegar "Hechos de la Demanda".
- Selector: Tipo de Delito (Fraude, Homicidio, Cyber).
- Botón "Analyze": Llama al backend y muestra un reporte generado.
- Reporte Visual: Muestra "Probabilidad de Éxito" (Barra de progreso) y "Cadena de Custodia" (Validada/Rota).
```

## 5. Sub-Módulo 3: Compliance Guardian (ISO Auditor)

**Prompt:**

```text
Crea una página `/compliance` para auditoría industrial.
- Selectores: Planta (Factory), Norma (ISO 14001, NOM-035).
- Botón "Run Audit".
- Resultado: Muestra un "Score Card" (ej. 85/100) y lista de "Riesgos Críticos".
- Visualización: Gráficos de barras simples para cumplimiento documental.
```

## 6. Código Núcleo: Stitch Topological Interface (React)

Si el generador solicita el código base del mapa topológico, proveer este componente:

```tsx
// StitchInterface.tsx
import React, { useState } from 'react';
import { Activity, FileText, User, Scale, X } from 'lucide-react';

// ... (Copiar código de src/components/StitchInterface.tsx) ...
```

## 7. Configuración de API Gateway (Backend Python)

Para que la interfaz funcione, el backend debe exponer estos endpoints:

- `POST /api/regulatory/submit-aviso`
- `POST /api/forensic/generate-report`
- `POST /api/engineering/iso-audit`
- `POST /api/auth/login` (Validando <dfigueroa.juridico@gmail.com>)

## 8. Sub-Módulo 4: Crisis Room (Simulación Biológica & Continuidad)

Este módulo permite simular escenarios catastróficos para probar la resiliencia corporativa.

**Prompt Maestro (Crisis Biológica):**

```text
Crea una página `/crisis/bio-hazard` como un "War Room" Epidemiológico.
- **Interfaz**: Mapa de calor global (estilo Johns Hopkins) superpuesto con ubicaciones de las oficinas corporativas.
- **Input de Configuración**:
  - Patógeno: "Virus X" (R0: 5.2, Letalidad: 3%).
  - Fase: "Contención", "Mitigación", "Ley Marcial".
- **Botón "Ejecutar Simulación"**:
  - Dispara cálculos de impacto en la fuerza laboral (Absentismo predicho).
  - Genera (automáticamente) los borradores legales necesarios:
    1. Comunicados de Fuerza Mayor para proveedores.
    2. Protocolos de Home Office obligatorios (anexos a contratos laborales).
    3. Avisos a la STPS/IMSS.
- **Visual**: Muestra una línea de tiempo regresiva para el "Colapso de Cadena de Suministro".
```

## 9. Sub-Módulo 5: Strategic War Room (M&A & Hostile Takeovers)

Para operaciones corporativas de alto nivel (fusiones, adquisiciones, defensa hostil).

**Prompt Maestro (Corporate Strategy):**

```text
Crea una página `/strategy/war-room` con estética de "Búnker Financiero".
- **Funcionalidad "Due Diligence Expreso"**:
  - Input: Sube todos los PDF financieros y contratos de la empresa objetivo.
  - Output: Detección automática de "Poison Pills" (Cláusulas ocultas de deuda o litigio).
- **Tablero de Ajedrez Legal**:
  - Visualiza a los "Jugadores Clave" (Stakeholders) como piezas en el mapa topológico.
  - Simula movimientos: "¿Qué pasa si activamos la Cláusula de Cambio de Control?".
- **Output Final**: "Deal Memo" ejecutivo en PDF listo para firma del Consejo.
```

## 10. Directrices de Estilo "Suite Premium"

Para asegurar que la IA genere interfaces que se sientan profesionales y no genéricas, añade siempre esta instrucción final:

**System Prompt (Estilo Visual):**

```text
TODAS las interfaces deben seguir el sistema de diseño "Neo-Iuris Executive":
1. **Tipografía**: Usa 'Inter' o 'Roboto Mono' para datos tabulares. Nada de fuentes Serif clásicas.
2. **Paleta de Color**: Fondo Slate-950/Black. Acentos en Emerald-500 (Éxito), Rose-500 (Peligro Crítico/Riesgo), y Cyan-400 (Datos).
3. **Micro-Interacciones**: Los botones nunca son estáticos; deben brillar o escalar al pasar el mouse (hover).
4. **Feedback**: Cualquier acción de usuario (Guardar, Enviar) debe tener confirmación visual inmediata (Toast notification).
5. **Densidad de Información**: Alta. Diseña para expertos, no para usuarios novatos. Usa tablas densas, sparklines (minigráficos) y badges de estado.
```

## 11. Activación de Identidad Híbrida

Para que el sistema reconozca al usuario `dfigueroa` como "General Counsel":

```text
Inyecta en el estado global (Context/Redux):
{
  "user": {
    "email": "dfigueroa.juridico@gmail.com",
    "role": "ROOT_ADMIN",
    "clearance": "LEVEL_5_TOP_SECRET",
    "modules_enabled": ["REGULATORY", "FORENSIC", "COMPLIANCE", "CRISIS_BIO", "M&A_STRATEGY"]
  }
}
```

## 12. Sub-Módulo 6: Neo-Iuris Academy (Learning Portal)

Centro de capacitación y tutoriales para usuarios.

**Prompt Maestro (Academy):**

```text
Crea una página `/academy` con diseño "Learning Management System" (LMS).
- **Layout**: Panel izquierdo con lista de cursos (ej. "Forensic Mastery", "System Basics").
- **Player**: Área central con reproductor de video embed (simulado) y visor de Markdown para guías de texto.
- **Micro-Interacción**: Al completar un módulo, muestra una animación de "Logro Desbloqueado" con confeti.
- **Recursos**: Botón de descarga para manuales en PDF.
```

## 13. Sub-Módulo 7: Universal Repository (Gestor de Archivos)

Bibliotecario universal para evidencia multimedia y legal.

**Prompt Maestro (Repository):**

```text
Crea una página `/repository` que funcione como un Google Drive forense.
- **Grid View**: Tarjetas con iconos de colores según tipo (PDF=Rojo, Video=Azul, Audio=Rosa).
- **Funciones**:
  - Drag & Drop Upload: Área de carga que acepta cualquier formato.
  - Preview Modal: Al hacer click en un archivo, abre un modal oscuro.
    - Si es Video -> Reproductor HTML5.
    - Si es PDF -> Visor de documentos.
    - Si es Email (.eml) -> Renderiza headers y body.
- **Filtros**: Chips superiores para filtrar por "Documentos", "Multimedia", "Evidencia".
```

## 14. Sub-Módulo 8: IP Guardian (Protección Intelectual)

Módulo legal-tech para la defensa de la autoría del software.

**Prompt Maestro (IP Protection):**

```text
Crea una página `/ip/protection` con estética de "Certificación Legal".
- **Dashboard de Evidencia**:
  - Muestra el "Master Hash (SHA-256)" del código fuente actual.
  - Muestra un "Timestamp" atómico (simulado o real).
- **Generador de Manifiestos**:
  - Botón: "Generar Paquete INDAUTOR".
  - Botón: "Generar Paquete IMPI (Diseño Industrial)".
  - Al hacer click, descarga un PDF con los metadatos y capturas de pantalla de la interfaz "Stitch".
- **Sello de Agua**:
  - Visualiza una marca de agua digital "Protected by Neo-Iuris Logic" que flota sobre la interfaz.
```

---
**Instrucciones de Despliegue**:

1. Copie los prompts en su herramienta de generación (Stitch/Gemini).
2. Asegure que la API Python esté corriendo en puerto 8000.
3. Conecte el Frontend al puerto 3000.

```
