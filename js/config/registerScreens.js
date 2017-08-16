import { Navigation } from 'react-native-navigation';

import Subscribe from '~screens/Subscribe';
import Home from '~screens/Home';

export default function registerScreens() {
  Navigation.registerComponent('Subscribe', () => Subscribe);
  Navigation.registerComponent('Home', () => Home);
}