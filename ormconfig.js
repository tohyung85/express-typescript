module.exports = [
   {
      "name": "default",
      "type": process.env.DB,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "synchronize": false,
      "logging": false,
      "entities": [
         "src/modules/**/entities/*.ts"
      ],
      "migrations": [
         "migrations/*.ts"
      ],
      "migrationsTableName" : [
         "typeorm_migrations"
      ],
      "subscribers": [
         "src/subscriber/**/*.ts"
      ],
      "cli": {
            "migrationsDir": "migrations"
      }
   },
   {
      "name": "test",
      "type": process.env.DB,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.TEST_DB,
      "synchronize": false,
      // "dropSchema": true,
      "logging": false,
      "entities": [
         "src/modules/**/entities/*.ts"
      ],
      "migrations": [
         "migrations/*.ts"
      ],
      "migrationsTableName" : [
         "typeorm_migrations"
      ],
      "subscribers": [
         "src/subscriber/**/*.ts"
      ],
      "cli": {
            "migrationsDir": "migrations"
      }
   }
]