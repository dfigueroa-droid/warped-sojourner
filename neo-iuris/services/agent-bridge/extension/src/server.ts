import * as WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

export class BridgeServer {
    private wss: WebSocket.Server | null = null;
    private authToken: string;

    constructor() {
        this.authToken = uuidv4();
    }

    public start(port: number = 8080): void {
        this.wss = new WebSocket.Server({ port });

        console.log(`[Bridge] Server running on port ${port}`);
        console.log(`[Bridge] SECURITY TOKEN: ${this.authToken}`);

        this.wss.on('connection', (ws, req) => {
            // Basic Auth Shake
            ws.on('message', (message) => {
                try {
                    const data = JSON.parse(message.toString());

                    // Auth Check
                    if (data.type === 'AUTH' && data.token === this.authToken) {
                        ws.send(JSON.stringify({ type: 'AUTH_SUCCESS' }));
                        console.log('[Bridge] Client Authenticated');
                        return;
                    }

                    // Handle Commands
                    if (data.type === 'COMMAND') {
                        console.log(`[Bridge] Received Command: ${data.command}`);
                        // Handle command dispatcher here
                    }
                } catch (e) {
                    console.error('[Bridge] Error parsing message', e);
                }
            });
        });
    }

    public broadcast(type: string, payload: any): void {
        if (!this.wss) return;

        const message = JSON.stringify({ type, payload });
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    public getToken(): string {
        return this.authToken;
    }
}
