import React from 'react';

import {
  View,
  StyleSheet,
  Platform
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import Items from '../containers/Items'

class ItemsScreen extends React.Component {

  static navigationOptions = {
    title: (navigation, childRouter) => {
      return navigation.state.params.name;
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
        <Items />
    );
  }
}

export default ItemsScreen;
