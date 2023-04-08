import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export default class Notifications {

  public static async register(): Promise<string | null> {

    // Чек доступности нотификаций
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (!isPushNotificationsAvailable) return null;

    let notifyToken = null;

    const addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        //console.info('Registration token: ', token.value);
        notifyToken = token.value;
      });

      await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
      });

      await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
      });

      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    }

    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    }

    const getDeliveredNotifications = async () => {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    }

    await addListeners();
    await registerNotifications();
    await getDeliveredNotifications();

    return notifyToken;

  }

}