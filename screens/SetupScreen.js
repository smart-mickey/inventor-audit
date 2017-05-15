import React from 'react';

import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { List, ListItem } from 'react-native-elements';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux'
import { connect } from 'react-redux'
import ItemListItem from '../containers/ItemListItem';

const marginTop = Platform.OS === 'android' ? 20 : 0;
const barcode = require('../images/barcode.png')

class SetupScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
    tabBar:{
      label: 'Search',
      icon: ({ tintColor, focused }) => (
          <Ionicons name={focused ? "ios-search": "ios-search-outline" }size={32} style={{ color: tintColor }} />
          ),
    }
  };

  constructor(props){
    super(props)
    this.state = {
      allItems: []
    }
  }

  componentWillReceiveProps(props) {
        switch(props.from){
            case 'barcode':// case saved Fast Timer history
                alert(props.data)
                break;
            default:
        }      
    }

  componentDidMount() {
    this._bindItems(this.props.categories)
  }

  _bindItems(categories) {
    let itemNameArray = []
    let itemArray = []
    categories.data.map(function(item, index){
      item.items.elements.map(function(item, index){
        itemNameArray.push(item.name)
        itemArray.push(item)
      })
    })
    this.setState({allItems: itemArray})
  }

  render() {
    const { goBack } = this.props.navigation;
    const _this = this
    return (
      <View style={styles.container}>
        {/*<SearchBar
            ref={(ref) => this.searchBar = ref}
            placeholder='Type item name...'
            handleChangeText={(input) => {this.setState({searchText: input})}}
            showOnLoad={true}
            onHide={() => {
                //Actions.pop({refresh: {}});
                this.props.gotoBarcodeScanner()
            }}
            style={{backgroundColor: 'transparent'}}
        />*/}
        <View style={styles.searchBarView}>
          <View><Ionicons name={"ios-search-outline"} size={32}/></View>
          <View style={styles.textInput}>
            <TextInput
              style={{flex: 1}}
              placeholder='item name...'
              onChangeText = {(text) => this.setState({ searchText: text })}
              value = {this.state.searchText}>
            </TextInput>
            <TouchableOpacity onPress={() => {
              this.setState({ searchText: ''})
            }}>
              <Ionicons name={"ios-close"} size={32}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {
            this.props.gotoBarcodeScanner()
          }}>
            <Image source={barcode} style={{width: 40, height: 40, resizeMode: 'stretch', marginLeft: 10}}/>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <List containerStyle={{'marginTop':0}} >
            {
              this.state.allItems.map((item) => {
                if(item.name.indexOf(_this.state.searchText) > -1 && _this.state.searchText.length > 0){
                  return(
                    <ItemListItem
                      key={item.id}
                      title={`${item.name}`}
                      raw = {item}
                    />
                  )
                }
              })
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },

  searchBarView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 52,
    padding: 6
  },

  textInput: {
    borderColor: 'gray', 
    borderWidth: 0.5, 
    flex: 1, 
    marginLeft: 6, 
    padding: 6, 
    position: 'relative', 
    flexDirection: 'row', 
    height: 36, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        categories: state.categories,
        allItems: state.allItems
    }
}, mapDispatchToProps)(SetupScreen);
