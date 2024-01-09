import React, { type FC, useEffect, useRef } from 'react'
import Animated, { Easing, useSharedValue, withTiming, type WithTimingConfig } from 'react-native-reanimated'

const LARGE_CIRCLE_SIZE = 60
const HALF_LARGE_CIRCLE = LARGE_CIRCLE_SIZE / 2
const SMALL_CIRCLE_SIZE = 20
const HALF_SMALL_CIRCLE = SMALL_CIRCLE_SIZE / 2
const BREATH_CURVE = Easing.bezier(0.13, 0.38, 0.48, 1.02)

interface CircleProps {
  reset: boolean
  inhale: boolean
  holdInhale: boolean
  exhale: boolean
  holdExhale: boolean
  breathDuration: number
  holdDuration: number
  boundingHeight: number
  boundingWidth: number
}

const Circle: FC<CircleProps> = (props) => {
  const firstMount = useRef(true)

  let circleSize = useSharedValue(SMALL_CIRCLE_SIZE)
  let circleBottom = useSharedValue(20)
  let circleLeft = useSharedValue(20)

  const generateAnimationConfig = (duration: number): WithTimingConfig => {
    // Seconds passed in, ms wanted
    duration *= 1000
    return {duration, easing: BREATH_CURVE}
  }

  const inhaleAnimation = () => {
    const config = generateAnimationConfig(props.breathDuration)
    circleLeft.value = withTiming(0  - HALF_LARGE_CIRCLE, config)
    circleBottom.value = withTiming(props.boundingHeight  - HALF_LARGE_CIRCLE, config)
    circleSize.value = withTiming(LARGE_CIRCLE_SIZE, config)
  }

  const holdInhaleAnimation = () => {
    const config = generateAnimationConfig(props.holdDuration)
    circleLeft.value = withTiming(props.boundingWidth - HALF_LARGE_CIRCLE, config)
    circleBottom.value = withTiming(props.boundingHeight  - HALF_LARGE_CIRCLE, config)
    circleSize.value = withTiming(LARGE_CIRCLE_SIZE, config)
  }

  const exhaleAnimation = () => {
    const config = generateAnimationConfig(props.breathDuration)
    circleLeft.value = withTiming(props.boundingWidth - HALF_SMALL_CIRCLE, config)
    circleBottom.value = withTiming(0 - HALF_SMALL_CIRCLE, config)
    circleSize.value = withTiming(SMALL_CIRCLE_SIZE, config)
  }

  const holdExhaleAnimation = () => {
    const config = generateAnimationConfig(props.holdDuration)
    circleLeft.value = withTiming(0 - HALF_SMALL_CIRCLE, config)
    circleBottom.value = withTiming(0 - HALF_SMALL_CIRCLE, config)
    circleSize.value = withTiming(SMALL_CIRCLE_SIZE, config)
  }

  useEffect(() => {
    if (props.reset) {
      circleLeft.value = withTiming(0 - HALF_SMALL_CIRCLE)
      circleBottom.value = withTiming(0 - HALF_SMALL_CIRCLE)
      circleSize.value = withTiming(SMALL_CIRCLE_SIZE)
    }
  }, [props.reset])

  useEffect(() => {
    if (!firstMount.current && props.inhale) {
      inhaleAnimation()
    }
  }, [props.inhale])

  useEffect(() => {
    if (!firstMount.current && props.holdInhale) {
      holdInhaleAnimation()
    }
  }, [props.holdInhale])

  useEffect(() => {
    if (!firstMount.current && props.exhale) {
      exhaleAnimation()
    }
  }, [props.exhale])

  useEffect(() => {
    if (!firstMount.current && props.holdExhale) {
      holdExhaleAnimation()
    }
  }, [props.holdExhale])

  useEffect(() => {
    if (firstMount.current) firstMount.current = false
  }, [])

  return <Animated.View style={{
    position: 'absolute',
    width: circleSize,
    height: circleSize,
    backgroundColor: 'rgb(245, 221, 112)',
    borderRadius: 50,
    bottom: circleBottom,
    left: circleLeft
    }}
  />
}

export default Circle
