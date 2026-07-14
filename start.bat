@echo off
REM Inicio API

echo Chamado do backend
SET CAMINHO=C:\Users\carlo\Documents\GitHub\_Aplicativo\NewReackNative\api
SET COMANDO=npm run dev

start "Aplicativo Base" cmd /k "cd /d "%CAMINHO%" && %COMANDO%"

@echo off
REM Inicio Aplicativo

echo Chamado do app
SET CAMINHO=C:\Users\carlo\Documents\GitHub\_Aplicativo\NewReackNative
SET COMANDO=npm start

start "Aplicativo Base" cmd /k "cd /d "%CAMINHO%" && %COMANDO%"
