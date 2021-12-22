module.exports = [
  {
    "name": "default",
    "type": "mongodb",
    "url": process.env.MONGODB_URL,
    "timezone": "TZ",
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    "useFindAndModify": false,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts",
      // "./dist/modules/**/infra/typeorm/schemas/*.js"
    ]
  }]
