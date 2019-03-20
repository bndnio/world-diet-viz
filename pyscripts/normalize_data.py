
import csv
from os import path, remove
import sys


def main():
    # Check input params
    fi_loc = sys.argv[1]
    if len(sys.argv) < 3:
        print('\nMissing params: normalize_data.py <input_file> <output_destination>')
        return
    fo_loc = sys.argv[2]
    if not path.exists(fi_loc):
        print(
            f"\nSource path does not exist (\"{path.abspath(fi_loc)}\"). Quitting")
        return

    # Take care of output if already exists
    if path.exists(fo_loc):
        print(
            f"\nOutput path exists (\"{path.abspath(fo_loc)}\"). \nDelete? [Y/n]")
        yes = {'yes', 'y', 'ye', ''}
        no = {'no', 'n'}
        while(1):
            choice = input().lower()
            if choice in yes:
                print("Deleting")
                remove(path.abspath(fo_loc))
                break
            elif choice in no:
                print("Quitting")
                return

    total_rows = 0
    # Count Size of file
    with open(path.abspath(fi_loc), 'r', encoding="Latin-1") as csv_file:
        print('\nChecking Size of File')
        csv_reader = csv.reader(csv_file, delimiter=',')
        total_rows = sum(1 for row in csv_reader)
        print(f'Counted {total_rows} rows')

    # Actually process file
    with open(path.abspath(fi_loc), 'r', encoding="Latin-1") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        row_count = 0
        print('\nProcessing File')

        with open(path.abspath(fo_loc), 'a') as output_file:
            output_writer = csv.writer(output_file)
            for row in csv_reader:
                if row_count == 0:
                    # Add 'id' label to label row
                    output_writer.writerow(
                        ['id', *row])
                elif row_count != 0:
                    # Add 'id' field to existing rows
                    output_writer.writerow(
                        [f'{row[0].zfill(3)}{row[2].zfill(4)}{row[4].zfill(4)}{row[6].zfill(4)}', *row])

                if row_count % 100000 == 0:
                    print(f'{row_count}/{total_rows} rows processed', end='\r')

                row_count += 1
            print(f'{total_rows}/{total_rows} rows processed')
    print('Complete')


if (__name__) == "__main__":
    main()
