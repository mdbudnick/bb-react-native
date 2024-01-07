import React, { type FC, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import { SharedIntervals } from '../ts/sharedIntervals'

const INHALE_COLOR = '#0f5362'
const EXHALE_COLOR = '#c08845'
const RESET_ORANGE = '#f6786e'

const INHALE_SIZE = 8
const EXHALE_SIZE = 4
const DEFAULT_ACTION_FONT_SIZE = 5
const DEFAULT_TEXT = 'Breath Box'
const PAUSE_TEXT = 'Paused'

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
  started: boolean
  paused: boolean
  inhale: boolean
  holdInhale: boolean
  exhale: boolean
  holdExhale: boolean
  breathDuration: number
  holdDuration: number
}

const ActionText: FC<ActionTextProps> = (props) => {
  const textSize = useRef(new Animated.Value(DEFAULT_ACTION_FONT_SIZE)).current
  const [actionText, setActionText] = useState(DEFAULT_TEXT)
  const [textStyle, setTextStyle] = useState(styles.action)

  const startCountdownDecrement = (
    text: string,
    time: number
  ): ReturnType<typeof setInterval> => {
    let countdownInterval: ReturnType<typeof setInterval> | null
    countdownInterval = setInterval(() => {
      --time
      if (time !== 0) {
        setActionText(text + '\r\n' + time)
      } else {
        setActionText(text)
        // It cancels itself
        clearInterval(countdownInterval!)
        countdownInterval = null
      }
    }, 1000)
    // Do it the first time
    setActionText(text + '\r\n' + time)

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
    if (!props.started) {
      setActionText(DEFAULT_TEXT)
      defaultSizeAnimation.start()
    }
  }, [props.started])

  useEffect(() => {
    if (props.started && props.paused) {
      setActionText(PAUSE_TEXT)
      defaultSizeAnimation.start()
    }
  }, [props.paused])

  useEffect(() => {
    // Inhale (up)
    SharedIntervals.setInhaleCountdownInterval(
      startCountdownDecrement('Inhale', props.breathDuration)
    )
    setTextStyle({ ...textStyle, color: INHALE_COLOR })
    inhaleSizeAnimation.start()
  }, [props.inhale])

  useEffect(() => {
    SharedIntervals.setHoldInCountdownInterval(
      startCountdownDecrement('Hold', props.holdDuration)
    )
    setTextStyle({ ...textStyle, color: INHALE_COLOR })
  }, [props.holdInhale])

  useEffect(() => {
    SharedIntervals.setExhaleCountdownInterval(
      startCountdownDecrement('Exhale', props.breathDuration)
    )
    setTextStyle({ ...textStyle, color: EXHALE_COLOR })
    exhaleSizeAnimation.start()
  }, [props.exhale])

  useEffect(() => {
    SharedIntervals.setHoldOutCountdownInterval(
      startCountdownDecrement('Hold', props.holdDuration)
    )
    setTextStyle({ ...textStyle, color: EXHALE_COLOR })
  }, [props.holdExhale])

  return <Text style={[styles.action, textStyle]}>{actionText}</Text>
}

export default ActionText
