#!/bin/bash

# Set MySQL credentials from command-line parameters
if [ "$1" == "" ] || [ "$2" == "" ]; then
    echo "Usage: $0 <MYSQL_USER> <MYSQL_PASSWORD>"
    exit 1
fi

# Set MySQL credentials from command-line parameters
MYSQL_USER=$1
MYSQL_PASSWORD=$2
DATABASE_NAME=newNotes

read -p "Press Enter to continue..."

# Set the path to your MySQL bin directory
MYSQL_BIN_PATH="/usr/local/mysql/bin/mysql"  # Update the path accordingly

read -p "Press Enter to continue..."

# Create the database
$MYSQL_BIN_PATH -u $MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE $DATABASE_NAME;"

read -p "Press Enter to continue..."

# Use the database
$MYSQL_BIN_PATH -u $MYSQL_USER -p$MYSQL_PASSWORD -e "USE $DATABASE_NAME;"

read -p "Press Enter to continue..."

# Create tables and schema
$MYSQL_BIN_PATH -u $MYSQL_USER -p$MYSQL_PASSWORD $DATABASE_NAME < create_table.sql

echo "Database and schema creation complete."

echo "Running Java App 1"
java -DDB_USERNAME=$MYSQL_USER -DDB_PASSWORD=$MYSQL_PASSWORD -DDB_NAME=$DATABASE_NAME -jar notes-0.0.1-SNAPSHOT.jar &
echo "Java process executed."

echo "Starting React server"
serve -s build &
echo "React server executed."

echo "Loading app Page into Browser..."
open http://localhost:3000/  # Open in the default web browser

echo "Press Enter to EXIT"
read -p ""