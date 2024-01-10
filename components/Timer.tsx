import React, { useEffect, useState, type FC } from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { screenHeight } from '../ts/windowDimensions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface TimerProps {
  started: boolean
  startFn: () => void
  paused: boolean
  pauseFn: () => void
  setTimeReached: React.Dispatch<React.SetStateAction<boolean>>
  stopFn: () => void
  inputMinutes: number
  inputSeconds: number
  ascending: boolean
}

const styles = StyleSheet.create({
  pause: {
    marginTop: 10,
    marginLeft: 10,
    borderColor: 'green',
    borderWidth: 1,
    fontSize: 42,
    display: 'none'
  },
  stop: {
    height: 30,
    width: 30,
    marginTop: 18,
    marginLeft: 10,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 1,
    display: 'none'
  },
  timer: {
    alignSelf: 'center',
    fontSize: 32,
    color: 'black',
    padding: 5,
    paddingVertical: screenHeight * 0.01
  }
})

let minutes: number | undefined
let seconds: number | undefined
let timerInterval: ReturnType<typeof setInterval> | null
const Timer: FC<TimerProps> = (props) => {
  const [timerText, setTimerText] = useState<string>('')
  const [initialized, setInitialized] = useState<boolean>(false)
  minutes ??= props.ascending ? 0 : props.inputMinutes
  seconds ??= props.ascending ? 0 : props.inputSeconds
  const targetTime = props.inputMinutes * 60 + props.inputSeconds

  function pauseTimer (): void {
    props.pauseFn()
    clearTimerInterval()
  }

  function resumeTimer (): void {
    timerFn()
    timerInterval = setInterval(timerFn, 1000)
    if (initialized) {
      props.startFn()
    }
  }

  function timerFn (): void {
    props.ascending ? incrementTimer() : decrementTimer()
    checkTimer()
  }

  function stopTimer (): void {
    minutes = undefined
    seconds = undefined
    clearTimerInterval()
    props.stopFn()
  }

  function incrementTimer (): void {
    ++seconds!
    if (seconds === 60) {
      ++minutes!
      seconds = 0
    }
    setTimerText('' + minutes + ':' + (seconds! < 10 ? '0' + seconds : seconds))
  }

  function decrementTimer (): void {
    if (seconds! <= 0) {
      --minutes!
      seconds = 60
    }
    --seconds!
    setTimerText('' + minutes + ':' + (seconds! < 10 ? '0' + seconds : seconds))
  }

  function clearTimerInterval (): void {
    if (timerInterval !== null) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  function checkTimer (): void {
    if (minutes! * 60 + seconds! > targetTime) {
      props.setTimeReached(true)
      stopTimer()
    }
  }

  useEffect(() => {
    // we +-1 here because of initial render and pause logic calling increment or decrement twice
    seconds! += props.ascending ? -1 : 1
    if (props.started && !props.paused) {
      // Clear to be safe
      clearTimerInterval()
      // we +-1 here because of initial render and pause logic calling increment or decrement twice
      seconds! += props.ascending ? -1 : 1
      resumeTimer()
    }
    timerFn()
    setInitialized(true)
  }, [props.started])

  return (
    <View key="timer" style={{flexDirection: 'row', alignSelf: 'center'}}>
      <Text style={styles.timer}>{timerText}</Text>
      <TouchableOpacity onPress={props.paused ? resumeTimer : pauseTimer}>
        <Icon
          name='play-pause'
          color='green'
          style={[styles.pause, { display: props.started ? 'flex' : 'none' }]}
        ></Icon>
      </TouchableOpacity>
      <Pressable
        style={[styles.stop, { display: props.started ? 'flex' : 'none' }]}
        onPress={stopTimer}
      ></Pressable>
    </View>
  )
}

export default Timer
