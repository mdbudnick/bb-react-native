import { StyleSheet } from 'react-native'

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  hidden: {
    display: 'none',
  },
  bigGreenButton: {
    alignSelf: 'flex-start',
    fontSize: 25,
    borderWidth: 4,
    borderColor: 'green',
    backgroundColor: 'lightgreen',
    borderRadius: 25,
    padding: 20,
    paddingVertical: 10
  }
})

export default commonStyles
