# Betting
Simple betting service that allows users to waste their money.

![Application preview](https://raw.githubusercontent.com/mariusz-ba/portfolio/master/img/projects/betting.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for developement purposes.

### Prerequisties

There are __two__ things You have to install in order to get this project running on your machine.
1. Since project uses __NodeJS__ you must have it installed, otherwise you won't be able to start project.
2. Betting app uses __MongoDB__ as a storage database. To get project running you must have it installed on your local machine or specify MongoDB server address inside *src/server/app.js* file.
```javascript
mongoose.connect('mongodb://your-mongodb-server-address/your-collection-name', ...)
```

### Running

1. To run project make sure you have both NodeJS installed and MongoDB server running.
2. Navigate to projects root directory and execute following commands to run application:
```
npm install
npm start
```

If everything goes well you will get app running on http://localhost:3000

To run project in production environment use
```
npm run start:prod
```

### Issues

If any error has occurred, please let me know by opening issue.
