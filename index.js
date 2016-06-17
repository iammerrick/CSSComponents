const postcss = require('postcss');
const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const genericNames = require('generic-names');

const strategies = {
  react(name, template, css, args) {
    return Mustache.render(fs.readFileSync(path.join(__dirname, './react.template'), 'utf8'), {
      template: template.join('\n'),
      css: css.toResult().toString().replace(/\n/g, ''),
      name: name.replace('.', ''),
      args: args.join(',')
    });
  },
  angular2(name, template, css, args) {
    return Mustache.render(fs.readFileSync(path.join(__dirname, './angular2.template'), 'utf8'), {
      template: template.join('\n'),
      css: css.toResult().toString(),
      name: name.replace('.', '')
    });
  }
};

const generate = genericNames('[name]__[local]__[hash:base64:5]', {
  context: process.cwd()
});

const parse = (source, type = 'react') => {
  const tree = postcss.parse(source);
  const output = [];
  const css = postcss.root();
  const args = [];

  const getStyles = (rule) => {
    const selector = generate(rule.selector, 'Source');
    const nextRule = postcss.rule({
      selector: `.${selector}`
    });

    rule.each((node) => {
      if (node.type !== 'rule') {
        if (node.type === 'atrule' && node.name === 'component') return;
        nextRule.append(node);
      }
    });
    return {
      selector,
      rule: nextRule
    };
  };

  const walk = (node) => {
    if (node.type === 'rule') {
      const styles = getStyles(node);
      css.append(styles.rule);
      if (type === 'react') {
        output.push(`<div className='${styles.selector}'>`)
      }

      if (type === 'angular2') {
        output.push(`<div class="${styles.selector}">`)
      }
      node.each(walk);
      output.push('</div>');
    }
    if (node.type === 'atrule' && node.name === 'component') {
      args.push(node.params);
      if (type === 'react') {
        output.push(`{${node.params}}`);
      }
      if (type === 'angular2') {
        if (node.params === 'children') {
          output.push(`<ng-content></ng-content>`);
        } else {
          output.push(`<ng-content select="${node.params}"></ng-content>`);
        }
      }
    }
  };

  tree.each(walk);

  return strategies[type](tree.nodes[0].selector, output, css, args);
};

module.exports = {
  parse
};
