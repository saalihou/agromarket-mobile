import { Navigation } from 'react-native-navigation';

import Subscribe from '~screens/Subscribe';
import Home from '~screens/Home';
import ProductDetail from '~screens/ProductDetail';

export default function registerScreens() {
  Navigation.registerComponent('Subscribe', () => Subscribe);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('ProductDetail', () => ProductDetail);
}
