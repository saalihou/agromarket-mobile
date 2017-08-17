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
import Card from '~components/Card';
import authValidator from './validations/auth';
import codeValidator from './validations/code';
import persoInfosValidator from './validations/persoInfos';
import addressValidator from './validations/address';

import screen from '~hoc/screen';

@observer
class SubscribeScreen extends Component {
  state = {
    activePage: 0
  };

  componentWillMount() {
    this.props.navigator.setTitle({
      title: 'Inscription'
    });
  }

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
      if (!this.validate({ code }, codeValidator)) return;
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

  onPageSelected({ position }) {
    this.setState({ activePage: position });
  }

  render() {
    const { activePage } = this.state;
    return (
      <View
        style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 50,
          paddingBottom: 50
        }}
      >
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

export default screen(SubscribeScreen, { buffer: true });
