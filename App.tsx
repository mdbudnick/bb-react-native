import React, { type FC, type PropsWithChildren } from 'react'
import { AppRegistry, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import BreathBox from './components/BreathBox'
import './assets/img/buddha-gnome.jpg'
import { screenWidth } from './ts/windowDimensions'

const styles = StyleSheet.create({
  central: {
    marginTop: '35%',
    alignSelf: 'center',
    width: '30%',
    height: '80%',
    fontFamily: 'Haettenschweiler, "Arial Narrow Bold", sans-serif'
  },
  centralResponsive: {
    marginTop: '35%',
    alignSelf: 'center',
    width: '80%',
    height: '100%'
  }
})

const App: FC = (prop: PropsWithChildren) => {
  return (
    <LinearGradient
      colors={['rgb(30, 50, 80)', 'rgb(182, 126, 82)', 'rgb(114, 124, 138)']}
    >
      <View
        style={screenWidth < 1000 ? styles.centralResponsive : styles.central}
      >
        <BreathBox />
      </View>
    </LinearGradient>
  )
}

export default App
