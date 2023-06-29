const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return new Promise((resolve, reject) => {
    let resolvedUser = null;
    const query = `
      SELECT * from users where email = $1
    `;
    pool
    .query(query, [email])
    .then((result) => {
      if (result.rows.length > 0) {
        resolvedUser = result.rows[0];
      }
      resolve(resolvedUser);
    })
    .catch((err => {
      reject(err.message);
    }));
  });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return new Promise((resolve, reject) => {
    let resolvedUser = null;
    const query = `
      SELECT * from users where id = $1;
    `;
    pool
    .query(query, [id])
    .then((result) => {
      if (result.rows.length > 0) {
        resolvedUser = result.rows[0];
      }
      resolve(resolvedUser);
    })
    .catch((err => {
      reject(err.message);
    }));
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return new Promise((resolve, reject) => {    
    if (!user || !user.name || !user.email || !user.password) {
      reject(new Error("User is missing one or more parameters"));
    }
    const insertQuery = `
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning *;
    `;    
    const queryParams = [user.name, user.email, user.password];    
    pool
      .query(insertQuery, queryParams)
      .then((result => {        
        resolve(result);
      }))
      .catch((err) => {        
        reject(err.message);
      });
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
