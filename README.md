# Justbnb

## About Justbnb

Justbnb is a full-stack-application clone of Airbnb deployed on heroku. The App Uses React & Redux in the Front-end and for the backend we use Express.js & an ORM called Sequelize.

Live Link: https://git.heroku.com/airbnb-justingu.git

## Site Information



## Technologies Used

### This application was built with:
- Javascript
- React
- Redux
- HTML
- CSS
- Express
- Sequelize
- PostgresSQL

## Features

### Home Page
![Screen Shot 2022-09-20 at 6 51 18 PM](https://user-images.githubusercontent.com/99216902/191402623-b720f1b6-ed5b-461d-aaf5-debf3c3e0b1f.png)

### Current Spot Page
![Screen Shot 2022-09-20 at 10 38 02 PM](https://user-images.githubusercontent.com/99216902/191402701-04a915f1-c90d-4066-9ebd-aa07d24cd1bd.png)

### Review For Current Spot Page
![Screen Shot 2022-09-20 at 10 38 20 PM](https://user-images.githubusercontent.com/99216902/191402736-aab0cc60-946a-48ef-9769-965be7b18312.png)



## Locally

If you would like to launch this site locally please follow these instructions:

- You can also have the same result by just going to the repository link and downloading zip file and extract it to a folder on your device.


1. Clone this repo by using your terminal by going to a directory of where you would want the file stored and type in `git clone https://github.com/Justinguu/API-project.git`

2. change directories (cd) into the 'backend' directory and run the command in the CLI: `npm install` what this command does is grab all the dependencies needed for the application.
3. In the same directory(backend) create a .env file and add your own values to these variables: PORT, DB_FILE (location of the database), JWT_SECRET, and JWT_EXPIRES_IN
4. In the same directory(backend) load the migrations database by running the command in the CLI `npx dotenv sequelize db:migrate`
5. In the same directory(backend) load the seeder data into your database by running the command in the CLI `npx dotenv sequelize db:seed:all`
6. Now run the command in the CLI `npm start` to turn your backend server on.
7. Now run the command in another terminal in the CLI `npm start` If you have Google Chrome this should have started the React Application for you. If this fails you can just go to to the url of `localhost:3000`

- Both frontend & backend should be running in order for you to see the application.

8. Great news you are locked in and ready to check the application out, You have successfully launched the app.
