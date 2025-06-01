**Library Management System**

**Clone the github repository**

A full-stack Library Management System built with:

Backend: Laravel (REST API)

Frontend: React JS

**Prerequisites**

PHP >= 8.1

Composer

Laravel >= 10

Node.js >= 16.x

NPM or Yarn

MySQL

Go to the backend directory:
cd backend
composer install

Create .env file:

Update .env file with database settings:
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=library
DB_USERNAME=root
DB_PASSWORD=

**Create database in phpMyAdmin**
Enter a name "library"

Generate app key:
php artisan key:generate

Run migrations:
php artisan migrate

Start the Laravel server:
php artisan serve

**For the Frontend REACTjs**
Go to the frontend directory:
cd ../frontend

Install React dependencies:
npm install

Run The frontend
npm run dev

**FOR TESTING AND CREATING ADMIN FOR LOGIN**
Go to backend directory

Run this command for testing 
php artisan test

Then run the command
php artisan db:seed

to Create admin user
email: harfeil@gmail.com
password: 123456

Then login to the application and you will be navigated to admin dashboard

Admin Features:
Staff Management.
Library Management and Assigning Staff.

**The Default password of staff is staff123.**

If you already have account for staff you can login the account of staff.

Staff Features:
Book Management.
List of Borrowed Books in specific Library.
Borrower Management.

**The Default password for Borrower is borrower123**

If you already have account for Borrower you can login their account.

Borrower Features:
List of Books.
Borrow and Return Books.
Add and Edit Profile Picture.

**The profile picture is downloaded to Backend Directory. Public/storage/profile_pictures**


