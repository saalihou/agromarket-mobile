import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { autorun } from 'mobx';
import { observer } from 'mobx-react';

import ProductList from '../../../../components/ProductList';

import publicationStore from '../../../../stores/publication';

@observer
class AllPublicationsScreen extends Component {
  state = {
    publications: []
  };

  async componentWillMount() {
    publicationStore.getNextPublications();
    autorun(() => {
      const transform = p => ({
        ...p,
        image: p.pictures ? { uri: p.pictures[0] } : undefined
      });

      this.setState({
        publications: publicationStore.publications.map(transform)
      });
    });
  }

  onProductOpen(product) {
    this.props.navigate({
      screen: 'ProductDetail',
      title: product.label,
      passProps: { product, sharedElementPrefix: `allPublications.` },
      sharedElements: [`allPublications.productImage${product.id}`]
    });
  }

  render() {
    return (
      <ProductList
        data={this.state.publications}
        loading={publicationStore.fetching}
        onOpen={this.onProductOpen.bind(this)}
        onEndReachedThreshold={4}
        onEndReached={() => publicationStore.getNextPublications()}
        sharedElementPrefix={'allPublications.'}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default AllPublicationsScreen;
