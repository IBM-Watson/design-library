#! /bin/bash
set -e # exit with nonzero exit code if anything fails

wget https://github.com/IBM-Watson/runner/archive/master.zip
7z x master.zip
rm master.zip
rsync -a -v runner-master/ ./
rm -r runner-master
