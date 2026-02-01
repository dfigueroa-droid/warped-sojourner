@echo off
:: update_inbox.bat
:: Script de una sola acción para guardar y subir cambios

echo --- ACTUALIZANDO REPOSITORIO (UPDATE INBOX) ---
echo Ubicacion: %~dp0
cd /d "%~dp0"

:: 1. Agregar todo
echo.
echo [1/3] Agregando archivos...
git add .

:: 2. Commit con fecha
echo [2/3] Guardando cambios...
set mydate=%date:~6,4%-%date:~3,2%-%date:~0,2%
set mytime=%time:~0,2%-%time:~3,2%
git commit -m "Inbox Update: %mydate% %mytime%"

:: 3. Push
echo [3/3] Subiendo a GitHub...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [EXITO] Todo actualizado.
    color 20
) else (
    echo.
    echo [ERROR] Algo fallo. Ver detalles arriba.
    color 40
)

echo.
echo Presiona cualquier tecla para salir...
pause >nul
