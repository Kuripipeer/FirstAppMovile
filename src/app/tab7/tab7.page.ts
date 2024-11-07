import { Component, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page {
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
      console.error('Permios para recibir notificaciones no concedido');
    }

    // Escuchar el evento de registro
    PushNotifications.addListener('registration', (token) => {
      console.log('Token de registro: ' + token.value);
      // Aqui puedes enviar el token a tu servidor para enviar notificaciones a este dispositivo
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Error de registro: ', error);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Notificación recibida: ', notification);
        // Manjea la notificación (puedes mostrarla, almacenar datos, etc.)
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (action) => {
        console.log('Notificación tocada: ', action);
        // Aqui puedes manejar la lógica de la acción
      }
    );
  }

  // Función para simular la notificación en el navegador
  showNotification(notification: { title: string; body: string }) {
    const title = notification.title || 'Nueva Notificación';
    const message = notification.body || 'Has recibido una notificación';

    // Usar la API  de Notificaciones del navegador
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body: message,
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(title, {
              body: message,
            });
          }
        });
      }
    } else {
      alert(`${title}: ${message}`); // Fallback para navegadores que no soportan la API de Notificaciones
    }
  }
}
