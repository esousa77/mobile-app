import { createStackNavigator } from 'react-navigation'
import ResumeScreen from '../Containers/ResumeScreen'
import MainScreen from '../Containers/MainScreen'
import WelcomeScreen from '../Containers/WelcomeScreen'
import StateSelectionScreen from '../Containers/StateSelectionScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    WelcomeScreen: { screen: WelcomeScreen },
    StateSelectionScreen: { screen: StateSelectionScreen },
    MainScreen: { screen: MainScreen },
    ResumeScreen: { screen: ResumeScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    cardStyle: { shadowColor: 'transparent' },
    initialRouteName: 'WelcomeScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default PrimaryNav
