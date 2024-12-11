# BANKING SYSTEM PROJECT - DBMS ASSIGNMENT

## 1. About this project:
- This Project use these technologies: ***NestJS for Backend, Vite + React TypeScript for Frontend, MySQL for Database***
- This Project uses Node version ***20.13.1***
- This project contains folders:
    * ***mysql-db:*** This folder is for storing **.sql* files
    * ***nestjs-app:*** This folder is for *Backend Service Development*
    * ***react-app:*** This folder is for *Frontend Service Development* 
- In the root directory:
    * ***.env.example:*** This file is an example of *.env* file
    * ***docker-compose.yml:*** This file is used for setting up development environment
    * ***package.json:*** This file is used for running some scripts 
    * ***.gitignore*** 

## 2. How to run?
- First of all, we need to run this script to create ***.env*** file

```
cp .env.example .env
```
## 2.1. Run Backend Project
### 2.1.1. Run Database
- Open ***.env*** file and edit ***"MYSQLDB_USER"*** and ***"MYSQLDB_PASSWORD"*** as you want
- Then run this script:
```
npm run start:db
```
### 2.1.2. Manage your Database
- After those steps above, open ***http://localhost:8080/*** to manage your database

**How to Login?**

- **System**: MySQL
- **Server**: mysql-db
- **Username**: your username in ***.env***
- **Password**: your password in ***.env***

### 2.1.3 Run Backend Project
- Open ***nestjs-app*** in your Terminal, run script
```
npm install
```
- After that, run script
```
npm run start:dev
```
- The Backend Service will available at ***http://localhost:3000/***

**Note:** These steps is for first running, you can run this script from root directory next time
```
npm run start:back
```
## 2.2. Run Frontend Project
- Open ***react-app*** in your Terminal, run script
```
npm install
```
- After that, run script
```
npm run dev
```
- The Frontend Service will available at ***http://localhost:4000/***

**Note:** These steps is for first running, you can run this script from root directory next time
```
npm run start:front
```