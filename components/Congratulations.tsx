import React, { type FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { screenHeight, screenWidth } from '../ts/windowDimensions'

interface CongratsProps {
  timeReached: boolean
  setTimeReached: (b: boolean) => void
  inputMinutes: number
  inputSeconds: number
}

const styles = StyleSheet.create({
  congratulations: {
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: '45%',
    left: '35%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: '60%',
    padding: '5%',
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    zIndex: 1,
    fontSize: screenHeight * 2
  },
  closeCongrats: {
    textAlign: 'center',
    marginTop: '4%',
    borderWidth: 1,
    borderColor: 'darkgrey',
    backgroundColor: 'lightgreen',
    fontWeight: 'bold',
    padding: 5
  }
})

const Congrats: FC<CongratsProps> = (props) => {
  function closeWindow (): void {
    props.setTimeReached(false)
  }

  return (
    <View style={styles.congratulations}>
      <Text style={{ textAlign: 'center', fontWeight: '800' }}>
        Congratulations!
        {'\n'}{'\n'}
        You breathed for{'\n'}
        { props.inputMinutes ? props.inputMinutes + ' minutes' : ''}
        {props.inputSeconds ? (props.inputMinutes ? ' and ' : '') + props.inputSeconds + ' seconds' : '' }!
        {'\n'}
      </Text>
      <TouchableOpacity style={styles.closeCongrats} onPress={closeWindow}>
        <Text style={{ textAlign: 'center', color: 'darkgreen', fontWeight: '800' }}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Congrats
