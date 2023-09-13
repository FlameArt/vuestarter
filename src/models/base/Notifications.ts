import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

import REST from 'flamerest';

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


  public static async getPushInfo() {

    REST.pushNotificationToken = await Notifications.register();

    const pushTokenInfo = {
      uuid: (await Device.getId()).uuid,
      platform: Capacitor.getPlatform(),
      browser: this.getBrowserName(),
      token: REST.pushNotificationToken,
    }

    return pushTokenInfo;

  }

  public static getBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      return "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
      return "Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
      return "Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
    } else {
      return "Unknown";
    }
  }

}