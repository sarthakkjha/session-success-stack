const { app, BrowserWindow, net } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

async function waitForViteServer(url: string, maxAttempts: number = 30): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const request = net.request(url);
        request.on('response', () => resolve());
        request.on('error', reject);
        request.end();
      });
      return true;
    } catch (err) {
      console.log(`Waiting for Vite server... attempt ${i + 1}/${maxAttempts}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return false;
}

async function createWindow(): Promise<void> {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Start Vite development server
  const viteProcess = spawn('npm', ['run', 'dev'], { 
    shell: true,
    env: { ...process.env, ELECTRON: 'true' }
  });
  
  viteProcess.stdout.on('data', (data: Buffer) => console.log(data.toString()));
  viteProcess.stderr.on('data', (data: Buffer) => console.error(data.toString()));

  console.log('Waiting for Vite server to start...');
  
  try {
    const serverReady = await waitForViteServer('http://localhost:5173');
    
    if (serverReady) {
      console.log('Vite server is ready, loading the application...');
      await win.loadURL('http://localhost:5173');
      win.webContents.openDevTools();
    } else {
      console.error('Failed to start Vite server');
      app.quit();
    }
  } catch (error) {
    console.error('Error during startup:', error);
    app.quit();
  }

  win.on('closed', () => {
    viteProcess.kill();
  });

  // Add error handler for page load failures
  win.webContents.on('did-fail-load', (
    event: Electron.Event,
    errorCode: number,
    errorDescription: string
  ) => {
    console.error('Failed to load page:', errorDescription);
    // Optionally reload the page
    setTimeout(() => win.reload(), 1000);
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

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught exception:', error);
});