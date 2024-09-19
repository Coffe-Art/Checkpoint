const mysql = require('mysql2');

let pool;

function createPool() {
  pool = mysql.createPool({
    host: 'bs3k43znev9zti3mtb1t-mysql.services.clever-cloud.com',
    user: 'uaak3xe9jirlkf23',
    password: '1p8KPuSCC0v6qHC5Jtyi',
    database: 'bs3k43znev9zti3mtb1t',
    port: 3306,
    waitForConnections: true,
    connectTimeout: 10000,
    connectionLimit: 5, 
    queueLimit: 0
  });

  pool.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
  });

  pool.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Attempting to reconnect...');
      createPool();
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Connection refused. Exiting process.');
      process.exit(1);
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Too many connections. Exiting process.');
      process.exit(1);
    } else {
      console.error('Unhandled error:', err);
      process.exit(1);
    }
  });
}

createPool();

module.exports = pool;

