import { type ViewStyle } from 'react-native'
export interface ActionStyle extends ViewStyle {
  transitionDuration: string
  transitionTimingFunction: string
  fontSize: string
  color: string
}

export interface ConfigInput {
  breathDuration: number
  holdDuration: number
  inputMinutes: number
  inputSeconds: number
  ascending: boolean
  validTimeInput: boolean
  validBreathHoldInput: boolean
  validHoldInput: boolean
}

export interface ConfigSetters {
  setBreathDuration: React.Dispatch<React.SetStateAction<number>>
  setHoldDuration: React.Dispatch<React.SetStateAction<number>>
  setInputMinutes: React.Dispatch<React.SetStateAction<number>>
  setInputSeconds: React.Dispatch<React.SetStateAction<number>>
  setCountDirection: React.Dispatch<React.SetStateAction<boolean>>
}
