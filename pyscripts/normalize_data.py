
import csv
from os import path
import sys


def main():
    floc = sys.argv[1]
    if not path.exists(floc):
        print(f"\"{path.abspath(floc)}\" does not exist")
        return

    with open(path.abspath(floc)) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count > 10:
                break
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                print("\t".join(row))
                line_count += 1
        print(f'Processed {line_count} lines.')


if (__name__) == "__main__":
    main()
