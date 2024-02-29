import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize("chicharrika", "root", "Segismundo.36", {
  host: 'localhost',
  dialect: "mysql",
  dialectModule: mysql2, // Agrega esta línea
});

export default db;
