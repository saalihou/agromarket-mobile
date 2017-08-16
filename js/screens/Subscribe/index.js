import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  BackAndroid,
  StyleSheet
} from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { observer } from 'mobx-react';

import AuthForm from './AuthForm.js';
import PersoInfosForm from './PersoInfosForm.js';
import CheckCodeForm from './CheckCodeForm.js';
import AddressForm from './AddressForm.js';

import authStore from '~stores/auth';

import Card from '~components/Card';

@observer
export default class SubscribeScreen extends Component {
  state = {
    activePage: 0
  };

  gotoPage(page) {
    this.refs.viewPager.setPage(page);
  }

  async onAuthSubmit(authInfos) {
    try {
      if (authInfos.password !== authInfos.passwordConfirmation) {
        Alert.alert(`Erreur`, `Mot de passe différent de la confirmation`);
        return;
      }
      await authStore.subscribe(authInfos);
      this.gotoPage(1);
    } catch (e) {
      Alert.alert(`Erreur`, `Erreur lors de l'inscription. ${e.message}`);
    }
  }

  async onCheckCodeSubmit({ code }) {
    try {
      const { verified } = await authStore.verifyPhone(code);
      if (!verified) {
        Alert.alert(`Erreur`, `Code invalide`);
        return;
      }
      this.gotoPage(2);
    } catch (e) {
      Alert.alert(`Erreur`, `Erreur lors de la vérification. ${e.message}`);
    }
  }

  async onPersoInfoSubmit(personalInfos) {
    try {
      await authStore.updatePendingProfile(personalInfos);
      this.gotoPage(3);
    } catch (e) {
      Alert.alert(`Erreur`, `Erreur lors de la mise à jour. ${e.message}`);
    }
  }

  async onAddressSubmit(address) {
    try {
      await authStore.updatePendingProfile({ address });
      Alert.alert(`Félicitations`, `Bienvenue à bord!`);
    } catch (e) {
      Alert.alert(`Erreur`, `Erreur lors de la mise à jour. ${e.message}`);
    }
  }

  onPageSelected({position}) {
    this.setState({ activePage: position })
  }

  render() {
    const { activePage } = this.state;
    return (
      <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 50, paddingBottom: 50 }}>
        <Image
          source={require('~assets/images/fruits.png')}
          style={styles.backgroundImage}
        />
        <Card animation={require('~assets/animations/pink_drink_machine.json')}>
          <IndicatorViewPager
            style={styles.viewPager}
            scrollEnabled={true}
            onPageSelected={this.onPageSelected.bind(this)}
            ref="viewPager"
          >
            <View>
              <AuthForm
                onSubmit={this.onAuthSubmit.bind(this)}
                loading={authStore.loading}
                active={activePage === 0}
              />
            </View>
            <View>
              <CheckCodeForm
                onSubmit={this.onCheckCodeSubmit.bind(this)}
                loading={authStore.loading}
                active={activePage === 1}
              />
            </View>
            <View>
              <PersoInfosForm
                onSubmit={this.onPersoInfoSubmit.bind(this)}
                loading={authStore.loading}
                active={activePage === 2}
              />
            </View>
            <View>
              <AddressForm
                onSubmit={this.onAddressSubmit.bind(this)}
                loading={authStore.loading}
                active={activePage === 3}
              />
            </View>
          </IndicatorViewPager>
        </Card>
      </View>
    );
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  },
  viewPager: {
    flex: 1,
    zIndex: 2
  }
});
