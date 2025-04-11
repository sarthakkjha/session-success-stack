import { app, BrowserWindow } from 'electron';
import path from 'path';
import { spawn } from 'child_process';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Start Vite development server
  const viteProcess = spawn('npm', ['run', 'dev'], { shell: true });
  
  viteProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
    if (output.includes('Local:')) {
      // Once Vite server is ready, load the app
      win.loadURL('http://localhost:5173');
      win.webContents.openDevTools();
    }
  });

  win.on('closed', () => {
    viteProcess.kill();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 