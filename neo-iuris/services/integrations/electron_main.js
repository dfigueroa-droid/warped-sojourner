const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let apiProcess;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Load the Next.js app
    mainWindow.loadURL('http://localhost:3000');

    // Inject Custom CSS for Desktop
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.insertCSS(`
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
    `);
    });
}

function startBackend() {
    // Spawn Python API in background
    apiProcess = spawn('python', ['./services/api_gateway.py'], {
        cwd: path.join(__dirname, '../../') // Adjust based on build structure
    });

    apiProcess.stdout.on('data', (data) => {
        console.log(`Backend: ${data}`);
    });
}

app.whenReady().then(() => {
    startBackend();
    // Wait for API to warm up
    setTimeout(createWindow, 3000);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (apiProcess) apiProcess.kill();
        app.quit();
    }
});
