#!/usr/bin/env node

var component = require('./index.js');
var program = require('commander');
var fs = require('fs');
var path = require('path');

program
  .version('0.0.1')
  .option('-t, --target', 'Select a framework')
  .arguments('<file> [options]')
  .action(function (file, framework) {
    console.log(component.parse(fs.readFileSync(path.join(process.cwd(), file), 'utf8'), framework));
  })
  .parse(process.argv)

