import os
import sys
import psycopg2

def connect():
    connection = psycopg2.connect(user = os.environ["PGUSER"],
                                  password = os.environ["PGPASSWORD"],
                                  host = os.environ["PGHOST"],
                                  port = os.environ["PGPORT"],
                                  database = os.environ["PGDATABASE"])
    cursor = connection.cursor()
    # Print PostgreSQL Connection properties
    print(connection.get_dsn_parameters(),"\n")
    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record,"\n")
    return cursor

def main():
    cursor = connect()
    print('Complete')


if (__name__) == "__main__":
    main()
