import { type ViewStyle } from 'react-native'
export interface ActionStyle extends ViewStyle {
  transitionDuration: string
  transitionTimingFunction: string
  fontSize: string
  color: string
}

export interface ConfigInput {
  exhaleColor: string
  inhaleColor: string
  breathDuration: number
  holdDuration: number
  inputMinutes: number
  inputSeconds: number
  ascending: boolean
}

export interface ConfigSetters {
  setConfigOpen: React.Dispatch<React.SetStateAction<boolean>>
  setExhaleColor: React.Dispatch<React.SetStateAction<string>>
  setInhaleColor: React.Dispatch<React.SetStateAction<string>>
  setBreathDuration: React.Dispatch<React.SetStateAction<number>>
  setHoldDuration: React.Dispatch<React.SetStateAction<number>>
  setInputMinutes: React.Dispatch<React.SetStateAction<number>>
  setInputSeconds: React.Dispatch<React.SetStateAction<number>>
  setCountDirection: React.Dispatch<React.SetStateAction<boolean>>
}
