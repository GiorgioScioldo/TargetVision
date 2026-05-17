/// <reference types="@capacitor/cli" />

const config = {
  appId: 'org.targetvision.app',
  appName: 'TargetVision',
  webDir: 'www',
  android: {
    // Permette di usare la WebView con WebRTC ad alta risoluzione
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  server: {
    androidScheme: 'https'
  }
};

module.exports = config;
