import pool from '../config/dbConfig';


export const insert = async (table, dataStructure, values, data) => {
  const inserted = `INSERT INTO ${table} (${dataStructure}) VALUES(${values}) RETURNING *`;
  const { rows } = await pool.query(inserted, data);
  return rows[0];
};

export const select = async (data, table, condition) => {
  const { rows } = await pool.query(`SELECT ${data} FROM ${table} WHERE ${condition};`);
  return rows;
};
