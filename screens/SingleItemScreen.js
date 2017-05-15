import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import Svg,{ Path } from 'expo/node_modules/react-native-svg';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux'
import { connect } from 'react-redux'
class Row extends Component {
  render() {
    return(
    <View style={styles.row}>
      <View>
        <Text style = {{color: this.props.color}}>{this.props.label}: </Text>
      </View>
      <View>
        <Text style = {{color: this.props.color}}>{this.props.value}</Text>
      </View>
    </View>
    );
  }
}

class Chevron extends Component {
  render () {
    return(
        <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.sidePanel && this.props.extraStyle}>
          <Svg height={24*3.25} width={24*3.25}>
            <Path
            d={this.props.d}
            scale={3.25}
            strokeWidth={1}
            fill={this.props.color}
            />
          </Svg>
          </View>
        </TouchableOpacity>
      )
  }
}

export class App extends React.Component {
  
  constructor(props) {
    super(props);
    console.log('__MICKEY__', this.props.item)
    if(this.props.item.unitName !== 'not found'){
      this.state = {
        showText: true,
        count: props.item.itemStock.quantity || 0,
        originalCount: props.item.itemStock.quantity || 0,
        adjustment: 0
      };
    }
  }

  componentDidMount() {
    const _this = this
    this.props.allItems.data.map(function(item, index){
      if(item.id == _this.props.item.id){
        _this.setState({
          count: item.itemStock.quantity || 0,
          originalCount: _this.props.item.itemStock.quantity || 0,
          adjustment: item.itemStock.quantity - item.itemStock.stockCount,
          item: item
        })
        console.log('__MICKEY__', 'live: ' + JSON.stringify(item))
        console.log('__MICKEY__', 'original: ' + JSON.stringify(_this.props.item.itemStock.quantity))
      }
    })
    
  }

  updateAdjustment(newAdjustment){
    return Null;
    if(newAdjustment > 0){
      this.setState({adjustmentColor: 'green'})
    }
    else if(newAdjustment < 0){
      this.setState({adjustmentColor: 'red'})
    }
    else{
      this.setState({adjustmentColor: 'black'})
    }
  }

  _handleButtonPress = () => {
    let num = 0
    const _this = this
    let temp = []
    if(this.state.adjustment == 0){
      this.props.auditedItems.map(function(item, index){
        if(item.id != _this.state.item.id){
          temp.push(item)
        }
      })  
    }else{
      temp = this.props.auditedItems
      temp.map(function(item, index){
        if(item.id == _this.state.item.id){
          item.itemStock.quantity = _this.state.count
          num = 1
        }
      })
      if(num == 0){
        temp.push(this.state.item)
      }
    }
    this.props.updateItemDatas(this.props.allItems, temp)
    this.props.onSaveQuantity()
  };

  _handlePlusPress = () => {
    // if(this.state.adjustment == -1 || this.state.adjustment == 0){
    //   this.updateAdjustment(this.state.adjustment + 1);
    // }
    this._changeQuantity(this.state.count + 1)
    this.setState({count: this.state.count + 1, adjustment: this.state.adjustment + 1});
  };

  _handleMinusPress = () => {
    console.log('minus press', this.state.adjustment - 1);
    //this.updateAdjustment(this.state.adjustment - 1);
    this._changeQuantity(this.state.count - 1)
    this.setState({count: this.state.count - 1, adjustment: this.state.adjustment - 1});    
  };

  _handleTextChange = inputValue => {
    console.log("text change")
    //will need to handle negative starting numbers
    var inte = parseInt(inputValue);
    if(isNaN(inte)){
      inte = 0
    }
    //this.updateAdjustment(99);
    this.setState({ count: parseInt(inte), adjustment: inte - this.state.originalCount });
    this._changeQuantity(inte)    
  };

  _changeQuantity(value){
    const _this = this
    console.log('__MICKEY__', 'Updated quantity!!!')
    // this.props.allItems.data.map(function(item, index){
    //   if(item.id == _this.props.item.id){
    //     item.itemStock.quantity = value
    //   }
    // })
    this.state.item.itemStock.quantity = value
    
  }

  render() {
    return (
          this.props.item.unitName !== 'not found'?
            <View style={styles.container}>
              <View style={styles.topContent}>
                <Text style={styles.itemName}>{this.props.item.name}</Text>
                <Row label={'SKU'} value={this.props.item.sku}/>
                <Row label={'Item Code'} value={this.props.item.code}/>
                <View style={styles.row}>
                  <Chevron
                  onPress={this._handleMinusPress}
                  d={"m 14 1 L 20 1 L 10 12 L 20 23 L 14 23 L 4 12 Z"}
                  color={"red"}
                  extraStyle={{right:-10}}
                  />
                  <TextInput
                    value={this.state.count.toString()}
                    onChangeText={this._handleTextChange}
                    style={{ height: 70, padding: 5, fontSize:70, textAlign: 'center', flex:3}}
                    keyboardType='numeric'
                    autoFocus={true}
                  />
                  <Chevron
                  d={"m 4 1 L 10 1 L 20 12 L 10 23 L 4 23 L 14 12 Z"}
                  color={"green"}
                  extraStyle={{left:-10}}
                  onPress={this._handlePlusPress}/>
                </View>
                <Row label={'Adjustment'} value={this.state.adjustment} color={this.state.adjustmentColor}/>
              </View>
              <View style={styles.bottomContent}>
                <Button
                  title="Save Changes"
                  onPress={this._handleButtonPress}
                />
              </View>
            </View>
          :
            <View><Text>Not Found</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  sidePanel: {
    flex: 2,
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  container: {
    flex: 3,
    flexDirection:'column',
    alignItems: 'center',

  },
  topContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomContent:{
    flex:2,
    justifyContent: 'flex-start'
  },
  row: {
    alignItems:'center',
    flexDirection:'row'
  },
  itemName: {
    fontSize:35,
    marginTop: 24,
    marginBottom: 24,
    textAlign: 'center'
  },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        item: state.individualItem,
        allItems: state.allItems,
        auditedItems: state.auditedItems,
    }
}, mapDispatchToProps)(App);
