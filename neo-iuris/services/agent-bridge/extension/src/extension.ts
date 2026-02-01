import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { BridgeServer } from './server';

let server: BridgeServer;

export function activate(context: vscode.ExtensionContext) {
    console.log('Antigravity Bridge is now active!');

    // Initialize Server
    server = new BridgeServer();
    server.start(8080);

    // Show Token
    vscode.window.showInformationMessage(`Bridge Token: ${server.getToken()}`);

    // Command to manually restart
    let disposable = vscode.commands.registerCommand('antigravityBridge.startServer', () => {
        server.start(8080);
        vscode.window.showInformationMessage(`Bridge Server Restarted. Token: ${server.getToken()}`);
    });

    context.subscriptions.push(disposable);

    // File Watcher for Artifacts
    // Targeting the global Antigravity brain path as per configuration
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (workspaceRoot) {
        // Fallback to local workspace if specific brain path isn't known at runtime, 
        // but typically this should be configured. For now watching workspace root for md/json.
        const watcher = vscode.workspace.createFileSystemWatcher('**/*.{md,json,diff}');

        watcher.onDidChange((uri) => broadcastArtifact('UPDATE', uri));
        watcher.onDidCreate((uri) => broadcastArtifact('CREATE', uri));

        context.subscriptions.push(watcher);
    }
}

function broadcastArtifact(event: string, uri: vscode.Uri) {
    try {
        const content = fs.readFileSync(uri.fsPath, 'utf8');
        const filename = path.basename(uri.fsPath);

        server.broadcast('ARTIFACT_UPDATE', {
            event,
            filename,
            content
        });
        console.log(`[Bridge] Broadcasted update for ${filename}`);
    } catch (error) {
        console.error(`[Bridge] Failed to read file ${uri.fsPath}:`, error);
    }
}

export function deactivate() { }
