module.exports = {
   "type": "postgres",
   "host": process.env.DB_HOST,
   "port": 5432,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/models/**/*.{ts,js}"
   ],
   "migrations": [
      "src/migration/**/*.{ts,js}"
   ],
   "subscribers": [
      "src/subscriber/**/*.{ts,js}"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}