module.exports = {
    "development": {
        "username": "root",
        "password": null,
        "database": "taskmarker",
        "host": "127.0.0.1",
        "port": "3312",
        "dialect": "mysql",
        "dialectOptions":{
            "timezone":"-03:00"
        }
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production":{
        "username":process.env.DB_USER,
        "database":process.env.DB_STORAGE,
        "password":process.env.DB_PASS,
        "host":process.env.DB_HOST,
        "dialect": "postgres",
        "dialectOptions":{
            "ssl":true,
            "timezone":"America/Sao_Paulo"
        }
    }
};
