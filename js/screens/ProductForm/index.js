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

import Card from '~components/Card';
import FormSection from '~components/FormSection';
import screen from '~hoc/screen';

import publicationStore from '~stores/publication';

import genInfosValidator from './validators/genInfos';
import typePriceValidator from './validators/typePrice';
import addressValidator from './validators/address';

@observer
class ProductFormScreen extends Component {
  state = {
    product: {}
  };

  componentDidMount() {
    publicationStore.refreshProductTypes();
  }

  gotoPage(page) {
    this.refs.viewPager.setPage(page);
  }

  onGenInfosSubmit(infos) {
    this.setState({
      product: { ...this.state.product, ...infos }
    });
    this.gotoPage(1);
  }

  onTypePriceSubmit(infos) {
    this.setState({
      product: { ...this.state.product, ...infos }
    });
    this.gotoPage(2);
  }

  onAddressSubmit(infos) {
    this.setState(
      {
        product: {
          ...this.state.product,
          zone: infos
        }
      },
      async () => {
        const publication = await publicationStore.publish(this.state.product);
        alert(publication.id);
      }
    );
  }

  async componentWillMount() {
    const { navigator } = this.props;
    navigator.setTitle({
      title: 'Publier un produit'
    });
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
        <Card>
          <IndicatorViewPager
            style={styles.viewPager}
            scrollEnabled={false}
            ref="viewPager"
          >
            <View>
              <FormSection
                inputs={[
                  {
                    key: 'label',
                    placeholder: 'Titre',
                    icon: 'mode-edit'
                  },
                  {
                    key: 'description',
                    multiline: true,
                    numberOfLines: 5,
                    placeholder: 'Description',
                    icon: 'description'
                  }
                ]}
                validator={genInfosValidator}
                onSubmit={this.onGenInfosSubmit.bind(this)}
              />
            </View>
            <View>
              <FormSection
                inputs={[
                  {
                    key: 'productTypeId',
                    type: 'picker',
                    icon: 'palette',
                    prompt: 'Type de produit',
                    items: publicationStore.productTypes.map(t => ({
                      value: t.id,
                      label: t.label
                    }))
                  },
                  {
                    key: 'unitPrice',
                    icon: 'monetization-on',
                    placeholder: 'Prix',
                    keyboardType: 'numeric'
                  },
                  {
                    key: 'stock',
                    icon: 'unarchive',
                    placeholder: 'Stock',
                    keyboardType: 'numeric'
                  }
                ]}
                validator={typePriceValidator}
                onSubmit={this.onTypePriceSubmit.bind(this)}
              />
            </View>
            <View>
              <FormSection
                inputs={[
                  {
                    key: 'region',
                    placeholder: 'Région',
                    icon: 'place'
                  },
                  {
                    key: 'department',
                    placeholder: 'Département',
                    icon: 'near-me'
                  }
                ]}
                validator={addressValidator}
                onSubmit={this.onAddressSubmit.bind(this)}
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
    flex: 0.8,
    zIndex: 2
  }
});

export default screen(ProductFormScreen, { buffer: true });
