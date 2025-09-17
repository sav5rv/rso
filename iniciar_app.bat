@echo off
title INICIAR NUMERADOR RSO

echo Iniciando o Back-end...
start cmd /k "cd C:\Users\Wellington\Documents\proj\rso\rso\back && npm start"

echo Abrindo o Front-end no navegador...
timeout /t 5 >nul
start http://127.0.0.1:3001/

REM start C:\Users\Wellington\Documents\proj\rso\rso\front\index.html

exit