import { Navigation } from 'react-native-navigation';

import Subscribe from '~screens/Subscribe';
import Home from '~screens/Home';
import ProductDetail from '~screens/ProductDetail';
import ProductForm from '~screens/Publication'
import Welcome from '~screens/Welcome';

export default function registerScreens() {
  Navigation.registerComponent('Subscribe', () => Subscribe);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('ProductDetail', () => ProductDetail);
  Navigation.registerComponent('ProductForm', () => ProductForm);
  Navigation.registerComponent('Welcome', () => Welcome);
}
