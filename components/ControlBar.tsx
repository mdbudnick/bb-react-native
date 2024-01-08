import React, { type FC } from 'react'
import Timer from './Timer'
import { type ConfigInput } from '../ts/shared'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import commonStyles from '../ts/stylesheet'

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
  setConfigOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const styles = StyleSheet.create({
  controlBar: {
    marginTop: '2%',
    marginBottom: '2%',
    paddingVertical: '1%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  config: { fontSize: 28, margin: 10, color: 'grey' },
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
          <View style={{flexDirection: 'row'}}>
          <Pressable style={commonStyles.bigGreenButton} onPress={startBreathBox}>
            <Text>Start</Text>
          </Pressable>
          <Pressable onPress={() => props.setConfigOpen(true)}>
            <Icon style={ styles.config } name="cog"></Icon>
          </Pressable>
        </View>
          )}
    </View>
  )
}

export default ControlBar
