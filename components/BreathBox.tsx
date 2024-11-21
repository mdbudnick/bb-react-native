import React, { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import ActionText from './ActionText'
import Circle from './Circle'
import ControlBar from './ControlBar'
import Config from './Config'
import Congrats from './Congratulations'
import { SharedIntervals } from '../ts/sharedIntervals'
import { type ConfigSetters, type ConfigInput } from '../ts/shared'
import { ImageBackground, StyleSheet, View } from 'react-native'

const DEFAULT_TEXT = 'Breath Box'
const PAUSE_TEXT = 'Paused'
const INHALE_COLOR = '#4db79e'
const EXHALE_COLOR = '#c08845'

const styles = StyleSheet.create({
  breathBox: {
    position: 'relative',
    height: '65%',
    width: '100%',
    borderWidth: 2,
    borderColor: 'rgb(246, 192, 110)'
  },
  breathBoxInner: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: '14%'
  }
})

const BreathBox: FC = (prop: PropsWithChildren) => {
  const [started, setStarted] = useState<boolean>(false)
  const [configOpen, setConfigOpen] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(true)
  const [inhale, setInhale] = useState<boolean>(false)
  const [holdInhale, setHoldInhale] = useState<boolean>(false)
  const [exhale, setExhale] = useState<boolean>(false)
  const [holdExhale, setHoldExhale] = useState<boolean>(false)
  const [timeReached, setTimeReached] = useState<boolean>(false)
  const [actionText, setActionText] = useState<string>(DEFAULT_TEXT)
  // Config Variables
  const [inhaleColor, setInhaleColor] = useState<string>(INHALE_COLOR)
  const [exhaleColor, setExhaleColor] = useState<string>(EXHALE_COLOR)
  const [breathDuration, setBreathDuration] = useState<number>(3)
  const [holdDuration, setHoldDuration] = useState<number>(3)
  const [inputMinutes, setInputMinutes] = useState<number>(10)
  const [inputSeconds, setInputSeconds] = useState<number>(0)
  const [ascending, setCountDirection] = useState<boolean>(true)
  const [boundingHeight, setBoundingHeight] = useState<number>(null)
  const [boundingWidth, setBoundingWidth] = useState<number>(null)

  const configInput: ConfigInput = {
    breathDuration,
    holdDuration,
    inputMinutes,
    inputSeconds,
    inhaleColor,
    exhaleColor,
    ascending
  }
  const configSetters: ConfigSetters = {
    setConfigOpen,
    setBreathDuration,
    setHoldDuration,
    setInputMinutes,
    setInputSeconds,
    setCountDirection,
    setInhaleColor,
    setExhaleColor
  }

  function animateBreathing (): void {
    // Inhale (up)
    setActionText("Inhale")
    setInhale(true)
    setHoldInhale(false)
    setExhale(false)
    setHoldExhale(false)

    // Hold In (right)
    SharedIntervals.setHoldInAnimation(
      setTimeout(() => {
        setActionText("Hold")
        setInhale(false)
        setHoldInhale(true)
        setExhale(false)
        setHoldExhale(false)
        // Exhale (down)
        SharedIntervals.setExhaleAnimation(
          setTimeout(() => {
            setActionText("Exhale")
            setInhale(false)
            setHoldInhale(false)
            setExhale(true)
            setHoldExhale(false)
            // Hold out (left)
            SharedIntervals.setHoldExhaleAnimation(
              setTimeout(() => {
                setActionText("Hold")
                setInhale(false)
                setHoldInhale(false)
                setExhale(false)
                setHoldExhale(true)
                SharedIntervals.setInhaleAnimation(
                  setTimeout(() => {
                    setInhale(false)
                    setHoldInhale(false)
                    setExhale(false)
                    setHoldExhale(false)
                    animateBreathing() // Restart the cycle
                  }, holdDuration * 1000)
                )
              }, breathDuration * 1000)
            )
          }, holdDuration * 1000)
        )
      }, breathDuration * 1000)
    )
  }

  function stopAnimations (): void {
    setInhale(false)
    setHoldInhale(false)
    setExhale(false)
    setHoldExhale(false)
    SharedIntervals.resetAnimations()
  }

  function startBreathBox (): void {
    setStarted(true)
    setPaused(false)
    setReset(false)
    setTimeReached(false)
    animateBreathing()
  }

  function stopBreathBox (): void {
    stopAnimations()
    setStarted(false)
    setPaused(false)
    setReset(true)
    setActionText(DEFAULT_TEXT)
  }

  function pauseBreathBox (): void {
    stopAnimations()
    setPaused(true)
    setReset(true)
    setActionText(PAUSE_TEXT)
  }

  function onAppLayout (event): void {
    const { width, height } = event.nativeEvent.layout;
    setBoundingHeight(height)
    setBoundingWidth(width)
  }

  useEffect(() => {
    if (timeReached) {
      stopBreathBox()
    }
  }, [timeReached])

  const ActionTextComponent = (
    <ActionText
      key="ActionText"
      text={actionText}
      started={started}
      paused={paused}
      inhale={inhale}
      holdInhale={holdInhale}
      exhale={exhale}
      holdExhale={holdExhale}
      breathDuration={breathDuration}
      holdDuration={holdDuration}
      ascending={ascending}
    />
  )

  const ControlBarComponent = (
    <View key="ControlBar" style={{paddingTop: '50%'}}>
      <ControlBar
        started={started}
        setStarted={setStarted}
        paused={paused}
        timeReached={timeReached}
        setTimeReached={setTimeReached}
        startFn={startBreathBox}
        stopFn={stopBreathBox}
        pauseFn={pauseBreathBox}
        configInput={configInput}
        setConfigOpen={setConfigOpen}
      />
    </View>
  )

  const ConfigComponent = (
    <Config
      key="Config"
      configInput={configInput}
      configSetters={configSetters}
    />
  )

  return (
      <View style={styles.breathBox} onLayout={onAppLayout}>
        <ImageBackground source={require('../assets/img/buddha-gnome.jpg')}>
        <View style={styles.breathBoxInner}>
        {timeReached
          ? (
          <Congrats
            key="Congrats"
            timeReached={timeReached}
            setTimeReached={setTimeReached}
            inputMinutes={inputMinutes}
            inputSeconds={inputSeconds}
          />
            )
          : configOpen ? ConfigComponent : [ActionTextComponent, ControlBarComponent]
        }
        </View>
        <Circle
          key="Circle"
          boundingHeight={boundingHeight}
          boundingWidth={boundingWidth}
          reset={reset}
          inhale={inhale}
          holdInhale={holdInhale}
          exhale={exhale}
          holdExhale={holdExhale}
          breathDuration={breathDuration}
          holdDuration={holdDuration}
        ></Circle>
      </ImageBackground>
      </View>
  )
}

export default BreathBox
