const { Client } = require('pg');

// clients will also use environment variables
// for connection information
const client = new Client();
client.connect();

client
  .query(
    "SELECT year_code, value FROM undiet WHERE area = 'Canada' AND element_code = '664' and item = 'Grand Total' ORDER BY year_code;"
  )
  .then(res => {
    console.log('good', res);
    client.end();
  })
  .catch(err => {
    console.log('error', err);
    client.end();
  });

module.exports = client;
