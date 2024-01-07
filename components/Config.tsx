import React, { type FC } from 'react'
import { type ConfigInput, type ConfigSetters } from 'shared'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import commonStyles from '../styles/stylesheet'

interface ControlBarProps {
  started: boolean
  configInput: ConfigInput
  configSetters: ConfigSetters
}

const styles = StyleSheet.create({
  config: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: '5%',
    color: 'white',
    height: '12%'
  },
  pointDown: {
    transform: [{ rotate: '90deg' }]
  },
  pointUp: {
    transform: [{ rotate: '-90deg' }]
  }
})

const Config: FC<ControlBarProps> = (props) => {
  const enforceBreathAndHoldTimeRange = (value: string): number => {
    const numericValue = Number(value)

    // Enforce minimum and maximum values
    const minValue = 3
    const maxValue = 15

    return Math.min(Math.max(minValue, numericValue), maxValue)
  }

  const roundAndSetInputSeconds = (value: string): number => {
    const numericValue = Number(value)

    // Enforce minimum and maximum values and step
    const minValue = 0
    const maxValue = 45
    const stepValue = 15

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(minValue, numericValue), maxValue)
      const roundedValue = Math.round(clampedValue / stepValue) * stepValue

      props.configSetters.setInputSeconds(roundedValue)
      return roundedValue
    } else {
      props.configSetters.setInputSeconds(minValue)
      return minValue
    }
  }

  const roundAndSetInputMinutes = (value: string): number => {
    const numericValue = Number(value)

    // Enforce minimum and maximum values
    const minValue = 1
    const maxValue = 60

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(minValue, numericValue), maxValue)

      props.configSetters.setInputSeconds(clampedValue)
      return clampedValue
    } else {
      // 10 minute default
      props.configSetters.setInputSeconds(10)
      return 10
    }
  }

  return (
    <View
      style={
        props.started ? styles.config : [styles.config, commonStyles.hidden]
      }
    >
      <View>
        <Text>Breathe (seconds)</Text>
        <TextInput
          style={
            props.configInput.validBreathHoldInput ? [] : [commonStyles.red]
          }
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => {
            props.configSetters.setBreathDuration(
              enforceBreathAndHoldTimeRange(value)
            )
          }}
          value={props.configInput.breathDuration.toString()}
        />
      </View>
      <View>
        <Text>Hold (seconds)</Text>
        <TextInput
          style={props.configInput.validHoldInput ? [] : [commonStyles.red]}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => {
            props.configSetters.setHoldDuration(
              enforceBreathAndHoldTimeRange(value)
            )
          }}
          value={props.configInput.holdDuration.toString()}
        />
      </View>
      <View>
        <Text>Countdown Seconds</Text>
        <TextInput
          style={props.configInput.validTimeInput ? [] : [commonStyles.red]}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => roundAndSetInputSeconds(value)}
          value={props.configInput.inputSeconds.toString()}
        />
        <Text>Time (mm:ss)</Text>
        <TextInput
          style={props.configInput.validTimeInput ? [] : [commonStyles.red]}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => roundAndSetInputMinutes(value)}
          value={props.configInput.inputMinutes.toString()}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          props.configSetters.setCountDirection(!props.configInput.ascending)
        }}
      >
        <Text>Count Direction</Text>
        <Text
          style={
            props.configInput.ascending ? styles.pointUp : styles.pointDown
          }
        >
          &#10148;
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Config
