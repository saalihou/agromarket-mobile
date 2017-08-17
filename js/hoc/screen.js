import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import merge from 'lodash/merge';

import colors from '~theme/colors';

export default function screen(Component, options = {}) {
  class WrappedComponent extends Component {
    state = {
      loading: options.buffer ? true : false
    };

    componentDidMount() {
      if (options.buffer) {
        setTimeout(() => {
          this.setState({
            loading: false
          });
        });
      }
    }

    render() {
      if (this.state.loading) {
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator loading={true} size={20} />
          </View>
        );
      }
      return <Component {...this.props} />;
    }
  }

  WrappedComponent.navigatorStyle = merge(
    {},
    {
      navBarTitleTextCentered: true,
      navBarBackgroundColor: colors.PRIMARY,
      navBarTextColor: 'white',
      navBarButtonColor: 'white'
    },
    Component.navigatorStyle
  );
  WrappedComponent.propTypes = Component.propTypes;
  WrappedComponent.defaultProps = Component.defaultProps;

  return WrappedComponent;
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});
