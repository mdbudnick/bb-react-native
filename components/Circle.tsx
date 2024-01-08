import React, { type FC, useEffect } from 'react'
import { Easing } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'

const LARGE_CIRCLE_SIZE = 60
const SMALL_CIRCLE_SIZE = 20

const SMOOTH_PATH_TIMING = 1000
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
  let circleSize = useSharedValue(SMALL_CIRCLE_SIZE)
  let circleBottom = useSharedValue(20)
  let circleLeft = useSharedValue(20)

  const inhaleAnimation = () => {
    console.log("inhaleAnimation")
    circleLeft.value = withTiming(20)
    circleBottom.value = withTiming(200)
    circleSize.value = withTiming(LARGE_CIRCLE_SIZE)
  }

  const holdInhaleAnimation = () => {
    console.log("holdInhaleAnimation")
    circleLeft.value = withTiming(200)
    circleBottom.value = withTiming(200)
    circleSize.value = withTiming(LARGE_CIRCLE_SIZE)
  }

  const exhaleAnimation = () => {
    console.log("exhaleAnimation")
    circleLeft.value = withTiming(200)
    circleBottom.value = withTiming(20)
    circleSize.value = withTiming(SMALL_CIRCLE_SIZE)
  }

  const holdExhaleAnimation = () => {
    console.log("holdExhaleAnimation")
    circleLeft.value = withTiming(20)
    circleBottom.value = withTiming(20)
    circleSize.value = withTiming(SMALL_CIRCLE_SIZE)
  }

  useEffect(() => {
    console.log("reset")
    holdExhaleAnimation()
  }, [props.reset])

  useEffect(() => {
    console.log("inhale")
    inhaleAnimation()
  }, [props.inhale])

  useEffect(() => {
    console.log("holdInhale")
    holdInhaleAnimation()
  }, [props.holdInhale])

  useEffect(() => {
    console.log("exhale")
    exhaleAnimation()
  }, [props.exhale])

  useEffect(() => {
    console.log("holdExhale")
    holdExhaleAnimation()
  }, [props.holdExhale])

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
