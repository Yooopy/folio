const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('api',{
  save:(name,data)=>ipcRenderer.invoke('save',{name,data}),
  onOpen:cb=>ipcRenderer.on('open-file',(_e,p)=>cb(p))
});
