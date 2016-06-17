var component = require('../index');
module.exports = function(source) {
  return component.parse(source, 'react');
};
