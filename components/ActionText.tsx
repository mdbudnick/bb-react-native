import React, { type FC, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import { SharedIntervals } from '../ts/sharedIntervals'

const INHALE_COLOR = '#0f5362'
const EXHALE_COLOR = '#c08845'
const RESET_ORANGE = '#f6786e'

const INHALE_SIZE = 50
const EXHALE_SIZE = 25
const DEFAULT_ACTION_FONT_SIZE = 30

const styles = StyleSheet.create({
  action: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: DEFAULT_ACTION_FONT_SIZE,
    color: RESET_ORANGE,
    borderRadius: 3,
    opacity: 0.9,
    padding: '1%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
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
  const textSize = useRef(new Animated.Value(DEFAULT_ACTION_FONT_SIZE)).current
  const [textStyle, setTextStyle] = useState(styles.action)
  const [displayText, setDisplayText] = useState<string>(props.text)

  const startCountdownDecrement = (
    time: number
  ): ReturnType<typeof setInterval> => {
    let countdownInterval: ReturnType<typeof setInterval> | null
    countdownInterval = setInterval(() => {
      --time
      if (time !== 0) {
        console.log('countdownTime ' + time)
        setDisplayText(props.text + '\r\n' + time)
      } else {
        setDisplayText(props.text)
        // It cancels itself
        clearInterval(countdownInterval!)
        countdownInterval = null
      }
    }, 1000)
    // Do it the first time
    setDisplayText(props.text + '\r\n' + time)

    return countdownInterval
  }

  const defaultSizeAnimation = Animated.timing(textSize, {
    toValue: DEFAULT_ACTION_FONT_SIZE,
    duration: 1000,
    useNativeDriver: false
  })

  const inhaleSizeAnimation = Animated.timing(textSize, {
    toValue: INHALE_SIZE,
    duration: props.breathDuration * 1000,
    useNativeDriver: false
  })

  const exhaleSizeAnimation = Animated.timing(textSize, {
    toValue: EXHALE_SIZE,
    duration: props.breathDuration * 1000,
    useNativeDriver: false
  })

  useEffect(() => {
    if (!firstMount.current && !props.started) {
      defaultSizeAnimation.start()
      setDisplayText(props.text)
    }
  }, [props.started])

  useEffect(() => {
    if (!firstMount.current && props.started && props.paused) {
      defaultSizeAnimation.start()
      setDisplayText(props.text)
    }
  }, [props.paused])

  useEffect(() => {
    if (!firstMount.current && props.inhale) {
      // Inhale (up)
      SharedIntervals.setInhaleCountdownInterval(
        startCountdownDecrement(props.breathDuration)
      )
      setTextStyle({ ...textStyle, color: INHALE_COLOR })
      inhaleSizeAnimation.start()
    }
  }, [props.inhale])

  useEffect(() => {
    if (!firstMount.current && props.holdInhale) {
      SharedIntervals.setHoldInCountdownInterval(
        startCountdownDecrement(props.holdDuration)
      )
      setTextStyle({ ...textStyle, color: INHALE_COLOR })
    }
  }, [props.holdInhale])

  useEffect(() => {
    if (!firstMount.current && props.exhale) {
      SharedIntervals.setExhaleCountdownInterval(
        startCountdownDecrement(props.breathDuration)
      )
      setTextStyle({ ...textStyle, color: EXHALE_COLOR })
      exhaleSizeAnimation.start()
    }
  }, [props.exhale])

  useEffect(() => {
    if (!firstMount.current && props.holdExhale) {
      SharedIntervals.setHoldOutCountdownInterval(
        startCountdownDecrement(props.holdDuration)
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
