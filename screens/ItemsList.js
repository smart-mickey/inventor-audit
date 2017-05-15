import React, { PropTypes } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ListView
} from 'react-native';

import { List, ListItem } from 'react-native-elements';
import Link from './Link'

import ItemListItem from '../containers/ItemListItem';
import navigateTo from '../redux/actions'


const ItemsList = ({items}) => (
  <ScrollView>
    <List containerStyle={{'marginTop':0}} >
      {items.map((clover_obj) => (
        <ItemListItem
          key={clover_obj.id}
          title={`${clover_obj.name}`}
          raw = {clover_obj}
        />
      ))}
    </List>
  </ScrollView>
)

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired)
}



export default ItemsList;
