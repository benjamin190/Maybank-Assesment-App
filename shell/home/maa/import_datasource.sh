#!/bin/bash

# show commands being executed, per debug
set -x

# define database & table name
_db="MAADB"
_table_name="TRANSACTIONS"

# define directory containing data source files
_datasource_directory=/home/maa/ds

# go into directory
cd $_datasource_directory
echo $_datasource_directory

# get a list of data source files in directory
_datasource_files=`ls -1 *dataSource*`
echo $_datasource_files

# loop through data source files
for _datasource_files in $_datasource_directory/*dataSource* ;
do

  # remove file extension
  _datasource_files_extensionless=`echo $_datasource_files | sed 's/\(.*\)\..*/\1/'`

  # import data source into mysql
  mysql -e "use $_db" -e "
        LOAD DATA LOCAL INFILE '$_datasource_files'
        INTO TABLE TRANSACTIONS
        FIELDS TERMINATED BY '|'
        OPTIONALLY ENCLOSED BY '\"'
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES
        (ACCOUNT_NUMBER, TRX_AMOUNT, DESCRIPTION, @TRX_DATE, @TRX_TIME, CUSTOMER_ID)
        SET TRX_DATE = STR_TO_DATE(@TRX_DATE, '%Y-%m-%d'), TRX_TIME = STR_TO_DATE(@TRX_TIME, '%H:%i:%s');"

done
exit