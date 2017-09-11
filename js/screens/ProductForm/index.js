import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  Button,
  BackAndroid,
  StyleSheet,
  TouchableOpacity,
  ProgressBarAndroid,
  ScrollView,
  ToastAndroid
} from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { observer } from 'mobx-react';
import chunk from 'lodash/chunk';

import screen from '../../hoc/screen';
import colors from '../../theme/colors';

import Card from '../../components/Card';
import FormSection from '../../components/FormSection';

import publicationStore from '../../stores/publication';
import uploadStore from '../../stores/upload';
import authStore from '../../stores/auth';

import genInfosValidator from './validators/genInfos';
import typePriceValidator from './validators/typePrice';
import addressValidator from './validators/address';

@observer
class ProductFormScreen extends Component {
  state = {
    product: {
      pictures: []
    }
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
    this.setState({
      product: {
        ...this.state.product,
        zone: infos
      }
    });
    this.gotoPage(3);
  }

  async addImages() {
    try {
      const { uploadJobId } = this.state;
      const [jobId, uploadPromise] = await uploadStore.selectImagesAndUpload(
        uploadJobId
      );
      this.setState({ uploadJobId: jobId, uploading: true }, () => {
        setTimeout(() => {
          this.refs.previewsContainer.scrollToEnd({ animated: true });
        });
      });
      const pictures = await uploadPromise;
      this.setState({
        product: {
          ...this.state.product,
          pictures: [...this.state.product.pictures, ...pictures]
        },
        uploading: false
      });
    } catch (e) {
      if (e.code === 'E_PICKER_CANCELLED') {
        return;
      }
      Alert.alert(
        `Erreur`,
        `Une erreur est survenue lors de la sélection d'images. ${e.message}`
      );
      console.error(e);
    }
  }

  async publish() {
    try {
      if (publicationStore.publishing) {
        return;
      }
      if (!authStore.currentUser) {
        ToastAndroid.show(
          'Veuillez vous connecter afin de publier votre annonce.',
          ToastAndroid.LONG
        );
        this.props.navigator.push({
          screen: 'Login'
        });
        return;
      }
      await publicationStore.publish(this.state.product);
      Alert.alert(`Succès`, `Votre produit a été publié avec succès`);
      this.props.navigator.pop();
    } catch (e) {
      Alert.alert(`Erreur`, `Erreur lors de la publication. ${e.message}`);
    }
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
                    icon: 'description',
                    autoCapitalize: 'sentences'
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
            <View style={styles.addImagesSection}>
              <TouchableOpacity onPress={this.addImages.bind(this)}>
                <Text style={styles.addImagesText}>
                  <MaterialIcon name="add" size={20} color="white" />Ajouter des
                  images de votre produit
                </Text>
              </TouchableOpacity>
              {this.state.uploadJobId && (
                <ScrollView
                  ref="previewsContainer"
                  style={styles.previewsContainer}
                  horizontal={true}
                >
                  {uploadStore.jobs[this.state.uploadJobId].map(upload => (
                    <View style={styles.previewContainer} key={upload.uploadId}>
                      <Image
                        source={{ uri: upload.path }}
                        style={styles.preview}
                      />
                      <Text>{uploadStore.progresses[upload.uploadId]}</Text>
                      <ProgressBarAndroid
                        color={colors.PRIMARY}
                        indeterminate={false}
                        progress={uploadStore.progresses.get(upload.uploadId)}
                        styleAttr="Horizontal"
                      />
                    </View>
                  ))}
                </ScrollView>
              )}
              <Button
                title="Publier"
                color={colors.PRIMARY}
                onPress={this.publish.bind(this)}
                disabled={publicationStore.publishing || this.state.uploading}
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
  },
  addImagesSection: {
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  addImagesText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center'
  },
  previewsContainer: {
    flex: 1
  },
  previewContainer: {
    marginRight: 15
  },
  preview: {
    width: 100,
    flex: 1,
    borderRadius: 3,
    borderRadius: 10
  }
});

export default screen(ProductFormScreen, { buffer: true });
