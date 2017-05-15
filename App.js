import React from 'react';

import {
  View,
  StyleSheet,
  Platform
} from 'react-native'

import AppWithNavigationState from './containers/AppWithNavigationState'

import { Ionicons } from '@expo/vector-icons';
import AuditedItems from './containers/AuditedItems'

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import inventoryAuditApp from './redux/reducers'
import { Provider } from 'react-redux'
import {fetchCategories} from './redux/actions'

import { SearchBar, Button } from 'react-native-elements'

import { Constants } from 'expo';

let store = createStore(inventoryAuditApp, {'categories': {'data':[]},'auditedItems':[], 'items': ['John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin']}, applyMiddleware(thunkMiddleware))

const marginTop = Platform.OS === 'ios' ? 20 : 0;



class App extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    store.dispatch(fetchCategories())//.then(() =>
      //console.log("bla", store.getState())
    //)
    return <Provider store={store}><AppWithNavigationState/></Provider>;
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: marginTop,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export default App;
