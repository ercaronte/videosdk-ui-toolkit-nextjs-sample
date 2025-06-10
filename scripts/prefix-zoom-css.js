// scripts/prefix-zoom-css.js

// following advice from
// https://github.com/zoom/videosdk-ui-toolkit-web/issues/53#issuecomment-2892906824


const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const prefixSelector = require('postcss-prefix-selector');

// Define input and output paths relative to the project root
const inputFile = path.resolve(__dirname, '../node_modules/@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css');
const outputFile = path.resolve(__dirname, '../app/components/prefixed/videosdk-ui-toolkit.prefixed.css');

console.log(`Attempting to prefix CSS from: ${inputFile}`);
console.log(`Outputting prefixed CSS to: ${outputFile}`);

try {
  const originalCss = fs.readFileSync(inputFile, 'utf8');

  postcss([
    prefixSelector({
      prefix: '.zoom-sdk-scope', // Your chosen prefix
      exclude: [new RegExp(':root\\[zoom-data-theme=(.+)]')], // this is to keep the :root CSS custom properties specific for the uitoolkit
      skipGlobalSelectors: false
    })
  ])
    .process(originalCss, { from: inputFile, to: outputFile })
    .then(result => {
      fs.writeFileSync(outputFile, result.css);
      // Optionally write the sourcemap if generated
      // if (result.map) {
      //   fs.writeFileSync(outputFile + '.map', result.map.toString());
      // }
      console.log(`Successfully prefixed CSS and saved to ${outputFile}`);
    })
    .catch(error => {
      console.error('Error during PostCSS processing:', error);
      process.exit(1);
    });

} catch (error) {
  console.error(`Error reading input file ${inputFile}:`, error);
  process.exit(1);
}