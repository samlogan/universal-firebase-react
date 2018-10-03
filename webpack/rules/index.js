const javascript = require('./javascript');
const css = require('./css');
const image = require('./image');
const svg = require('./svg');
const file = require('./file');

module.exports = ({ production = false, browser = false } = {}) => (
  [
    javascript({ production, browser }),
    css({ production, browser }),
    image(),
    svg(),
    file
  ]
);
