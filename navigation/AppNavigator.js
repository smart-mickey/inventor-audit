import React from 'react';

import {
  TabNavigator,
  StackNavigator,
  addNavigationHelpers,
  StackRouter
} from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen'
import AuditScreen from '../screens/AuditScreen'
import SetupScreen from '../screens/SetupScreen'
import ItemsScreen from '../screens/ItemsScreen'
import BarcodeScanner from '../screens/Barcode'
import IndividualItemScreen from '../screens/IndividualItemScreen'
import ItemDetailScreen from '../screens/ItemDetailScreen'

const ItemsStack = StackNavigator({
  Items: {
    screen: ItemsScreen,
    title: 'Items'
  },
  SingleItem: {
    screen: IndividualItemScreen,
    title: 'Item'
  },
},{
  mode: 'modal',
  headerMode: 'none',
});

const AuditStack = StackNavigator({
  Audits: {
    screen: AuditScreen,
    navigationOptions: () => ({
      title: 'Audit List',

    }),
  },
  SingleItem: {
    screen: IndividualItemScreen,
    title: 'Item'
  },
})

const CategoriesStack = StackNavigator({
  Categories: {
    screen: CategoriesScreen,
    title: 'Name'
  },
  Items: {
    screen: ItemsStack,
    title: 'Items'
  }
});

const SearchScreen = StackNavigator({
  ShowItems: {
    screen: SetupScreen,
  },  
  Barcode: {
    screen: BarcodeScanner,
    title: 'Barcode'
  },
  SingleItem: {
    screen: ItemDetailScreen,
    title: 'Item'
  },
},{
  mode: 'card',
  headerMode: 'screen',
});

const AppNavigator = TabNavigator({
  Audit: {screen: AuditStack},
  CategoriesStack: {screen: CategoriesStack, title:'Categories'},
  Search: {screen: SearchScreen},
},{
  tabBarPosition: 'bottom'
});

export default AppNavigator;
