
module.exports = {
    "development": {
        "username": "root",
        "password": null,
        "database": "taskmarker",
        "host": "127.0.0.1",
        "port":"3312",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production":{
        "url": process.env.DATABASE_URL,
        "dialect": "postgres"
    }
};
