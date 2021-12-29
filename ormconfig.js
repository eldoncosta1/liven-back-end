if (process.env.environment === 'local') {
  module.exports = [
    {
      "name": "default",
      "type": "postgres",
      "host": process.env.POSTGRES_HOST,
      "port": process.env.POSTGRES_PORT,
      "username": process.env.POSTGRES_USERNAME,
      "password": process.env.POSTGRES_PASSWORD,
      "database": process.env.POSTGRES_DB,
      "entities": [
        "./src/modules/**/infra/typeorm/entities/*.ts"
      ],
      "migrations": [
        "./src/shared/infra/typeorm/migrations/*.ts"
      ],
      "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
      }
    }
  ]
} else {
  module.exports = [
    {
      "name": "default",
      "type": "postgres",
      "host": process.env.POSTGRES_HOST,
      "port": process.env.POSTGRES_PORT,
      "username": process.env.POSTGRES_USERNAME,
      "password": process.env.POSTGRES_PASSWORD,
      "database": process.env.POSTGRES_DB,
      "autoLoadEntities": true,
      "ssl": {
        "rejectUnauthorized": false
      },
      "entities": [
        "./dist/modules/**/infra/typeorm/entities/*.js"
      ],
      "migrations": [
        "./dist/shared/**/infra/typeorm/migrations/*.js"
      ],
      "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations",
        "entitiesDir": "./src/modules/**/infra/typeorm/entities"
      }
    }
  ]
}
