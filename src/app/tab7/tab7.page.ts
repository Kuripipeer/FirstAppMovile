import { Component } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page {
  isButtonDisabled = false;
  countdown: number | null = null;

  constructor() {
    // Inicializar las notificaciones al cargar la aplicación
    this.initPushNotifications();
  }

  // Solicitar permiso para recibir notificaciones
  async initPushNotifications() {
    // Solicitar permiso al usuario
    const permission = await PushNotifications.requestPermissions();

    if (permission.receive === 'granted') {
      // Registro de la aplicación para recibir notificaciones
      await PushNotifications.register();
    } else {
      console.error('Permiso para recibir notificaciones no concedido');
    }

    // Listener para habilitar el botón cuando llegue la notificación
    LocalNotifications.addListener(
      'localNotificationReceived',
      (notification) => {
        console.log('Notificación recibida: ', notification);
        this.isButtonDisabled = false;
        this.countdown = null;
      }
    );
  }

  // Función para manejar el clic del botón
  handleButtonClick() {
    this.isButtonDisabled = true;
    this.scheduleNotification();
  }

  // Función para programar una notificación
  scheduleNotification() {
    const notificationTime = new Date(Date.now() + 2 * 60000); // 2 minutos a partir de ahora
    console.log(
      'Notificación programada para: ',
      notificationTime.toLocaleString()
    );

    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Notificación programada',
          body: 'Esta notificación se envió después de 2 minutos',
          id: new Date().getTime(),
          schedule: { at: notificationTime },
          sound: 'default', // Especifica el sonido aquí
          attachments: undefined,
          actionTypeId: '',
          extra: null,
        },
      ],
    });

    // Iniciar el contador
    this.startCountdown(120); // 120 segundos = 2 minutos
  }

  // Función para iniciar el contador
  startCountdown(seconds: number) {
    this.countdown = seconds;
    const interval = setInterval(() => {
      if (this.countdown !== null) {
        this.countdown--;
      }
      if (this.countdown !== null && this.countdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  // // Solicitar permiso al usuario
  // const permission = await PushNotifications.requestPermissions();

  // if (permission.receive === 'granted') {
  //   // Registro de la aplicación para recibir notificaciones
  //   await PushNotifications.register();
  //   // Configurar el envío de notificaciones cada minuto
  //   this.scheduleNotifications();
  // } else {
  //   console.error('Permios para recibir notificaciones no concedido');
  // }

  // Función para enviar una notificación
  // sendNotification() {
  //   PushNotifications.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     importance: 5,
  //     visibility: 1,
  //     sound: 'default',
  //   });

  //   PushNotifications.addListener(
  //     'pushNotificationReceived',
  //     (notification) => {
  //       console.log('Notificación recibida: ', notification);
  //     }
  //   );

  //   PushNotifications.addListener(
  //     'pushNotificationActionPerformed',
  //     (notification) => {
  //       console.log('Acción de notificación realizada: ', notification);
  //     }
  //   );
  //   LocalNotifications.schedule({
  //     notifications: [
  //       {
  //         title: 'Notificación periódica',
  //         body: 'Esta es una notificación enviada cada minuto',
  //         id: new Date().getTime(),
  //         schedule: { at: new Date(Date.now() + 60000) },
  //         sound: 'default',
  //         attachments: undefined,
  //         actionTypeId: '',
  //         extra: null,
  //       },
  //     ],
  //   });
  // }

  // // Configurar el envío de notificaciones cada minuto
  // scheduleNotifications() {
  //   setInterval(() => {
  //     this.sendNotification();
  //   }, 60000); // 60000 ms = 1 minuto
  // }

  // Función para simular la notificación en el navegador
  // showNotification(notification: { title: string; body: string }) {
  //   const title = notification.title || 'Nueva Notificación';
  //   const message = notification.body || 'Has recibido una notificación';

  //   // Usar la API  de Notificaciones del navegador
  //   if ('Notification' in window) {
  //     if (Notification.permission === 'granted') {
  //       new Notification(title, {
  //         body: message,
  //       });
  //     } else if (Notification.permission !== 'denied') {
  //       Notification.requestPermission().then((permission) => {
  //         if (permission === 'granted') {
  //           new Notification(title, {
  //             body: message,
  //           });
  //         }
  //       });
  //     }
  //   } else {
  //     alert(`${title}: ${message}`); // Fallback para navegadores que no soportan la API de Notificaciones
  //   }
  // }
}
