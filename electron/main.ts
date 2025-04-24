import { app, BrowserWindow, net } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn, ChildProcess } from 'child_process';

process.env.NODE_ENV = 'development';

let serverProcess: ChildProcess | null = null;
let viteProcess: ChildProcess | null = null;
let screenpipeProcess: ChildProcess | null = null;
const VITE_DEV_SERVER_URL = 'http://localhost:5173';

if (require('os').platform() === 'win32') {
  require('electron-squirrel-startup');
}


async function waitForViteServer(url: string, maxAttempts = 60): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const request = net.request(url);
        request.on('response', () => resolve());
        request.on('error', (err) => setTimeout(() => reject(err), 100));
        request.end();
      });
      return true;
    } catch (err) {
      if (i === 0) console.log(`Waiting for Vite server at ${url}...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  console.error(`Vite server did not start at ${url} after ${maxAttempts} seconds.`);
  return false;
}

const createWindow = async () => {
  console.log(`createWindow called. NODE_ENV: ${process.env.NODE_ENV}`);
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('createWindow: Development mode detected. Waiting for Vite...');
    const serverReady = await waitForViteServer(VITE_DEV_SERVER_URL);
    if (serverReady) {
      console.log('createWindow: Vite ready, loading URL:', VITE_DEV_SERVER_URL);
      mainWindow.loadURL(VITE_DEV_SERVER_URL);
      mainWindow.webContents.openDevTools();
    } else {
      console.error('createWindow: Failed to connect to Vite server. Closing app.');
      app.quit();
    }
  } else {
    console.log('createWindow: Production mode detected. Loading file...');
    const filePath = path.join(__dirname, '../dist/index.html');
    console.log('createWindow: Loading file path:', filePath);
    mainWindow.loadFile(filePath);
  }

  // Add error handler for page load failures
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error(`Failed to load page: ${validatedURL} - ${errorDescription} (${errorCode})`);
    if (process.env.NODE_ENV === 'development' && validatedURL === VITE_DEV_SERVER_URL) {
      console.log('Retrying connection to Vite server in 1 second...');
      setTimeout(async () => {
        if (!mainWindow.isDestroyed()) {
          const serverReady = await waitForViteServer(VITE_DEV_SERVER_URL, 5);
          if (serverReady && !mainWindow.isDestroyed()) {
            mainWindow.loadURL(VITE_DEV_SERVER_URL);
          } else if (!mainWindow.isDestroyed()) {
            console.error('Failed to reconnect to Vite server. Closing app.');
            app.quit();
          }
        }
      }, 1000);
    }
  });
};

app.whenReady().then(async () => {
  console.log(`App ready. Main process NODE_ENV: ${process.env.NODE_ENV}`);

  if (process.env.NODE_ENV === 'development') {
    console.log('Starting Vite dev server...');
    viteProcess = spawn('npm', ['run', 'dev'], {
        shell: true,
        stdio: 'pipe',
        env: { ...process.env, BROWSER: 'none' }
    });

    viteProcess.stdout?.on('data', (data) => {
      console.log(`Vite stdout: ${data.toString().trim()}`);
    });
    viteProcess.stderr?.on('data', (data) => {
      console.error(`Vite stderr: ${data.toString().trim()}`);
    });
    viteProcess.on('error', (error) => {
      console.error(`Failed to start Vite process: ${error}`);
    });
    viteProcess.on('close', (code) => {
      console.log(`Vite process exited with code ${code}`);
      viteProcess = null;
    });
  } else {
    console.log('Skipping Vite dev server start (NODE_ENV is not \'development\')');
  }

  const serverDir = path.join(__dirname, '..', 'server');
  console.log(`Starting server process in: ${serverDir}`);
  serverProcess = spawn('node', ['index.js'], {
    cwd: serverDir,
    stdio: 'pipe',
    shell: process.platform === 'win32',
  });

  serverProcess.stdout?.on('data', (data) => {
    console.log(`Server stdout: ${data.toString().trim()}`);
  });
  serverProcess.stderr?.on('data', (data) => {
    console.error(`Server stderr: ${data.toString().trim()}`);
  });
  serverProcess.on('error', (error) => {
    console.error(`Failed to start server process: ${error}`);
  });
  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    serverProcess = null;
  });

  // Start the screenpipe process
  console.log('Starting screenpipe process...');
  try {
    screenpipeProcess = spawn('screenpipe', [], {
        shell: true,
        stdio: 'pipe'
    });

    screenpipeProcess.stdout?.on('data', (data) => {
        // console.log(`Screenpipe stdout: ${data.toString().trim()}`); // Removed stdout log
    });
    screenpipeProcess.stderr?.on('data', (data) => {
        // console.error(`Screenpipe stderr: ${data.toString().trim()}`); // Removed stderr log
    });
    screenpipeProcess.on('error', (error) => {
        console.error(`Failed to start screenpipe process: ${error}`);
    });
    screenpipeProcess.on('close', (code) => {
        console.log(`Screenpipe process exited with code ${code}`);
        screenpipeProcess = null;
    });
  } catch (error) {
      console.error(`Error spawning screenpipe: ${error}`);
  }

  // Create the window (waits for Vite if in development)
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Ensure server, vite, and screenpipe processes are killed when the app quits
app.on('will-quit', () => {
  if (serverProcess) {
    console.log('Killing server process...');
    serverProcess.kill();
  }
  if (viteProcess) {
    console.log('Killing Vite process...');
    viteProcess.kill();
  }
  if (screenpipeProcess) {
    console.log('Killing Screenpipe process...');
    try {
      screenpipeProcess.kill();
      // Force kill after 5 seconds if process hasn't exited
      setTimeout(() => {
        if (screenpipeProcess) {
          console.log('Force killing Screenpipe process...');
          screenpipeProcess.kill('SIGKILL');
        }
      }, 5000);
    } catch (error) {
      console.error('Error killing Screenpipe process:', error);
    }
  }
});

// Handle process termination signals
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal');
  if (screenpipeProcess) {
    screenpipeProcess.kill();
  }
  app.quit();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT signal');
  if (screenpipeProcess) {
    screenpipeProcess.kill();
  }
  app.quit();
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception in Main Process:', error);
}); 