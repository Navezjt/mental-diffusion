#
# Mental Diffusion Updater
#
import os
import sys
import shutil
from io import BytesIO
from urllib.request import urlopen
from zipfile import ZipFile


MDZIP = "https://github.com/nimadez/mental-diffusion/archive/refs/heads/main.zip"
EXCLUDE = [
    "mental-diffusion-main",
    ".input",
    ".output",
    ".workflows",
    ".vsixmanifest"
]

cwd = os.getcwd()


def main():
    DIR_SRC = cwd + "/mental-diffusion-main"
    DIR_DST = cwd

    remove_directory(DIR_SRC)

    try:
        print("Connecting to GitHub...")
        downloadZip(MDZIP, DIR_DST)
        os.system("cls")
    except:
        input("Error: Unable to fetch GitHub repository, check your internet connection.")
        sys.exit(0)

    print(" -----------------------------------")
    print("  Mental Diffusion Updater ")
    print(" -----------------------------------")
    if input(" Begin Update (Y/N)? ").upper() != "Y":
        remove_directory(DIR_SRC)
        sys.exit(0)

    # clear previous MD installation
    if os.path.exists(DIR_DST):
        os.chdir(DIR_DST)
        for item in os.listdir(os.getcwd()):
            if item not in EXCLUDE:
                if os.path.isfile(item):
                    os.remove(item)
                elif os.path.isdir(item):
                    shutil.rmtree(item, ignore_errors=True)

    # extract repository
    print('\nSetting up mental-diffusion...')
    for f in os.listdir(DIR_SRC):
        shutil.move(os.path.join(DIR_SRC, f), DIR_DST)
    os.rmdir(DIR_SRC)
    print('Done')


def downloadZip(url, destdir):
    with urlopen(url) as zip:
        with ZipFile(BytesIO(zip.read())) as zf:
            zf.extractall(destdir)


def remove_directory(dir):
    if os.path.exists(dir):
        os.chdir(dir)
        for item in os.listdir(os.getcwd()):
            if os.path.isfile(item):
                os.remove(item)
            elif os.path.isdir(item):
                shutil.rmtree(item, ignore_errors=True)
        os.chdir(cwd)
        os.rmdir(dir)


if __name__== "__main__":
    main()
    print("\nUpdate complete.")
    input()
