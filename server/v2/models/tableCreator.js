import pool from '../config/dbConfig';


process.stdout.write(process.env.NODE_ENV);


const createTables = `
DROP TABLE IF EXISTS users, entries;
CREATE TABLE IF NOT EXISTS users(
    userId SERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    password VARCHAR(300) NOT NULL
    );
CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    createdOn VARCHAR(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(300) NOT NULL
);
  `;

pool.query(createTables).then(() => {
  pool.end();
}).catch((err) => {
  process.stdout.write(err.message);
  process.exit(0);
});

process.stdout.write(' + Tables Created successfully');
