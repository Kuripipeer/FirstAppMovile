import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FirstAppMovile',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      iconColor: '#488AFF', // Color del icono
    },
  },
};

export default config;
