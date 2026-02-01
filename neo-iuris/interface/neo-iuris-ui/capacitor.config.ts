import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.neoiuris.supremacy',
    appName: 'Neo-Iuris v8.0',
    webDir: 'out', // Assumes 'next export' or static build
    server: {
        androidScheme: 'https',
        // In dev, use the local IP:
        // url: 'http://192.168.1.x:3000',
        // cleartext: true
    },
    plugins: {
        PushNotifications: {
            presentationOptions: ["badge", "sound", "alert"],
        },
        Camera: {
            permissions: ["camera", "photos"]
        },
        Geolocation: {
            permissions: ["location"]
        }
    }
};

export default config;
