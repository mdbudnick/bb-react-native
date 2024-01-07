import React, { type FC, type PropsWithChildren } from 'react'
import BreathBox from './src/components/BreathBox'
import './assets/img/buddha-gnome.jpg'
import { StyleSheet, View } from 'react-native'
import { screenWidth } from './src/ts/windowDimensions'

const styles = StyleSheet.create({
  central: {
    marginTop: '10%',
    alignSelf: 'center',
    width: '30%',
    height: '80%',
    fontFamily: 'Haettenschweiler, "Arial Narrow Bold", sans-serif'
  },
  centralResponsive: {
    marginTop: '15%',
    width: '80%',
    height: '70%'
  }
})

const App: FC = (prop: PropsWithChildren) => {
  return (
    <View
      style={screenWidth < 1000 ? styles.centralResponsive : styles.central}
    >
      <BreathBox />
    </View>
  )
}

export default App
