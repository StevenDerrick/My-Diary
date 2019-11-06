import pool from '../v2/config/dbConfig';


export const insert = async (table, dataStructure, values, data) => {
  const inserted = `INSERT INTO ${table} (${dataStructure}) VALUES(${values}) RETURNING *`;
  const { rows } = await pool.query(inserted, data);
  return rows[0];
};

export const select = async (data, table, condition) => {
  const { rows } = await pool.query(`SELECT ${data} FROM ${table} WHERE ${condition};`);
  return rows;
};

export const selectLast = async (data, table) => {
  const { rows } = await pool.query(`SELECT ${data} FROM ${table} ORDER BY id DESC LIMIT 1;`);
  return rows;
};

export const update = async (table, columns, condition) => {
  const { rows } = await pool.query(`UPDATE ${table} SET ${columns} WHERE ${condition} RETURNING *;`);
  return rows[0];
};

export const remove = async (table, columns, condition) => {
  const { rows } = await pool.query(`DELETE FROM ${table} WHERE ${columns} = ${condition} RETURNING *;`);
  return rows[0];
};
