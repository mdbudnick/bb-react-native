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
    borderColor: 'rgb(246, 192, 110)'
  },
  breathBoxInner: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    justifyContent: 'center'
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
  // Config Variables
  const [breathDuration, setBreathDuration] = useState<number>(3)
  const [holdDuration, setHoldDuration] = useState<number>(3)
  const [inputMinutes, setInputMinutes] = useState<number>(10)
  const [inputSeconds, setInputSeconds] = useState<number>(0)
  const [ascending, setCountDirection] = useState<boolean>(true)
  const configInput: ConfigInput = {
    breathDuration,
    holdDuration,
    inputMinutes,
    inputSeconds,
    ascending
  }
  const configSetters: ConfigSetters = {
    setConfigOpen,
    setBreathDuration,
    setHoldDuration,
    setInputMinutes,
    setInputSeconds,
    setCountDirection
  }

  function animateBreathing (): void {
    // Inhale (up)
    setInhale(true)
    setHoldInhale(false)
    setExhale(false)
    setHoldExhale(false)

    // Hold In (right)
    SharedIntervals.setHoldInAnimation(
      setTimeout(() => {
        setInhale(false)
        setHoldInhale(true)
        setExhale(false)
        setHoldExhale(false)
        // Exhale (down)
        SharedIntervals.setExhaleAnimation(
          setTimeout(() => {
            setInhale(false)
            setHoldInhale(false)
            setExhale(true)
            setHoldExhale(false)
            // Hold out (left)
            SharedIntervals.setHoldExhaleAnimation(
              setTimeout(() => {
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

  function startBreathBox (): void {
    setStarted(true)
    setPaused(false)
    setReset(false)
    animateBreathing()
  }

  function stopBreathBox (): void {
    SharedIntervals.resetAnimations()
    setInhale(false)
    setHoldInhale(false)
    setExhale(false)
    setHoldExhale(false)
    setStarted(false)
    setPaused(false)
    setReset(true)
  }

  function pauseBreathBox (): void {
    SharedIntervals.resetAnimations()
    setPaused(true)
    setReset(true)
  }

  const ControlBarComponent = (
    <View>
      <ActionText
        started={started}
        paused={paused}
        inhale={inhale}
        holdInhale={holdInhale}
        exhale={exhale}
        holdExhale={holdExhale}
        breathDuration={breathDuration}
        holdDuration={holdDuration}
      />
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
        { configOpen ? ConfigComponent : ControlBarComponent }
      </View>
      <Circle
        boundingHeight={200}
        boundingWidth={200}
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
