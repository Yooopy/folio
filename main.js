const {app,BrowserWindow,ipcMain,dialog,nativeTheme}=require('electron');
const path=require('path'),fs=require('fs');
let win;
const pdfArg=argv=>argv.slice(1).find(a=>/\.pdf$/i.test(a)&&fs.existsSync(a));
function sendFile(f){
  if(!f||!win)return;
  win.webContents.send('open-file',{name:path.basename(f),data:fs.readFileSync(f)});
}
if(!app.requestSingleInstanceLock())app.quit();
app.on('second-instance',(e,argv)=>{
  if(win){if(win.isMinimized())win.restore();win.focus();sendFile(pdfArg(argv))}
});
app.whenReady().then(()=>{
  win=new BrowserWindow({
    width:1240,height:880,minWidth:720,minHeight:520,title:'Folio',
    backgroundColor:nativeTheme.shouldUseDarkColors?'#14161a':'#f4f5f7',
    autoHideMenuBar:true,
    webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false}
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname,'app','index.html'));
  win.webContents.once('did-finish-load',()=>sendFile(pdfArg(process.argv)));
  win.on('closed',()=>{win=null});
});
app.on('window-all-closed',()=>app.quit());
ipcMain.handle('save',async(e,{name,data})=>{
  const r=await dialog.showSaveDialog(win,{defaultPath:name,filters:[{name:'PDF',extensions:['pdf']}]});
  if(r.canceled||!r.filePath)return'cancel';
  fs.writeFileSync(r.filePath,Buffer.from(data));
  return'ok';
});
