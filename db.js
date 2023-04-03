const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect("mongodb+srv://eddewattee:XiBDnlFBWpCnpwgh@cluster0.o7ijwii.mongodb.net/loan?retryWrites=true&w=majority")
      .then(client => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}



