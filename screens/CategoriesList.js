import React, { PropTypes } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ListView
} from 'react-native';

import { List, ListItem } from 'react-native-elements';

import CategoryListItem from '../containers/CategoryListItem';
import navigateTo from '../redux/actions'


const CategoriesList = ({items}) => (
  <ScrollView>
    <List containerStyle={{'marginTop':0}} >
      {items.map((clover_obj) => (
        <CategoryListItem
          key={clover_obj.id}
          title={`${clover_obj.name}`}
          raw = {clover_obj}
        />
      ))}
    </List>
  </ScrollView>
)

CategoriesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired)
}



export default CategoriesList;
