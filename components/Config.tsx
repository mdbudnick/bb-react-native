import React, { type FC, useState } from 'react'
import { type ConfigInput, type ConfigSetters } from '../ts/shared'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import commonStyles from '../ts/stylesheet'

interface ControlBarProps {
  configInput: ConfigInput
  configSetters: ConfigSetters
}

const styles = StyleSheet.create({
  config: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    color: 'white',
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 20,
    borderBottomWidth: 2,
    textAlign: 'center'
  },
  configLine: {
    flexDirection: 'row',
    marginBottom: 20
  },
  configLabel: {
    fontSize: 15,
    fontWeight: '500'
  },
  input: {
    paddingHorizontal: 5,
    position: 'absolute',
    left: '80%'
  },
  grayOutline: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  redOutline: {
    borderColor: 'red',
    borderWidth: 1
  }
})

const Config: FC<ControlBarProps> = (props) => {
  const [validBreathHoldInput, setValidBreathHoldInput] = useState<boolean>(true)
  const [validHoldInput, setValidHoldInput] = useState<boolean>(true)
  const [validTimeInput, setValidTimeInput] = useState<boolean>(true)

  let breathDuration = props.configInput.breathDuration?.toString()
  let holdDuration = props.configInput.holdDuration?.toString()
  let inputMinutes = props.configInput.inputMinutes?.toString()
  let inputSeconds = props.configInput.inputSeconds?.toString()

  const validateAndSaveConfig = (): void => {
    let breathNumber = -1
    let holdNumber = -1
    let minutesNumber = -1
    let secondsNumber = -1
    // Check that all inputs are numbers
    // We need to set to store on re-render
    // Trust the validation will not allow bad values out
    try {
      breathNumber = Number(breathDuration)
      props.configSetters.setBreathDuration(breathNumber)
    } catch {
      setValidBreathHoldInput(false)
    }
    try {
      holdNumber = Number(holdDuration)
      props.configSetters.setHoldDuration(holdNumber)
    } catch {
      setValidHoldInput(false)
    }
    try {
      minutesNumber = Number(inputMinutes)
      props.configSetters.setInputMinutes(minutesNumber)
      secondsNumber = Number(inputSeconds)
      props.configSetters.setInputSeconds(secondsNumber)
    } catch {
      setValidTimeInput(false)
    }

    if ([validateBreathTime(breathNumber),
        validateHoldTime(holdNumber), 
        validateInputCountdown(minutesNumber, secondsNumber)].every(Boolean)) {
      props.configSetters.setConfigOpen(false)
    }
  }

  const validateBreathTime = (value: number): boolean => {
    if (3 <= value && value <= 60) {
      setValidBreathHoldInput(true)
      return true
    } 
    setValidBreathHoldInput(false)
    return false
  }

  const validateHoldTime = (value: number): boolean => {
    if (3 <= value && value <= 60) {
      setValidHoldInput(true)
      return true
    }
    setValidHoldInput(false)
    return false
  }

  const validateInputCountdown = (minutes: number, seconds: number): boolean => {
    if ((minutes === 0 && seconds === 0) ||
    minutes < 0 || seconds < 0 || seconds >= 60 || minutes > 99) {
      setValidTimeInput(false)
      return false
    }
    setValidTimeInput(true)
    return true
  }

  return (
    <View style={styles.config}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.configLine}>
        <Text style={styles.configLabel}>Breath (seconds){'\t'}</Text>
        <TextInput
          style={
            [styles.input, validBreathHoldInput ? [styles.grayOutline] : [styles.redOutline]]
          }
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => { breathDuration = value }}
          placeholder={props.configInput.breathDuration?.toString()}
        />
      </View>
      <View style={styles.configLine}>
        <Text style={styles.configLabel}>Hold (seconds)</Text>
        <TextInput
          style={
            [styles.input, validHoldInput ? [styles.grayOutline] : [styles.redOutline]]
          }
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => { holdDuration = value }}
          placeholder={props.configInput.holdDuration?.toString()}
        />
      </View>
      <View style={styles.configLine}>
        <Text style={styles.configLabel}>Minutes</Text>
        <TextInput
          style={
            [styles.input, validTimeInput ? [styles.grayOutline] : [styles.redOutline]]
          }
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => { inputMinutes = value }}
          placeholder={props.configInput.inputMinutes?.toString()}
        />
      </View>
      <View style={styles.configLine}>
        <Text style={styles.configLabel}>Seconds</Text>
        <TextInput
          style={
            [styles.input, validTimeInput ? [styles.grayOutline] : [styles.redOutline]]
          }
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => { inputSeconds = value }}
          placeholder={props.configInput.inputSeconds?.toString()}
        />
        </View>
      <TouchableOpacity
        onPress={() => {
          props.configSetters.setCountDirection(!props.configInput.ascending)
        }}
      >
        {/* <View style={styles.configLine}>
          <Text style={styles.configLabel}>Counting: 
          <Text
            style={{ fontWeight: '800' }}
          >
          {'\t'}{'\t'}{props.configInput.ascending ? 'UP' : 'DOWN'}
          </Text>
          </Text>
        </View> */}
      </TouchableOpacity>
      <Pressable style={[commonStyles.bigGreenButton, { alignSelf: 'center' }]} onPress={validateAndSaveConfig}>
            <Text>Save Settings</Text>
      </Pressable>  
    </View>
  )
}

export default Config
