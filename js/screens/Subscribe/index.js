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
import validate from 'validate.js';

import AuthForm from './AuthForm.js';
import PersoInfosForm from './PersoInfosForm.js';
import CheckCodeForm from './CheckCodeForm.js';
import AddressForm from './AddressForm.js';

import authStore from '~stores/auth';

import authValidator from './validations/auth';
import codeValidator from './validations/code';
import persoInfosValidator from './validations/persoInfos';
import addressValidator from './validations/address';

@observer
export default class SubscribeScreen extends Component {
  gotoPage(page) {
    this.refs.viewPager.setPage(page);
  }

  validate(values, validator) {
    const errors = validate(values, validator, {
      format: 'flat'
    });
    if (errors) {
      Alert.alert(`Erreur`, errors[0]);
      return false;
    }
    return true;
  }

  async onAuthSubmit(authInfos) {
    try {
      if (!this.validate(authInfos, authValidator)) return;
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
      if (!this.validate({code}, codeValidator)) return;
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
      if (!this.validate(personalInfos, persoInfosValidator)) return;
      await authStore.updatePendingProfile(personalInfos);
      this.gotoPage(3);
    } catch (e) {
      Alert.alert(`Erreur`, `Erreur lors de la mise à jour. ${e.message}`);
    }
  }

  async onAddressSubmit(address) {
    try {
      if (!this.validate(address, addressValidator)) return;
      await authStore.updatePendingProfile({ address });
      Alert.alert(`Félicitations`, `Bienvenue à bord!`);
    } catch (e) {
      Alert.alert(`Erreur`, `Erreur lors de la mise à jour. ${e.message}`);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require('~assets/images/cocktails.png')}
          style={styles.backgroundImage}
        />
        <IndicatorViewPager
          style={styles.viewPager}
          scrollEnabled={false}
          ref="viewPager"
        >
          <View>
            <AuthForm
              onSubmit={this.onAuthSubmit.bind(this)}
              loading={authStore.loading}
            />
          </View>
          <View>
            <CheckCodeForm
              onSubmit={this.onCheckCodeSubmit.bind(this)}
              loading={authStore.loading}
            />
          </View>
          <View>
            <PersoInfosForm
              onSubmit={this.onPersoInfoSubmit.bind(this)}
              loading={authStore.loading}
            />
          </View>
          <View>
            <AddressForm
              onSubmit={this.onAddressSubmit.bind(this)}
              loading={authStore.loading}
            />
          </View>
        </IndicatorViewPager>
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
