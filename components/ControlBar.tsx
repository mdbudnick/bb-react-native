import React, { type FC } from 'react'
import '../styles/control-bar.css'
import '../img/play-pause.svg'
import Timer from './Timer'
import { type ConfigInput } from '../ts/shared'
import { Pressable, StyleSheet, View } from 'react-native'
import { screenHeight, screenWidth } from '../ts/windowDimensions'

interface ControlBarProps {
  started: boolean
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
  paused: boolean
  timeReached: boolean
  setTimeReached: React.Dispatch<React.SetStateAction<boolean>>
  startFn: () => void
  stopFn: () => void
  pauseFn: () => void
  configInput: ConfigInput
}

const styles = StyleSheet.create({
  controlBar: {
    display: 'flex',
    marginTop: '2%',
    marginBottom: '2%',
    paddingVertical: '1%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  start: {
    alignSelf: 'flex-start',
    fontSize: screenHeight * 0.05,
    borderWidth: 4,
    borderColor: 'green',
    backgroundColor: 'lightgreen',
    borderRadius: screenWidth * 0.05,
    padding: 10,
    paddingVertical: screenHeight * 0.01
  },
  topBuffer: {
    marginTop: '19%'
  }
})

const ControlBar: FC<ControlBarProps> = (props) => {
  function startBreathBox (): void {
    props.startFn()
    props.setTimeReached(false)
  }

  function pauseBreathBox (): void {
    props.pauseFn()
  }

  function stopBreathBox (): void {
    props.stopFn()
  }

  return (
    <View
      style={
        props.started
          ? [styles.controlBar, styles.topBuffer]
          : [styles.controlBar]
      }
    >
      {props.started
        ? (
        <Timer
          started={props.started}
          startFn={startBreathBox}
          paused={props.paused}
          pauseFn={pauseBreathBox}
          setTimeReached={props.setTimeReached}
          stopFn={stopBreathBox}
          inputMinutes={props.configInput.inputMinutes}
          inputSeconds={props.configInput.inputSeconds}
          ascending={props.configInput.ascending}
        />
          )
        : (
        <Pressable style={styles.start} onPress={startBreathBox}>
          Start
        </Pressable>
          )}
    </View>
  )
}

export default ControlBar
