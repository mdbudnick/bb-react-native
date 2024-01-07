import React, { useState, type FC, type PropsWithChildren } from 'react'
import ActionText from './ActionText'
import Circle from './Circle'
import ControlBar from './ControlBar'
import Config from './Config'
import Congrats from './Congratulations'
import { SharedIntervals } from '../ts/sharedIntervals'
import { type ConfigSetters, type ConfigInput } from '../ts/shared'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  breathBox: {
    position: 'relative',
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderColor: '#f6786e'
  },
  breathBoxInner: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    // backgroundImage: require('../img/buddha-gnome.jpg'),
    resizeMode: 'cover',
    justifyContent: 'center'
  }
})

const BreathBox: FC = (prop: PropsWithChildren) => {
  const [started, setStarted] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(true)
  const [inhale, setInhale] = useState<boolean>(false)
  const [holdInhale, setHoldInhale] = useState<boolean>(false)
  const [exhale, setExhale] = useState<boolean>(false)
  const [holdExhale, setHoldExhale] = useState<boolean>(false)
  const [timeReached, setTimeReached] = useState<boolean>(false)
  // Config Variables
  const [breathDuration, setBreathDuration] = useState<number>(3)
  const [holdDuration, setHoldDuration] = useState<number>(3)
  const [inputMinutes, setInputMinutes] = useState<number>(10)
  const [inputSeconds, setInputSeconds] = useState<number>(0)
  const [ascending, setCountDirection] = useState<boolean>(true)
  const [validTimeInput, setValidTimeInput] = useState<boolean>(true)
  const [validBreathHoldInput, setValidBreathHoldInput] =
    useState<boolean>(true)
  const [validHoldInput, setValidHoldInput] = useState<boolean>(true)
  const configInput: ConfigInput = {
    breathDuration,
    holdDuration,
    inputMinutes,
    inputSeconds,
    ascending,
    validTimeInput,
    validBreathHoldInput,
    validHoldInput
  }
  const configSetters: ConfigSetters = {
    setBreathDuration,
    setHoldDuration,
    setInputMinutes,
    setInputSeconds,
    setCountDirection
  }

  function animateBreathing (): void {
    // Inhale (up)
    setInhale(!inhale)

    // Hold In (right)
    SharedIntervals.setHoldInAnimation(
      setTimeout(() => {
        setHoldInhale(!holdInhale)
        // Exhale (down)
        SharedIntervals.setExhaleAnimation(
          setTimeout(() => {
            setExhale(!exhale)
            // Hold out (left)
            SharedIntervals.setHoldOutAnimation(
              setTimeout(() => {
                setHoldExhale(!holdExhale)
                SharedIntervals.setInhaleAnimation(
                  setTimeout(() => {
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

  function validInputs (): boolean {
    let valid = true
    if (inputMinutes === 0 && inputSeconds === 0) {
      setValidTimeInput(false)
      valid = false
    } else {
      setValidTimeInput(true)
    }

    if (breathDuration === 0) {
      setValidBreathHoldInput(false)
      valid = false
    } else {
      setValidBreathHoldInput(true)
    }

    if (holdDuration === 0) {
      setValidHoldInput(false)
      valid = false
    } else {
      setValidHoldInput(true)
    }

    return valid
  }

  function startBreathBox (): void {
    if (!validInputs() || (started && !paused)) {
      return
    }
    setStarted(true)
    setPaused(false)
    animateBreathing()
  }

  function stopBreathBox (): void {
    SharedIntervals.resetAnimations()
    setStarted(false)
    setPaused(false)
    setReset(!reset)
  }

  function pauseBreathBox (): void {
    SharedIntervals.resetAnimations()
    setPaused(true)
    setReset(!reset)
  }

  const ControlBarComponent = (
    <ControlBar
      key="ControlBar"
      started={started}
      setStarted={setStarted}
      paused={paused}
      timeReached={timeReached}
      setTimeReached={setTimeReached}
      startFn={startBreathBox}
      stopFn={stopBreathBox}
      pauseFn={pauseBreathBox}
      configInput={configInput}
    />
  )
  const ConfigComponent = (
    <Config
      key="Config"
      started={started}
      configInput={configInput}
      configSetters={configSetters}
    />
  )

  return (
    <View style={styles.breathBox}>
      {timeReached
        ? (
        <Congrats
          timeReached={timeReached}
          setTimeReached={setTimeReached}
          inputMinutes={inputMinutes}
          inputSeconds={inputSeconds}
        />
          )
        : (
            []
          )}
      <View style={styles.breathBoxInner}>
        {started ? ControlBarComponent : [ControlBarComponent, ConfigComponent]}
        <ActionText
          started={started}
          paused={paused}
          inhale={inhale}
          holdInhale={holdInhale}
          exhale={exhale}
          holdExhale={holdExhale}
          breathDuration={breathDuration}
          holdDuration={holdDuration}
        ></ActionText>
      </View>
      <Circle
        boundingHeight={500}
        boundingWidth={500}
        reset={reset}
        inhale={inhale}
        holdInhale={holdInhale}
        exhale={exhale}
        holdExhale={holdExhale}
        breathDuration={breathDuration}
        holdDuration={holdDuration}
      ></Circle>
    </View>
  )
}

export default BreathBox
