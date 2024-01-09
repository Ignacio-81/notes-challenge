REM Set MySQL credentials from command-line parameters
if "%1"=="" (
    echo Usage: %0 ^<MYSQL_USER^> ^<MYSQL_PASSWORD^>
    exit /b 1
)

REM Set MySQL credentials from command-line parameters
set MYSQL_USER=%1
set MYSQL_PASSWORD=%2

set DATABASE_NAME=newNotes
pause
REM Set the path to your MySQL bin directory
set MYSQL_BIN_PATH="C:\Program Files\MySQL\MySQL Server 8.0\bin
pause
REM Create the database
%MYSQL_BIN_PATH%\mysql" -u %MYSQL_USER% -p%MYSQL_PASSWORD% -e "CREATE DATABASE %DATABASE_NAME%;"
pause
REM Use the database
%MYSQL_BIN_PATH%\mysql" -u %MYSQL_USER% -p%MYSQL_PASSWORD% -e "USE %DATABASE_NAME%;"
pause
REM Create tables and schema
%MYSQL_BIN_PATH%\mysql" -u %MYSQL_USER% -p%MYSQL_PASSWORD% %DATABASE_NAME% < create_table.sql
pause
echo Database and schema creation complete.
echo Running Java App 1
start "Java App 1" java -DDB_USERNAME=%MYSQL_USER% -DDB_PASSWORD=%MYSQL_PASSWORD% -DDB_NAME=%DATABASE_NAME% -jar notes-0.0.1-SNAPSHOT.jar
echo Java process executed.
pause
echo Starting React server
start serve -s build
echo React server executed executed.
Press again to launch app Page...
pause
echo Loading app Page into Browser...
start http://localhost:3000/
Press again to EXIT
pause
