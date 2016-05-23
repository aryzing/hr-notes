# SQL Principles
Single source of truth. Do not replicate create multiple rows to reference different values of a given column:
```
Teachers|Class
---------------
Fred    |CS101
Fred    |CS102
Fred    |CS103
```

Do not add columns to accomodate multiple references either

All rows have an ID which uniquely represents the entry

A one to many, 1:many, relationship between two tables can be established by adding a referencing property in one of the tables.

# Many to many

Add third table that relates the two is necessary. Called a **join table**.

It is a table with **two columns**.

A join table can be thought of as X,Y coordinates of relationships.

# Installation Ubuntu
```sh
sudo apt-get install mysql
```

If during install a password was set for root, append `-p` to access mysql:
```sh
mysql -u root -p
```

# SQL Tutorial
CLI commands for mysql on Ubuntu
```sh
sudo status mysql
sudo start mysql
sudo stop mysql # Service must be running
sudo restart mysql # Service must be running
```

```sql
CREATE DATABASE Company;

USE Company;


CREATE TABLE employees (
  first varchar(15),
  last varchar(20),
  title varchar(50),
  age smallint(3),
  salary decimal(25,2)
);
```

More examples:
```sql
insert into employees
  (first, last, title, age, salary)
  values ('Jonie', 'Weber', 'Secretary', 28, 19500.00);

insert into employees
  (first, last, title, age, salary)
  values ('Potsy', 'Weber', 'Programmer', 32, 45300.00);

insert into employees
  (first, last, title, age, salary)
  values ('Dirk', 'Smith', 'Programmer II', 45, 75020.00);

select * from employees;
```

Commands for showing tables and databases
```sh
show tables;
show databases;
```

To find info about a given table:
```sh
desdribe employees
```

Command syntax
```
DROP {DATABASE | SCHEMA} [IF EXISTS] db_name

DROP [TEMPORARY] TABLE [IF EXISTS]
    tbl_name [, tbl_name] ...
    [RESTRICT | CASCADE]
```

Example query commands
```sql
select first, last, city from empinfo;

select last, city, age from empinfo
       where age > 30;

select first, last, city, state from empinfo
       where first LIKE 'J%';

select * from empinfo;

select first, last, from empinfo
       where last LIKE '%s';

select first, last, age from empinfo
       where last LIKE '%illia%';

select * from empinfo where first = 'Eric';
```

# Exercises
Select all columns for everyone in your employee table.
```sql
select * from employees;
```
Select all columns for everyone with a salary over 30000.
```sql
select * from employees where salary > 30000;
```
Select first and last names for everyone that's under 30 years old.
```sql
select first, last from employees where age < 30;
```
Select first name, last name, and salary for anyone with "Programmer" in their title.
```sql
select first, last, salary from employees where title like '%Programmer%';
```
Select all columns for everyone whose last name contains "ebe".
```sql
select * from employees where last like '%ebe%';
```
Select the first name for everyone whose first name equals "Potsy".
```sql
select first from employees where first='Potsy';
```
Select all columns for everyone over 80 years old.
```sql
select * from employees where age>80;
```
Select all columns for everyone whose last name ends in "ith".
```sql
select * from employees where last like '%ith';
```
