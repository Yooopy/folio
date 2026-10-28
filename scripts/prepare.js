// Copies the PDF libraries and the Persian/Arabic font from node_modules into app/
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),nm=path.join(root,'node_modules'),app=path.join(root,'app');
const lib=path.join(app,'lib'),fonts=path.join(app,'fonts');
fs.mkdirSync(lib,{recursive:true});fs.mkdirSync(fonts,{recursive:true});
const cp=(from,to)=>fs.copyFileSync(path.join(nm,from),path.join(lib,to));
cp('pdfjs-dist/build/pdf.min.js','pdf.min.js');
cp('pdfjs-dist/build/pdf.worker.min.js','pdf.worker.min.js');
cp('pdf-lib/dist/pdf-lib.min.js','pdf-lib.min.js');
const fdir=path.join(nm,'@fontsource/vazirmatn/files');
let css='';
for(const f of fs.readdirSync(fdir)){
  const m=f.match(/^vazirmatn-(arabic|latin|latin-ext)-400-normal\.woff2$/);if(!m)continue;
  fs.copyFileSync(path.join(fdir,f),path.join(fonts,f));
  const range={arabic:'U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F,U+0660-0669,U+06F0-06F9',
    latin:'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
    'latin-ext':'U+0100-02AF,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF'}[m[1]];
  css+=`@font-face{font-family:Vazirmatn;font-weight:400;font-display:swap;src:url(fonts/${f}) format("woff2");unicode-range:${range}}\n`;
}
fs.writeFileSync(path.join(app,'fonts.css'),css);
console.log('Folio: libraries and fonts ready.');
