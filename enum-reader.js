const ts = require('typescript');
const fs = require('fs');
const path = require('path');

class EnumConsoleWebpackPlugin {
  constructor(options) {
    this.file = options.file;
    this.enumName = options.enumName;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(
      'EnumConsoleWebpackPlugin',
      (compilation, callback) => {
        const filePath = path.resolve(compiler.context, this.file);
        const tsContent = fs.readFileSync(filePath, 'utf8');
        const enumContent = this.extractEnum(tsContent, this.enumName);
        if (enumContent) {
          console.log(`\nEnum ${this.enumName} from ${this.file}:`);
          console.log(enumContent);
        } else {
          console.warn(
            `Enum ${this.enumName} not found in file: ${this.file}`
          );
        }
        callback();
      }
    );
  }

  extractEnum(tsContent, enumName) {
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      tsContent,
      ts.ScriptTarget.Latest
    );
    let enumObj = null;
    function visit(node) {
      if (
        ts.isEnumDeclaration(node) &&
        node.name.text === enumName
      ) {
        enumObj = {};
        node.members.forEach(member => {
          const name = member.name.text;
          let value;
          if (member.initializer) {
            value = member.initializer.text || member.initializer.getText();
          } else {
            value = undefined;
          }
          enumObj[name] = value;
        });
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return enumObj;
  }

  extractConst(tsContent, constName) {
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      tsContent,
      ts.ScriptTarget.Latest
    );
    let foundObj = null;
    function visit(node) {
      if (
        ts.isVariableStatement(node)
      ) {
        node.declarationList.declarations.forEach(decl => {
          if (
            decl.name &&
            decl.name.text === constName &&
            decl.initializer &&
            ts.isObjectLiteralExpression(decl.initializer)
          ) {
            foundObj = {};
            decl.initializer.properties.forEach(prop => {
              const key = prop.name.text;
              let value;
              if (ts.isStringLiteral(prop.initializer) || ts.isNumericLiteral(prop.initializer)) {
                value = prop.initializer.text;
              } else {
                value = prop.initializer.getText();
              }
              foundObj[key] = value;
            });
          }
        });
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return foundObj;
  }
}

module.exports = EnumConsoleWebpackPlugin;

const EnumConsoleWebpackPlugin = require('./enum-console-webpack-plugin');

module.exports = {
  // ...ваша остальная конфигурация webpack
  plugins: [
    new EnumConsoleWebpackPlugin({
      file: './example.ts',
      enumName: 'SIMPLE_ENUM'
    })
  ]
};
