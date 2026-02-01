# Protocolo "The Football": Portabilidad Física de Emergencia (Air-Gapped)

**Estrategia 10**: Ejecución del sistema en aislamiento total mediante hardware físico (USB).

## 1. Hardware Requerido

* **Dispositivo**: USB 3.0 High Speed (Mínimo 64GB) o SSD Externo Rugged.
* **Encriptación**: Hardware-Encrypted (Preferible Kingston IronKey) o BitLocker Software.

## 2. Sistema Operativo Base (Tail OS / Kali Linux)

No usamos Windows estándar por seguridad. Se bootea un Linux "Amnésico".

* **OS**: Tails 5.0 (The Amnesic Incognito Live System).
* **Persistencia**: Configurar partición persistente cifrada LUKS.

## 3. Instalación de Neo-Iuris "Cold"

El sistema se pre-instala en la partición persistente.

### Pasos de Instalación

1. Clonar repositorio: `git clone https://github.com/dfigueroa/neo-iuris.git /persistent/app`
2. Copiar Docker Images (Load Offline):

    ```bash
    docker save neo-iuris-backend > backend.tar
    docker save neo-iuris-frontend > frontend.tar
    # En el USB:
    docker load < backend.tar
    ```

3. Copiar Base de Datos (SQLite/Dump):
    `cp /data/neo.db /persistent/app/data/`

## 4. Procedimiento de Activación (Crisis Mode)

En caso de fallo de red global o necesidad de "War Room" seguro:

1. Insertar USB en cualquier laptop (Windows/Mac/Linux).
2. Reiniciar y entrar al BIOS -> Boot from USB.
3. Desactivar Wi-Fi/Bluetooth (Hardware Switch si existe).
4. Iniciar Tails OS.
5. Abrir Terminal:

    ```bash
    cd /persistent/app
    ./start_emergency_mode.sh
    ```

6. Acceder a `http://localhost:3000` (Local Loopback).

**ESTADO**: El sistema es totalmente funcional sin conexión exterior.
