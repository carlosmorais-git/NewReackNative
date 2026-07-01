@echo off
REM Inicio Aplicativo

echo Chamado do app
SET CAMINHO=C:\seu-diretorio\sua-pasta-do-projeto
SET COMANDO=npm start

start "Aplicativo Base" cmd /k "cd /d "%CAMINHO%" && %COMANDO%"
