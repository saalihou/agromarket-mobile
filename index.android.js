import { Navigation } from 'react-native-navigation';

import registerScreens from '~config/registerScreens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home'
  }
});
