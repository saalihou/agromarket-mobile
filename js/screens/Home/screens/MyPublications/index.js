// @flow
import React, { Component } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';

import InfoSign from '../../../../components/InfoSign';
import ProductList from '../../../../components/ProductList';

import { autorun } from 'mobx';
import { observer } from 'mobx-react';

import publicationStore from '../../../../stores/publication';
import authStore from '../../../../stores/auth';

import confirm from '../../../../utils/confirm';

@observer
class AllPublicationsScreen extends Component {
  state = {
    publications: []
  };

  async componentWillMount() {
    autorun(() => {
      if (authStore.currentUser) {
        publicationStore.getMyPublications();
      } else {
        publicationStore.clearMyPublications();
      }
    });
    autorun(() => {
      const transform = p => ({
        ...p,
        image: p.pictures ? { uri: p.pictures[0] } : undefined,
        isMine: true
      });

      this.setState({
        publications: publicationStore.myPublications.map(transform)
      });
    });
  }

  goToLogin() {
    this.props.navigate({
      screen: 'Login'
    });
  }

  onProductOpen(product) {
    this.props.navigate({
      screen: 'ProductDetail',
      title: product.label,
      passProps: { product, sharedElementPrefix: `myPublications.` },
      sharedElements: [`myPublications.productImage${product.id}`]
    });
  }

  async onProductRemove(product) {
    try {
      await confirm(
        `Confirmer`,
        `Supprimer la publication "${product.label}" ?`,
        {
          okLabel: 'Oui, supprimer'
        }
      );
      await publicationStore.remove(product.id);
      ToastAndroid.show(`Supprimé`, ToastAndroid.SHORT);
    } catch (e) {}
  }

  render() {
    if (!authStore.currentUser) {
      return (
        <InfoSign
          message="Connectez-vous pour voir vos publications"
          icon="person-add"
          onPress={this.goToLogin.bind(this)}
        />
      );
    }
    return (
      <ProductList
        data={this.state.publications}
        loading={publicationStore.fetching}
        removingItem={publicationStore.removingItem}
        onOpen={this.onProductOpen.bind(this)}
        onRemove={this.onProductRemove.bind(this)}
        sharedElementPrefix="myPublications."
      />
    );
  }
}

const styles = StyleSheet.create({});

export default AllPublicationsScreen;
