const { Client } = require('pg');

// clients will also use environment variables
// for connection information
const client = new Client();
client.connect();

const runQuery = (queryString, func) =>
  client
    .query(queryString)
    .then(res => func(res))
    .catch(err => {
      console.log('error', err);
    });

module.exports = runQuery;
