import React, {useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {requestUserPermission, notificationListener} from './notify'
export default function App () {
  useEffect(() => {
    requestUserPermission()
    notificationListener()
  }, [])
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{fontSize: 30}}>Hello</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
