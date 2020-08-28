console.log('process.env.DATABASE_URL :>> ', process.env.DATABASE_URL);
console.log('process.env.MONGODB_URI :>> ', process.env.MONGODB_URI);

module.exports = {
  "name": "default",
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "./dist/modules/**/infra/typeorm/entities/*.js"
  ],
  "migrations": [
    "./dist/shared/infra/typeorm/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
},
{
  "name": "mongo",
  "type": "mongodb",
  "url": process.env.MONGODB_URI,
  "useUnifiedTopology": true,
  "entities": [
    "./dist/modules/**/infra/typeorm/schemas/*.js"
  ]
}
