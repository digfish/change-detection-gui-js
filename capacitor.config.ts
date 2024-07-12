import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'change-detection-gui-js',
  webDir: 'dist'
,
    android: {
       buildOptions: {
          keystorePath: 'd:\Dropbox\keystores\android-digfish-key1-2004',
          keystoreAlias: 'key',
       }
    }
  };

export default config;
