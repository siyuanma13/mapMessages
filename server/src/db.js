const monk = require('monk');

const db = monk("mongodb://mapuser:mapuser123@ds133570.mlab.com:33570/guestmap");

module.exports = db;