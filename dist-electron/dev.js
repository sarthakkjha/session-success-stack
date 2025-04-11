"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const child_process_1 = require("child_process");
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // Start Vite development server
    const viteProcess = (0, child_process_1.spawn)('npm', ['run', 'dev'], { shell: true });
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
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
