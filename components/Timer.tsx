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
    alignSelf: 'flex-start',
    color: '#007bff',
    marginTop: '3%',
    marginLeft: 10,
    height: '4%',
    width: '4%',
    display: 'none'
  },
  stop: {
    alignSelf: 'flex-start',
    height: '3%',
    width: '3%',
    marginTop: '3.5%',
    marginLeft: 10,
    backgroundColor: 'red',
    display: 'none'
  },
  timer: {
    alignSelf: 'flex-start',
    fontSize: screenHeight * 0.05,
    color: 'white',
    padding: 10,
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
    <View>
      <Text style={styles.timer}>{timerText}</Text>
      <TouchableOpacity onPress={props.paused ? resumeTimer : pauseTimer}>
        <Image
          style={[styles.pause, { display: props.started ? 'flex' : 'none' }]}
          source={require('../img/play-pause.svg')}
        ></Image>
      </TouchableOpacity>
      <Pressable
        style={[styles.stop, { display: props.started ? 'flex' : 'none' }]}
        onPress={stopTimer}
      ></Pressable>
    </View>
  )
}

export default Timer
