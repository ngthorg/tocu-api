const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

fs.readdirSync(__dirname).forEach((file) => {
  /* If its the current file ignore it */
  if (file === 'index.js') {
    return;
  }

  /* Store module with its name (from filename) */
  module.exports[path.basename(file, '.json')] = require(
    path.join(__dirname, file)
  )[env];
});
