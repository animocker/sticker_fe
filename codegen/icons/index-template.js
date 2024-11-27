// index-template.js
const path = require("path");

function defaultIndexTemplate(filePaths) {
  if (filePaths[0].originalPath.toString().includes("unknown")) {
    return 'export { default as Unknown } from "./Unknown";';
  }

  const importEntries = [];
  const exportEntries = [];
  let name = filePaths[0].originalPath.toString().split("/")[3];
  filePaths.forEach(({ path: filePath, originalPath }) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    importEntries.push(`import ${exportName} from './${basename}'`);
    const number = basename.replace("./", "");
    exportEntries.push(`${number}: ${exportName}`);
  });
  const imports = importEntries.join("\n");
  const object = `const ${name} = {
  ${exportEntries.join(",\n")}
};
`;
  return `${imports}\n${object}\nexport default ${name};`;
}

module.exports = defaultIndexTemplate;
