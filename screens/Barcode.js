import React from 'react';
import Expo, { Components, Permissions } from 'expo';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView
} from 'react-native'


class BarcodeScannerScreen extends React.Component {
    static navigationOptions = {
        header: {
            title: 'Barcode Scanner'
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
            hasCameraPermission: null,
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
        
    }



    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
        return <Text>adasdf</Text>;
        } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
        } else {
        return (
            <View style={{flex: 1}}>
            <Components.BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={StyleSheet.absoluteFill}
            />
            </View>
        );
        }
    }

    _handleBarCodeRead = (data) => {
        //this.props.goback(data)
        if(this.props.isScanned) return
        const _this = this
        let num = 0
        console.log('__MICKEY__SCANNED_DATA?__', JSON.stringify(data))
        this.props.categories.data.map(function(item, index){
            item.items.elements.map(function(item, index){
                if(item.code == data.data || item.sku == data.data){
                    _this.props.onScanResult(item)
                    num++
                }
            })
        })
        if(num == 0) this.props.onScanResult({unitName: 'not found'})
        
    }
}

 
const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  }
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        categories: state.categories,
        isScanned: state.isScanned
    }
}, mapDispatchToProps)(BarcodeScannerScreen);