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

    # Do Plant Protein
    cur.execute("SELECT country, year, SUM(value) "
                "FROM test "
                "WHERE name='Alcoholic Beverages - Protein supply quantity' "
                    "OR name='Apples and products - Protein supply quantity' "
                    "OR name='Aquatic Plants - Protein supply quantity' "
                    "OR name='Aquatic Products, Other - Protein supply quantity' "
                    "OR name='Bananas - Protein supply quantity' "
                    "OR name='Barley and products - Protein supply quantity' "
                    "OR name='Beans - Protein supply quantity' "
                    "OR name='Beer - Protein supply quantity' "
                    "OR name='Beverages, Alcoholic - Protein supply quantity' "
                    "OR name='Beverages, Fermented - Protein supply quantity' "
                    "OR name='Cassava and products - Protein supply quantity' "
                    "OR name='Cereals - Excluding Beer - Protein supply quantity' "
                    "OR name='Cereals, Other - Protein supply quantity' "
                    "OR name='Citrus, Other - Protein supply quantity' "
                    "OR name='Cloves - Protein supply quantity' "
                    "OR name='Cocoa Beans and products - Protein supply quantity' "
                    "OR name='Coconut Oil - Protein supply quantity' "
                    "OR name='Coconuts - Incl Copra - Protein supply quantity' "
                    "OR name='Coffee and products - Protein supply quantity' "
                    "OR name='Cottonseed - Protein supply quantity' "
                    "OR name='Cottonseed Oil - Protein supply quantity' "
                    "OR name='Cream - Protein supply quantity' "
                    "OR name='Crustaceans - Protein supply quantity' "
                    "OR name='Dates - Protein supply quantity' "
                    "OR name='Fruits - Excluding Wine - Protein supply quantity' "
                    "OR name='Fruits, Other - Protein supply quantity' "
                    "OR name='Grand Total - Protein - Food supply' "
                    "OR name='Grand Total - Protein supply quantity' "
                    "OR name='Grapefruit and products - Protein supply quantity' "
                    "OR name='Grapes and products (excl wine) - Protein supply quantity' "
                    "OR name='Groundnut Oil - Protein supply quantity' "
                    "OR name='Groundnuts (Shelled Eq) - Protein supply quantity' "
                    "OR name='Honey - Protein supply quantity' "
                    "OR name='Infant food - Protein supply quantity' "
                    "OR name='Lemons, Limes and products - Protein supply quantity' "
                    "OR name='Maize Germ Oil - Protein supply quantity' "
                    "OR name='Maize and products - Protein supply quantity' "
                    "OR name='Millet and products - Protein supply quantity' "
                    "OR name='Miscellaneous - Protein supply quantity' "
                    "OR name='Molluscs, Other - Protein supply quantity' "
                    "OR name='Nuts and products - Protein supply quantity' "
                    "OR name='Oats - Protein supply quantity' "
                    "OR name='Offals - Protein supply quantity' "
                    "OR name='Offals, Edible - Protein supply quantity' "
                    "OR name='Oilcrops - Protein supply quantity' "
                    "OR name='Oilcrops Oil, Other - Protein supply quantity' "
                    "OR name='Oilcrops, Other - Protein supply quantity' "
                    "OR name='Olive Oil - Protein supply quantity' "
                    "OR name='Olives (including preserved) - Protein supply quantity' "
                    "OR name='Onions - Protein supply quantity' "
                    "OR name='Oranges, Mandarines - Protein supply quantity' "
                    "OR name='Palm Oil - Protein supply quantity' "
                    "OR name='Palm kernels - Protein supply quantity' "
                    "OR name='Palmkernel Oil - Protein supply quantity' "
                    "OR name='Peas - Protein supply quantity' "
                    "OR name='Pepper - Protein supply quantity' "
                    "OR name='Pimento - Protein supply quantity' "
                    "OR name='Pineapples and products - Protein supply quantity' "
                    "OR name='Plantains - Protein supply quantity' "
                    "OR name='Potatoes and products - Protein supply quantity' "
                    "OR name='Pulses - Protein supply quantity' "
                    "OR name='Pulses, Other and products - Protein supply quantity' "
                    "OR name='Rape and Mustard Oil - Protein supply quantity' "
                    "OR name='Rape and Mustardseed - Protein supply quantity' "
                    "OR name='Rice (Milled Equivalent) - Protein supply quantity' "
                    "OR name='Ricebran Oil - Protein supply quantity' "
                    "OR name='Roots, Other - Protein supply quantity' "
                    "OR name='Rye and products - Protein supply quantity' "
                    "OR name='Sesame seed - Protein supply quantity' "
                    "OR name='Sesameseed Oil - Protein supply quantity' "
                    "OR name='Sorghum and products - Protein supply quantity' "
                    "OR name='Soyabean Oil - Protein supply quantity' "
                    "OR name='Soyabeans - Protein supply quantity' "
                    "OR name='Spices - Protein supply quantity' "
                    "OR name='Spices, Other - Protein supply quantity' "
                    "OR name='Starchy Roots - Protein supply quantity' "
                    "OR name='Stimulants - Protein supply quantity' "
                    "OR name='Sugar & Sweeteners - Protein supply quantity' "
                    "OR name='Sugar Crops - Protein supply quantity' "
                    "OR name='Sugar beet - Protein supply quantity' "
                    "OR name='Sugar cane - Protein supply quantity' "
                    "OR name='Sugar non-centrifugal - Protein supply quantity' "
                    "OR name='Sunflower seed - Protein supply quantity' "
                    "OR name='Sunflowerseed Oil - Protein supply quantity' "
                    "OR name='Sweet potatoes - Protein supply quantity' "
                    "OR name='Sweeteners, Other - Protein supply quantity' "
                    "OR name='Tea (including mate) - Protein supply quantity' "
                    "OR name='Tomatoes and products - Protein supply quantity' "
                    "OR name='Treenuts - Protein supply quantity' "
                    "OR name='Vegetable Oils - Protein supply quantity' "
                    "OR name='Vegetables - Protein supply quantity' "
                    "OR name='Vegetables, Other - Protein supply quantity' "
                    "OR name='Vegetal Products - Protein supply quantity' "
                    "OR name='Wheat and products - Protein supply quantity' "
                    "OR name='Wine - Protein supply quantity' "
                    "OR name='Yams - Protein supply quantity' "
                "GROUP BY country, year "
                "ORDER BY country, year")
    rows = cur.fetchall()
    print("The number of rows for plant  kcal: ", cur.rowcount)
    for row in rows:
        cur.execute("INSERT INTO test (country, year, type, name, unit, value) "
                    "VALUES(%s, %s, 'MACRO', 'Grand Total - Plant Protein - Food supply', 'kcal/capita/day', %s)",
                    [row[0], row[1], row[2]*4])

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
    
    # Do Carbs
    cur.execute("DROP VIEW fat_view")
    cur.execute("DROP VIEW total_view")
    cur.execute("DROP VIEW protein_view")

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

    cur.execute("SELECT DISTINCT f.country, f.year, (total_value - protein_value*4 - fat_value*9)/4 as carb_value "
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
