import React from 'react';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  Platform
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import IndividualItem from '../containers/IndividualItem'

class ItemDetailScreen extends React.Component {

  static navigationOptions = {
    title: (navigation, childRouter) => {
      return "Edit: "+navigation.state.params.name;
    },
    tabBar: {
      label: 'Search',
      icon: ({ tintColor, focused }) => (
          <Ionicons name={focused ? "ios-search": "ios-search-outline" }size={32} style={{ color: tintColor }} />
          ),
    }
  };

  componentWillUnmount() {
      this.props.setScanResult(false)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <IndividualItem/>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        categories: state.categories,
        isScanned: state.isScanned
    }
}, mapDispatchToProps)(ItemDetailScreen);
