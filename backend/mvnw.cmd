@echo off
setlocal
where mvn >nul 2>nul
if %errorlevel% equ 0 (
    call mvn %*
    exit /b %errorlevel%
)

if defined MAVEN_HOME if exist "%MAVEN_HOME%\bin\mvn.cmd" (
    call "%MAVEN_HOME%\bin\mvn.cmd" %*
    exit /b %errorlevel%
)

if defined MVN_HOME if exist "%MVN_HOME%\bin\mvn.cmd" (
    call "%MVN_HOME%\bin\mvn.cmd" %*
    exit /b %errorlevel%
)

echo Maven no encontrado. Instala Maven o define MAVEN_HOME/MVN_HOME.
exit /b 1
endlocal
