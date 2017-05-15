import React from 'react';

import { connect } from 'react-redux'


import {
  TabNavigator,
  StackNavigator,
  addNavigationHelpers
} from 'react-navigation';

import AppNavigator from '../navigation/AppNavigator'

class AppWithNav extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}


const mapStateToProps = ({ nav }) => ({ nav });

const AppWithNavigationState = connect(
  mapStateToProps
)(AppWithNav)

export default AppWithNavigationState;
