"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
// Force development mode for testing - Keeping this for now, but consider removing if cross-env works later
process.env.NODE_ENV = 'development';
// console.log(`NODE_ENV explicitly set to: ${process.env.NODE_ENV}`); // Removed debug log
let serverProcess = null;
let viteProcess = null;
const VITE_DEV_SERVER_URL = 'http://localhost:5173';
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
async function waitForViteServer(url, maxAttempts = 60) {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            await new Promise((resolve, reject) => {
                const request = electron_1.net.request(url);
                request.on('response', () => resolve());
                request.on('error', (err) => setTimeout(() => reject(err), 100));
                request.end();
            });
            return true;
        }
        catch (err) {
            if (i === 0)
                console.log(`Waiting for Vite server at ${url}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    console.error(`Vite server did not start at ${url} after ${maxAttempts} seconds.`);
    return false;
}
const createWindow = async () => {
    console.log(`createWindow called. NODE_ENV: ${process.env.NODE_ENV}`);
    const mainWindow = new electron_1.BrowserWindow({
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
        }
        else {
            console.error('createWindow: Failed to connect to Vite server. Closing app.');
            electron_1.app.quit();
        }
    }
    else {
        console.log('createWindow: Production mode detected. Loading file...');
        const filePath = path_1.default.join(__dirname, '../dist/index.html');
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
                    }
                    else if (!mainWindow.isDestroyed()) {
                        console.error('Failed to reconnect to Vite server. Closing app.');
                        electron_1.app.quit();
                    }
                }
            }, 1000);
        }
    });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(async () => {
    console.log(`App ready. Main process NODE_ENV: ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV === 'development') {
        console.log('Starting Vite dev server...');
        viteProcess = (0, child_process_1.spawn)('npm', ['run', 'dev'], {
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
    }
    else {
        console.log('Skipping Vite dev server start (NODE_ENV is not \'development\')');
    }
    // Start the Node backend server process
    const serverDir = path_1.default.join(__dirname, '..', 'server');
    console.log(`Starting server process in: ${serverDir}`);
    serverProcess = (0, child_process_1.spawn)('node', ['index.js'], {
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
    // Create the window (waits for Vite if in development)
    await createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// Quit when all windows are closed, except on macOS.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// Ensure server and vite processes are killed when the app quits
electron_1.app.on('will-quit', () => {
    if (serverProcess) {
        console.log('Killing server process...');
        serverProcess.kill();
    }
    if (viteProcess) {
        console.log('Killing Vite process...');
        viteProcess.kill();
    }
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception in Main Process:', error);
});
