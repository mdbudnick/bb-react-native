import React, { type FC, useEffect, useRef, useState } from 'react'
import { Animated, Easing, View } from 'react-native'

const LARGE_CIRCLE_SIZE = 6
const SMALL_CIRCLE_SIZE = 2

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
  const circleSize = useRef(new Animated.Value(SMALL_CIRCLE_SIZE)).current
  const circleBottom = useRef(new Animated.Value(props.boundingHeight)).current
  const circleLeft = useRef(new Animated.Value(0)).current

  const [circleStyle, setCircleStyle] = useState({
    width: SMALL_CIRCLE_SIZE,
    height: SMALL_CIRCLE_SIZE,
    backgroundColor: 'rgb(245, 121, 112)',
    borderRadius: 50,
    transformOrigin: 'center',
    bottom: props.boundingHeight,
    left: props.boundingWidth
  })

  const toBottomLeft = Animated.parallel([
    Animated.timing(circleSize, {
      toValue: SMALL_CIRCLE_SIZE,
      duration: SMOOTH_PATH_TIMING,
      easing: BREATH_CURVE,
      useNativeDriver: false
    }),
    Animated.timing(circleBottom, {
      toValue: props.boundingHeight,
      duration: SMOOTH_PATH_TIMING,
      easing: BREATH_CURVE,
      useNativeDriver: false
    }),
    Animated.timing(circleLeft, {
      toValue: -(SMALL_CIRCLE_SIZE / 2),
      duration: SMOOTH_PATH_TIMING,
      easing: BREATH_CURVE,
      useNativeDriver: false
    })
  ])
  // TODO - real toBottomRight
  const toBottomRight = toBottomLeft
  const toTopLeft = Animated.parallel([
    Animated.timing(circleSize, {
      toValue: LARGE_CIRCLE_SIZE,
      duration: SMOOTH_PATH_TIMING,
      easing: BREATH_CURVE,
      useNativeDriver: false
    }),
    Animated.timing(circleBottom, {
      toValue: 10,
      duration: SMOOTH_PATH_TIMING,
      useNativeDriver: false
    }),
    Animated.timing(circleLeft, {
      toValue: -(SMALL_CIRCLE_SIZE / 2),
      duration: SMOOTH_PATH_TIMING,
      useNativeDriver: false
    })
  ])
  // TODO - real toTopRight
  const toTopRight = toTopLeft

  useEffect(() => {
    toTopLeft.stop()
    toBottomLeft.start()
  }, [props.reset])

  useEffect(() => {
    toTopLeft.start()
  }, [props.inhale])

  useEffect(() => {
    toTopRight.start()
  }, [props.holdInhale])

  useEffect(() => {
    toBottomRight.start()
  }, [props.exhale])

  useEffect(() => {
    toBottomLeft.start()
  }, [props.holdExhale])

  useEffect(() => {
    const diameter = parseInt(JSON.stringify(circleSize))
    setCircleStyle({
      ...circleStyle,
      width: diameter,
      height: diameter,
      bottom: parseInt(JSON.stringify(circleBottom)),
      left: parseInt(JSON.stringify(circleLeft))
    })
  }, [circleSize, circleBottom, circleLeft])

  return <View style={[{ position: 'absolute' }, circleStyle]} />
}

export default Circle
