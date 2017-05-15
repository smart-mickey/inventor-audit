import React from 'react';

import {
  View,
  StyleSheet,
  Platform
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import SingleItemScreen from './SingleItemScreen.js'

class CategoriesScreen extends React.Component {

  static navigationOptions = {
    title: (navigation, childRouter) => {
      return "Edit: "+navigation.state.params.name;
    },
    tabBar: {
      label: 'Categories',
      icon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-list' : 'ios-list-outline'}
          size={32}
          style={{ color: tintColor }}
        />
      ),
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
        <SingleItemScreen/>
    );
  }
}

export default CategoriesScreen;
