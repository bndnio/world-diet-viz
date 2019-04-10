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
    return connection, cursor

def processMacronutrientData(conn, cur):
    # Add Macronutrient Data
    print('Adding macronutrient data (in kcal)')
    
    # Do Fat
    cur.execute("SELECT country, year, value FROM test WHERE name='Grand Total - Fat supply quantity' ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) VALUES(%s, %s, 'MACRO', 'Grand Total - Fat - Food supply', 'kcal/capita/day', %s)", [row[0], row[1], row[2]*9])
    
    # Do Protein
    cur.execute("SELECT country, year, value FROM test WHERE name='Grand Total - Protein supply quantity' ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) VALUES(%s, %s, 'MACRO', 'Grand Total - Protein - Food supply', 'kcal/capita/day', %s)", [row[0], row[1], row[2]*4])
    
    # Do Total (add MACRO label)
    cur.execute("SELECT country, year, value FROM test WHERE name='Grand Total - Food supply' ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) VALUES(%s, %s, 'MACRO', 'Grand Total - Food supply', 'kcal/capita/day', %s)", [row[0], row[1], row[2]])

    # Do Animal Protein
    cur.execute("SELECT country, year, SUM(value) FROM test WHERE name='Grand Total - Fat supply quantity' ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) VALUES(%s, %s, 'MACRO', 'Grand Total - Fat - Food supply', 'kcal/capita/day', %s)", [row[0], row[1], row[2]*9])

    # Do Plant Protein



    conn.commit()

def main():
    try:
        conn, cur = connect()
        # processMacronutrientData(conn, cur)
        
        print('Complete')

    except (Exception, psycopg2.Error) as error :
        print ("Error while connecting to PostgreSQL", error)
    finally:
        #closing database connection.
            if(conn):
                cur.close()
                conn.close()
                print("PostgreSQL connection is closed")
    


if (__name__) == "__main__":
    main()
