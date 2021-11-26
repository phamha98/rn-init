import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function requestUserPermission () {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
    getFcmToken()
  }
}
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  console.log(fcmToken, 'the old token')
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken()
      if (fcmToken) {
        console.log('the new genrated token', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }
}
export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Nofionbackground', remoteMessage.notification)
  })
  messaging().onMessage(async remoteMessage => {
    console.log('recived in fo', remoteMessage)
    alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
  })
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notifi2', remoteMessage.notification)
      }
    })
}
