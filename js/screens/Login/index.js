import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
import { observer } from 'mobx-react';

import Card from '../../components/Card';
import FormSection from '../../components/FormSection';

import screen from '../../hoc/screen';
import colors from '../../theme/colors';

import authValidator from '../Subscribe/validations/auth';

import authStore from '../../stores/auth';

@observer
class LoginScreen extends Component {
  componentWillMount() {
    const { navigator } = this.props;
    navigator.setTitle({
      title: 'Connexion'
    });
  }

  async onLoginSubmit({ phoneNumber, password }) {
    try {
      const user = await authStore.login({ phoneNumber, password });
      this.props.navigator.pop();
    } catch (e) {
      if (e.code === 'LOGIN_FAILED') {
        Alert.alert(
          `Erreur`,
          `Le nom d'utilisateur ou le mot de passe est incorrect`
        );
        return;
      }
      Alert.alert(`Erreur`, `Une erreur inconnue s'est produite ${e.message}`);
    }
  }

  subscribe() {
    this.props.navigator.push({
      screen: 'Subscribe'
    });
  }

  render() {
    const handlePress = () => false;
    return (
      <Image
        source={require('~assets/images/fruits.png')}
        style={styles.backgroundImage}
      >
        <Card>
          <FormSection
            style={{ flex: 0 }}
            inputs={[
              {
                key: 'phoneNumber',
                placeholder: 'Numéro de téléphone',
                icon: 'phone',
                keyboardType: 'phone-pad',
                autoFocus: true
              },
              {
                key: 'password',
                placeholder: 'Mot de passe',
                icon: 'lock',
                secureTextEntry: true
              }
            ]}
            submitLabel="Connexion"
            validator={authValidator}
            onSubmit={this.onLoginSubmit.bind(this)}
            loading={authStore.loading}
          />
          <View style={{ marginTop: 20 }}>
            <Button
              title={"S'inscrire"}
              color={colors.ACCENT}
              onPress={this.subscribe.bind(this)}
            />
          </View>
        </Card>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%'
  }
});

export default screen(LoginScreen);
