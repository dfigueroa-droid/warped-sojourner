# Informe Complementario de Marco Legal y Estándares de Seguridad (RHEL 8)

## 1. Introducción a la Arquitectura de Seguridad

Infraestructura basada en RHEL 8 para cumplimiento de certificaciones de seguridad...

## 2. Diseño de la Instalación y Estrategias

2.1. Instalación basada en red (HTTPS) y verificación de checksums.
2.2. Particionamiento: Separación de `/boot`, `/home`, y `/var/log/audit`.
2.3. Kickstart para estandarización y OpenSCAP para validación.
2.4. Instalación Mínima para reducir superficie de ataque.

## 4. Criptografía y Protección de Datos

4.1. Políticas Criptográficas: Nivel **FIPS** mandatorio para cumplimiento normativo.
4.2. Cifrado LUKS2 con NBDE (Tang/Clevis) para desbloqueo seguro en red.

## 5. Control de Acceso (SELinux)

Modo **Enforcing** obligatorio para confinar procesos.

## 6. Auditoría Forense

`auditd` en modo **Inmutable** para garantizar integridad de evidencia legal.

## 10. Conclusiones y Recomendaciones

- Adopción Mandatoria de FIPS.
- Implementación de STONITH para Alta Disponibilidad.
- Automatización con OpenSCAP.
