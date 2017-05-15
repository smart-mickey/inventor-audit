import React from 'react';

import {
  View,
  StyleSheet,
  Platform
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import Categories from '../containers/Categories'

class CategoriesScreen extends React.Component {

  static navigationOptions = {
    title: 'Categories',
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
        <Categories />
    );
  }
}

export default CategoriesScreen;
