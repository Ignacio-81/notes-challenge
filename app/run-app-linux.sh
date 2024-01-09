#!/bin/bash
# Turn on debugging mode
set -x

# Set MySQL credentials from command-line parameters
if [ "$1" == "" ] || [ "$2" == "" ]; then
    echo "Usage: $0 <MYSQL_USER> <MYSQL_PASSWORD>"
    exit 1
fi

# Set MySQL credentials from command-line parameters
MYSQL_USER=$1
MYSQL_PASSWORD=$2
DATABASE_NAME=newNotes

echo "Press Enter to continue..."
read -n 1 -s  # Wait for Enter key press

# Set the path to your MySQL bin directory
MYSQL_BIN_PATH="/var/lib/mysql"  # Update the path accordingly

echo "Press Enter to continue..."
read -n 1 -s  # Wait for Enter key press

# Create the database
$MYSQL_BIN_PATH -u $MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE $DATABASE_NAME;"

echo "Press Enter to continue..."
read -n 1 -s  # Wait for Enter key press

# Use the database
$MYSQL_BIN_PATH -u $MYSQL_USER -p$MYSQL_PASSWORD -e "USE $DATABASE_NAME;"

echo "Press Enter to continue..."
read -n 1 -s  # Wait for Enter key press

# Create tables and schema
$MYSQL_BIN_PATH -u $MYSQL_USER -p$MYSQL_PASSWORD $DATABASE_NAME < create_table.sql

echo "Database and schema creation complete."
echo "Press Enter to continue..."
read -n 1 -s  # Wait for Enter key press

echo "Running Java App 1"
java -DDB_USERNAME=$MYSQL_USER -DDB_PASSWORD=$MYSQL_PASSWORD -DDB_NAME=$DATABASE_NAME -jar notes-0.0.1-SNAPSHOT.jar &
echo "Java process executed."
echo "Press Enter to continue..."
read -n 1 -s  # Wait for Enter key press
echo "Starting React server"
serve -s build &
echo "React server executed."
echo "Press Enter to continue..."
read -n 1 -s  # Wait for Enter key press
echo "Loading app Page into Browser..."
xdg-open http://localhost:3000/  # Open in the default browser

echo "Press Enter to EXIT"
read -p ""