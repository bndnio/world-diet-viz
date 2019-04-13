import os
import sys
import psycopg2


def connect():
    connection = psycopg2.connect(user=os.environ["PGUSER"],
                                  password=os.environ["PGPASSWORD"],
                                  host=os.environ["PGHOST"],
                                  port=os.environ["PGPORT"],
                                  database=os.environ["PGDATABASE"])
    cursor = connection.cursor()
    # Print PostgreSQL Connection properties
    print(connection.get_dsn_parameters(), "\n")
    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")
    return connection, cursor


def processMacronutrientData(conn, cur):
    # Add Macronutrient Data
    print('Adding macronutrient data (in kcal)')

    # Do Fat
    cur.execute("SELECT country, year, value "
                "FROM test "
                "WHERE name='Grand Total - Fat supply quantity' "
                "ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows for fat kcal: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) "
                    "VALUES(%s, %s, 'MACRO', 'Grand Total - Fat - Food supply', 'kcal/capita/day', %s)",
                    [row[0], row[1], row[2]*9])

    # Do Protein
    cur.execute("SELECT country, year, value "
                "FROM test "
                "WHERE name='Grand Total - Protein supply quantity' "
                "ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows for total protein kcal: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) "
                    "VALUES(%s, %s, 'MACRO', 'Grand Total - Protein - Food supply', 'kcal/capita/day', %s)",
                    [row[0], row[1], row[2]*4])

    # Do Total (add MACRO label)
    cur.execute("SELECT country, year, value "
                "FROM test "
                "WHERE name='Grand Total - Food supply' "
                "ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows for total kcal: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) "
                    "VALUES(%s, %s, 'MACRO', 'Grand Total - Food supply', 'kcal/capita/day', %s)",
                    [row[0], row[1], row[2]])

    # Do Animal Protein
    cur.execute("SELECT country, year, SUM(value) "
                "FROM test "
                "WHERE name='Animal Products - Protein supply quantity' "
                    "OR name='Animal fats - Protein supply quantity' "
                    "OR name='Aquatic Animals, Others - Protein supply quantity' "
                    "OR name='Bovine Meat - Protein supply quantity' "
                    "OR name='Butter, Ghee - Protein supply quantity' "
                    "OR name='Cephalopods - Protein supply quantity' "
                    "OR name='Demersal Fish - Protein supply quantity' "
                    "OR name='Eggs - Protein supply quantity' "
                    "OR name='Fats, Animals, Raw - Protein supply quantity' "
                    "OR name='Fish, Body Oil - Protein supply quantity' "
                    "OR name='Fish, Liver Oil - Protein supply quantity' "
                    "OR name='Fish, Seafood - Protein supply quantity' "
                    "OR name='Freshwater Fish - Protein supply quantity' "
                    "OR name='Marine Fish, Other - Protein supply quantity' "
                    "OR name='Meat - Protein supply quantity' "
                    "OR name='Meat, Aquatic Mammals - Protein supply quantity' "
                    "OR name='Meat, Other - Protein supply quantity' "
                    "OR name='Milk - Excluding Butter - Protein supply quantity' "
                    "OR name='Mutton & Goat Meat - Protein supply quantity' "
                    "OR name='Pelagic Fish - Protein supply quantity' "
                    "OR name='Pigmeat - Protein supply quantity' "
                    "OR name='Poultry Meat - Protein supply quantity' "
                "GROUP BY country, year "
                "ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows for animal protein kcal: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) "
                    "VALUES(%s, %s, 'MACRO', 'Grand Total - Animal Protein - Food supply', 'kcal/capita/day', %s)",
                    [row[0], row[1], row[2]*4])

    # Do Plant Protein

    cur.execute("CREATE VIEW total_protein_view AS "
                "SELECT country, year, name, value as total_protein_value "
                "FROM diet "
                "WHERE name='Grand Total - Protein supply quantity' "
                "ORDER BY country, year, name")

    cur.execute("CREATE VIEW animal_protein_view AS "
                "SELECT country, year, name, value as animal_protein_kcal_value "
                "FROM diet "
                "WHERE name='Grand Total - Animal Protein - Food supply' "
                "ORDER BY country, year, name")

    cur.execute("SELECT DISTINCT tp.country, tp.year, (total_protein_value*4 - animal_protein_kcal_value) as plant_protein_kcal_value "
                "FROM total_protein_view tp, animal_protein_view ap "
                "WHERE tp.country = ap.country  "
                "AND tp.year = ap.year")

    rows = cur.fetchall()
    print("The number of rows for plant  kcal: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO diet (country, year, type, name, unit, value) "
                    "VALUES(%s, %s, 'MACRO', 'Grand Total - Plant Protein - Food supply', 'kcal/capita/day', %s)",
                    [row[0], row[1], row[2]])

    cur.execute("DROP VIEW total_protein_view")
    cur.execute("DROP VIEW animal_protein_view")

    # Do Carbs
    cur.execute("CREATE VIEW fat_view AS "
                "SELECT country, year, name, value as fat_value "
                "FROM test "
                "WHERE name='Grand Total - Fat supply quantity' "
                "ORDER BY country, year, name")

    cur.execute("CREATE VIEW total_view AS "
                "SELECT country, year, name, value as total_value "
                "FROM test "
                "WHERE name='Grand Total - Food supply' "
                "ORDER BY country, year, name")

    cur.execute("CREATE VIEW protein_view AS "
                "SELECT country, year, name, value as protein_value "
                "FROM test "
                "WHERE name='Grand Total - Protein supply quantity' "
                "ORDER BY country, year, name")

    cur.execute("SELECT DISTINCT f.country, f.year, (total_value - protein_value*4 - fat_value*9)/4 as carb_kcal_value "
                "FROM fat_view f, total_view t, protein_view p "
                "WHERE f.country = t.country  "
                    "AND f.year = t.year "
                    "AND t.country = p.country "
                    "AND t.year = p.year")
    rows = cur.fetchall()
    print("The number of rows for carb kcal: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) "
                    "VALUES(%s, %s, 'MACRO', 'Grand Total - Carbs - Food supply', 'kcal/capita/day', %s)",
                    [row[0], row[1], row[2]])

    cur.execute("DROP VIEW fat_view")
    cur.execute("DROP VIEW total_view")
    cur.execute("DROP VIEW protein_view")

    conn.commit()


def main():
    try:
        conn, cur = connect()
        processMacronutrientData(conn, cur)

        print('Complete')

    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
    finally:
        # closing database connection.
        if(conn):
            cur.close()
            conn.close()
            print("PostgreSQL connection is closed")


if (__name__) == "__main__":
    main()
