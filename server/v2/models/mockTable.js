import pool from '../config/dbConfig';


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
INSERT INTO users(
  firstName, lastName, email, password
 )VALUES('Jane', 'Doe', 'jane@gmail.com', '$2b$10$0cAXA8TWPQVaZGq3We0peuvpTDJO.B68DlHskE5EuBhV2kZkEh6Xi');
 INSERT INTO users(
  firstName, lastName, email, password
 )VALUES('Jacky', 'Moon', 'jacky@gmail.com', '$2b$10$0cAXA8TWPQVaZGq3We0peuvpTDJO.B68DlHskE5EuBhV2kZkEh6Xi');
 INSERT INTO users(
  firstName, lastName, email, password
 )VALUES('Junior', 'Mucyo', 'junior@gmail.com', '$2b$10$0cAXA8TWPQVaZGq3We0peuvpTDJO.B68DlHskE5EuBhV2kZkEh6Xi');
 INSERT INTO users(
  firstName, lastName, email, password
 )VALUES('Media', 'Down', 'down@gmail.com', '$2b$10$0cAXA8TWPQVaZGq3We0peuvpTDJO.B68DlHskE5EuBhV2kZkEh6Xi');
INSERT INTO entries(
  userid, createdOn, title, description
 )VALUES(3, 'Mon Oct 28 2019', 'Ttile for test files', 'This description is for the test files mock up');
 INSERT INTO entries(
    userid, createdOn, title, description
   )VALUES(4, 'Mon Oct 28 2019', 'Ttile for test files', 'This description is for the test files mock up');
   INSERT INTO entries(
    userid, createdOn, title, description
   )VALUES(4, 'Mon Oct 29 2019', 'Ttile for test files', 'This description is for the test files mock up');

  `;

pool.query(createTables).then(() => {
  pool.end();
}).catch((err) => {
  process.stdout.write(err.message);
  process.exit(0);
});

process.stdout.write(' + Test Tables Created successfully');
