import React, { Component } from 'react';
import merge from 'lodash/merge';

import colors from '~theme/colors';

export default function screen(Component) {
  class WrappedComponent extends Component {
    render() {
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
