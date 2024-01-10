import React, { type FC, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SharedIntervals } from '../ts/sharedIntervals'

const INHALE_COLOR = '#4db79e'
const EXHALE_COLOR = '#c08845'

const INHALE_SIZE = 60
const EXHALE_SIZE = 25
const DEFAULT_ACTION_FONT_SIZE = 40

const styles = StyleSheet.create({
  action: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: DEFAULT_ACTION_FONT_SIZE,
    color: INHALE_COLOR,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.5
  }
})

interface ActionTextProps {
  text: string
  started: boolean
  paused: boolean
  inhale: boolean
  holdInhale: boolean
  exhale: boolean
  holdExhale: boolean
  breathDuration: number
  holdDuration: number
  ascending: boolean
}

const ActionText: FC<ActionTextProps> = (props) => {
  const firstMount = useRef(true)
  const [textStyle, setTextStyle] = useState(styles.action)
  const [displayText, setDisplayText] = useState<string>(props.text)

  const startCountdown = (
    time: number
  ): ReturnType<typeof setInterval> => {
    setDisplayText(props.text)
    let countdownInterval: ReturnType<typeof setInterval> | null
    let target = props.ascending ? time : 0
    time = props.ascending ? 1 : time
    countdownInterval = setInterval(() => {
      time += props.ascending ? 1 : -1
      if (time !== (props.ascending ? target : 1)) {
        setDisplayText(props.text + '\r\n' + time)
      } else {
        // We don't display 0
        setDisplayText(props.text + '\r\n' + time)
        // It cancels itself
        clearInterval(countdownInterval!)
        countdownInterval = null
      }
    }, 1000)
    // Do it the first time
    setDisplayText(props.text + '\r\n' + time)

    return countdownInterval
  }

  useEffect(() => {
    if (!firstMount.current && !props.started) {
      setDisplayText(props.text)
    }
  }, [props.started])

  useEffect(() => {
    if (!firstMount.current && props.started && props.paused) {
      setDisplayText(props.text)
    }
  }, [props.paused])

  useEffect(() => {
    if (!firstMount.current && props.inhale) {
      // Inhale (up)
      SharedIntervals.setInhaleCountdownInterval(
        startCountdown(props.breathDuration)
      )
      setTextStyle({ ...textStyle, color: INHALE_COLOR })
    }
  }, [props.inhale])

  useEffect(() => {
    if (!firstMount.current && props.holdInhale) {
      SharedIntervals.setHoldInCountdownInterval(
        startCountdown(props.holdDuration)
      )
      setTextStyle({ ...textStyle, color: INHALE_COLOR })
    }
  }, [props.holdInhale])

  useEffect(() => {
    if (!firstMount.current && props.exhale) {
      SharedIntervals.setExhaleCountdownInterval(
        startCountdown(props.breathDuration)
      )
      setTextStyle({ ...textStyle, color: EXHALE_COLOR })
    }
  }, [props.exhale])

  useEffect(() => {
    if (!firstMount.current && props.holdExhale) {
      SharedIntervals.setHoldOutCountdownInterval(
        startCountdown(props.holdDuration)
      )
      setTextStyle({ ...textStyle, color: EXHALE_COLOR })
    }
  }, [props.holdExhale])

  useEffect(() => {
    if (firstMount.current) firstMount.current = false
  }, [])

  return <Text style={[styles.action, textStyle]}>{displayText}</Text>
}

export default ActionText
