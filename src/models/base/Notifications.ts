import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

import REST from 'flamerest';
import { storeFile } from '@/store';
// @ts-expect-error types
import Webpush from 'webpush-client'
import { settingsFile } from '@/settings';

export default class Notifications {

  public static async register(): Promise<string | null> {

    console.log("push reg started");



    // Чек доступности нотификаций
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (!isPushNotificationsAvailable) {
      console.log("PUSH PLUGIN IS NOT AVAILABLE")
      return null;
    }

    const getToken = new Promise<string>((resolve, reject) => {
      try {
        let notifyToken = null;

        const addListeners = () => {


          PushNotifications.addListener('registration', token => {
            //console.info('Registration token: ', token.value);
            notifyToken = token.value;
            console.log("TOKEN " + notifyToken)
            resolve(notifyToken);
          });


          PushNotifications.addListener('registrationError', err => {
            console.error('Registration error: ', err.error);
            reject(err.error);
          });

          PushNotifications.addListener('pushNotificationReceived', notification => {
            console.log('Push notification received: ', notification);
          });

          PushNotifications.addListener('pushNotificationActionPerformed', notification => {
            console.log('Push notification action performed', notification.actionId, notification.inputValue);
          });



        }

        const registerNotifications = async () => {
          let permStatus = await PushNotifications.checkPermissions();

          if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
          }

          if (permStatus.receive !== 'granted') {
            console.log('User denied permissions!');
            throw new Error('User denied permissions!');
          }

          await PushNotifications.register();
        }

        const getDeliveredNotifications = async () => {
          const notificationList = await PushNotifications.getDeliveredNotifications();
          console.log('delivered notifications', notificationList);
        }

        addListeners();
        registerNotifications();
        //await getDeliveredNotifications();

      }
      catch (ex: any) {
        console.log('token get error 2: ' + ex);
      }

    });

    try {
      return await getToken;
    }
    catch (ex: any) {
      console.log('token get error: ' + ex);
      return null;
    }

  }

  public static async registerWeb() {
    
    if (import.meta.env.SSR) return false;

    const wp = Webpush;

    return wp.create({
      serviceWorkerPath: '/webpush-sw.js',
      serverKey: settingsFile().webNotificationsServerVAPIDKey,
    })
      .then((WebPushClient: any) => {
        // do stuff with WebPushClient
        console.log(WebPushClient);
        return WebPushClient.subscribe()
      })
      .then((r: any) => {
        const res = r.toJSON();
        return {
          token: res.endpoint,
          token_p256dh: res.keys.p256dh,
          token_auth: res.keys.auth,
        }
      })
  }

  public static async getToken() {
    try {
      REST.pushNotificationToken = await Notifications.register();
    }
    catch (ex) {
      console.log(ex);
      return null;
    }
    console.log('REST.pushNotificationToken:' + REST.pushNotificationToken);

    if (REST.pushNotificationToken === null) return null;

    return REST.pushNotificationToken;
  }

  public static async getPushInfo() {

    let webTokens: any = null;

    try {
      if (storeFile().isMobile)
        // mobile
        REST.pushNotificationToken = await Notifications.register();
      else {
        // web
        REST.pushNotificationToken = await Notifications.registerWeb();
        webTokens = REST.pushNotificationToken;
      }
    }
    catch (ex) {
      console.log(ex);
      return null;
    }
    console.log('REST.pushNotificationToken:' + REST.pushNotificationToken);

    if (REST.pushNotificationToken === null) return null;

    const pushTokenInfo = {
      uuid: (await Device.getId()).identifier,
      platform: Capacitor.getPlatform(),
      browser: this.getBrowserName(),
      token: webTokens?.token ?? REST.pushNotificationToken,
      token_p256dh: webTokens?.token_p256dh ?? null,
      token_auth: webTokens?.token_p256dh ?? null,
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

  public static async checkPermissions() {
    return await PushNotifications.checkPermissions();
  }

  public static async getDeviceUUID() {
    return (await Device.getId()).identifier;
  }

}