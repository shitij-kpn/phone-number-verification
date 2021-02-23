const { Pool } = require('pg');

const getdb = async () =>
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const checkPhoneNumber = async (...args) => {
  try {
    const db = await getdb();
    await db.connect();
    const response = await db.query(
      'select * from phonenumbers where phonenumbers=$1',
      args
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const writeData = async (...args) => {
  try {
    const db = await getdb();
    await db.connect();
    const { rows } = await db.query(
      'insert into phonenumbers(phonenumbers) values($1)',
      args
    );
    console.log('insterting into db');
    db.end();
    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  writeData,
  checkPhoneNumber,
};
