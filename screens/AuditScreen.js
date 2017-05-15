import React from 'react';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native'

import AuditedItems from '../containers/AuditedItems'
import ItemListItem from '../containers/ItemListItem';
import { List, ListItem } from 'react-native-elements';
import { SearchBar, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const marginTop = Platform.OS === 'ios' ? 0 : 20;

class AuditScreen extends React.Component {

  static navigationOptions = {
    title: 'Audit List',   
    headerRight: <Button title='Submit'/>,
    headerStyle: {
      backgroundColor: 'blue'
    },
    tabBar:{
      label: 'Audit',
      icon: ({ tintColor, focused }) => (
          <Ionicons name={focused ? "ios-checkmark-circle": "ios-checkmark-circle-outline" }size={32} style={{ color: tintColor }} />
          ),
    }
  };

  

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container} >

        <View style={{padding: 20}}>
          <Button title='Submit' onPress={()=>{this.onSubmitAudit()}}/>
        </View>
        <ScrollView>
          <List containerStyle={{'marginTop':0}} >
            {
              this.props.auditedItems.map((clover_obj) => {
                return(
                  <ItemListItem
                    key={clover_obj.id}
                    title={`${clover_obj.name}`}
                    raw = {clover_obj}
                  />
                )
              })
            }
          </List>
        </ScrollView>
      </View>
    );
  }

  onSubmitAudit() {
    this.props.allItems.data.map(function(item, index){
      item.itemStock.stockCount = item.itemStock.quantity
    })
    this.props.onSubmitAudit(this.props.auditedItems)

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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        categories: state.categories,
        allItems: state.allItems,
        auditedItems: state.auditedItems
    }
}, mapDispatchToProps)(AuditScreen);

