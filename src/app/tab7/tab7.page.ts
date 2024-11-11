import { Component } from '@angular/core';
import {
  LocalNotifications,
  ScheduleOptions,
} from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page {
  isButtonDisabled = false;
  countdown: number | null = null;

  constructor() {
    // Cargar el estado al iniciar la aplicación
    this.loadState();
    this.initPushNotifications();
  }

  async loadState() {
    const buttonState = await Preferences.get({ key: 'isButtonDisabled' });
    const endTimeValue = await Preferences.get({ key: 'endTime' });

    this.isButtonDisabled = buttonState.value === 'true';

    if (endTimeValue.value) {
      const endTime = parseInt(endTimeValue.value, 10);
      const now = Date.now();
      const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));

      if (timeLeft > 0) {
        this.countdown = timeLeft;
        this.startCountdown(timeLeft);
      } else {
        this.isButtonDisabled = false;
        this.countdown = null;
        await Preferences.set({ key: 'isButtonDisabled', value: 'false' });
        await Preferences.remove({ key: 'endTime' });
      }
    }
  }

  async initPushNotifications() {
    const permission = await LocalNotifications.requestPermissions();

    if (permission.display === 'granted') {
      LocalNotifications.addListener(
        'localNotificationActionPerformed',
        async (notification) => {
          console.log('Notificación activada: ', notification);
          this.isButtonDisabled = false;
          this.countdown = null;

          await Preferences.set({ key: 'isButtonDisabled', value: 'false' });
          await Preferences.remove({ key: 'endTime' });
        }
      );
    }
  }

  handleButtonClick() {
    this.isButtonDisabled = true;
    Preferences.set({ key: 'isButtonDisabled', value: 'true' });
    this.scheduleNotification();
  }

  async scheduleNotification() {
    const notificationTime = new Date(Date.now() + 20 * 1000); // 20 segundos a partir de ahora
    // alert('Notificación programada para: ' + notificationTime.toLocaleString());

    const options: ScheduleOptions = {
      notifications: [
        {
          title: 'Notificación programada',
          body: 'Esta notificación se envió después de 20 segundos',
          id: Math.floor(Math.random() * 100000),
          schedule: { at: notificationTime },
          sound: 'default',
        },
      ],
    };

    try {
      await LocalNotifications.schedule(options);
      // alert('Notificación programada con éxito');
    } catch (error) {
      console.log('Error al programar la notificación:', error);
      alert('Error al programar la notificación:' + (error as Error).message);
    }

    // Iniciar el contador y guardar el estado
    this.startCountdown(20);
  }

  async startCountdown(seconds: number) {
    const endTime = Date.now() + seconds * 1000;
    await Preferences.set({ key: 'endTime', value: endTime.toString() });

    this.countdown = seconds;
    const interval = setInterval(async () => {
      const now = Date.now();
      const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
      this.countdown = timeLeft;

      if (this.countdown <= 0) {
        clearInterval(interval);
        this.isButtonDisabled = false;
        await Preferences.set({ key: 'isButtonDisabled', value: 'false' });
        await Preferences.remove({ key: 'endTime' });
      }
    }, 1000);
  }
}
