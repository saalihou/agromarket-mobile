import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { PagerTitleIndicator, IndicatorViewPager } from 'rn-viewpager';
import ProductList from '~screens/Home/components/ProductList.js';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { autorun } from 'mobx';
import { observer } from 'mobx-react';

import colors from '~theme/colors';

import screen from '~hoc/screen';

import publicationStore from '~stores/publication';
import authStore from '~stores/auth';

import InfoSign from '~components/InfoSign';

import AllPublications from './screens/AllPublications';
import MyPublications from './screens/MyPublications';

@observer
class HomeScreen extends Component {
  state = {
    visible: true,
    myPublications: []
  };

  displayFab(icon, id) {
    MaterialIcon.getImageSource(icon, 30, 'white').then(source => {
      this.props.navigator.setButtons({
        fab: {
          collapsedId: id,
          collapsedIcon: source,
          backgroundColor: colors.ACCENT
        }
      });
    });
  }

  removeFab() {
    this.props.navigator.setButtons({
      fab: {}
    });
  }

  async componentWillMount() {
    authStore.restoreSession();

    const { navigator } = this.props;
    navigator.setTitle({
      title: 'AgroMarket'
    });

    navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.displayFab('shopping-cart', 'cart');

    const loginButtonIcon = await MaterialIcon.getImageSource(
      'person-add',
      30,
      colors.PRIMARY
    );

    const logoutButtonIcon = await MaterialIcon.getImageSource(
      'exit-to-app',
      30,
      colors.PRIMARY
    );

    autorun(() => {
      if (authStore.currentUser) {
        navigator.setButtons({
          rightButtons: [
            {
              title: 'Déconnexion',
              id: 'logout',
              icon: logoutButtonIcon
            }
          ]
        });
      } else {
        navigator.setButtons({
          rightButtons: [
            {
              title: 'Connexion',
              id: 'login',
              icon: loginButtonIcon
            }
          ]
        });
      }
    });
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.id === 'willAppear') {
      this.setState({ visible: true });
    }
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'login') {
        this.navigate({
          screen: 'Login'
        });
      } else if (event.id === 'logout') {
        this.logout();
      } else if (event.id === 'add') {
        this.navigate({
          screen: 'ProductForm'
        });
      }
    }
  }

  navigate(...args) {
    this.props.navigator.push(...args);
    this.onNavigate();
  }

  onNavigate() {
    setTimeout(() => this.setState({ visible: false }), 350);
  }

  onPageSelected({ position }) {
    if (position === 0) {
      this.displayFab('shopping-cart', 'cart');
    } else if (position === 1) {
      this.displayFab('add', 'add');
    } else {
      this.removeFab();
    }
  }

  logout() {
    Alert.alert(`Déconnexion`, `Voulez-vous vraiment vous déconnecter ?`, [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Déconnexion',
        onPress() {
          authStore.logout();
        }
      }
    ]);
  }

  render() {
    const { visible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <IndicatorViewPager
          style={[styles.viewPager, { flex: visible ? 1 : 0 }]}
          indicator={this._renderTitleIndicator()}
          onPageSelected={this.onPageSelected.bind(this)}
        >
          <View style={styles.tab}>
            <AllPublications navigate={this.navigate.bind(this)} />
          </View>
          <View style={styles.tab}>
            <MyPublications navigate={this.navigate.bind(this)} />
          </View>
          <View style={styles.tab}>
            <InfoSign icon='person' message='En développement, revenez bientôt.' />
          </View>
        </IndicatorViewPager>
      </View>
    );
  }

  _renderTitleIndicator() {
    return (
      <PagerTitleIndicator
        style={styles.indicatorContainer}
        titles={[
          <MaterialIcon color="green" name="home" size={30} />,
          <MaterialIcon color="green" name="list" size={30} />,
          <MaterialIcon color="green" name="person" size={30} />
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 51,
    zIndex: 2
  },
  indicatorContainer: {
    backgroundColor: '#ecf0f1',
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    elevation: 5
  },
  tab: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default screen(HomeScreen);
