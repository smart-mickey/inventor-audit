import { NavigationActions } from 'react-navigation';
import * as types from './types'


export function navigateTo(routeName, title, resetStack){
  return function (dispatch) {
    if (resetStack) {
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName })
        ]
      }));
    } else {
      dispatch(NavigationActions.navigate({ routeName: routeName, params: {name: title} }));
    }
  }
};

export function setTitle(title){
  return function (dispatch) {
    dispatch(NavigationActions.setParams({params:{title:title}, key:'id-1490893992864-2'}))
  }
}
/*
 * action types
 */




//export const TOGGLE_TODO = 'TOGGLE_TODO'
//export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

/*
 * action creators
 */



export function addItem(item) {
  return { 
    type: types.ADD_ITEM,
    data: item 
  }
}




export function showItems(items) {
  return {
    type: types.SHOW_ITEMS,
    items: items
  }
}



export function showIndividualItem(item) {
  return {
    type: types.SHOW_INDIVIDUAL_ITEM,
    item: item
  }
}



export function toggleModal(){
  return { type: types.TOGGLE_MODAL }
}



function requestCategories() {
  return {
    type: types.REQUEST_CATEGORIES,
  }
}



function receiveCategories(json) {
  console.log(json.elements)
  return {
    type: types.RECEIVE_CATEGORIES,
    categories: json.elements.map(child => child),
    receivedAt: Date.now()
  }
}

export function fetchCategories() {

  return function (dispatch) {

    dispatch(requestCategories())

    let json = {'elements':[{"name": "Mattress", "sortOrder": 13, "id": "1YRSBMEB7D1NG", "items": {"elements": [{"modifiedTime": 1470749311000, "code": "0850835000030", "hidden": false, "unitName": "", "sku": "", "itemStock": {"stockCount": 75782, "quantity": 75782.0, "item": {"id": "6MJP1RTBE7AF6"}}, "price": 50000, "stockCount": 75782, "alternateName": "", "priceType": "FIXED", "name": "Firm Mattress", "defaultTaxRates": true, "id": "6MJP1RTBE7AF6", "isRevenue": true}]}}, {"name": "Pillows", "sortOrder": 12, "id": "J53ZT20397CNY", "items": {"elements": [{"modifiedTime": 1470749271000, "code": "0850835000122", "hidden": false, "unitName": "", "sku": "", "itemStock": {"stockCount": 82503, "quantity": 82503.0, "item": {"id": "VH4QYG6KX9GNA"}}, "price": 1999, "stockCount": 82503, "alternateName": "", "priceType": "FIXED", "name": "Red Pillow", "defaultTaxRates": true, "id": "VH4QYG6KX9GNA", "isRevenue": true}]}}, {"name": "Mattress Toppers", "sortOrder": 11, "id": "FYQF62SAB2WER", "items": {"elements": [{"modifiedTime": 1470749234000, "code": "1470749234000", "hidden": false, "unitName": "", "sku": "", "itemStock": {"stockCount": 1, "quantity": 1.0, "item": {"id": "CZF54Y0WCVNFP"}}, "price": 65, "stockCount": 1, "alternateName": "", "priceType": "FIXED", "name": "Mattress Topper 1", "defaultTaxRates": true, "id": "CZF54Y0WCVNFP", "isRevenue": true}]}}]}
    dispatch(receiveCategories(json))
    let itemArray = {}
    json.elements.map(function(item, index){
      item.items.elements.map(function(item, index){
        itemArray[item.id] = item
      })
    })
  }
}



export function gotoBarcodeScanner() {
  return function (dispatch) {
    dispatch(navigateTo('Barcode', 'Barcode'))
  }
}

export function goback(data) {
  return function (dispatch) {
    const { navigate } = this.props.navigation;
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'ShowItems'})
        ]
    })
    this.props.navigation.dispatch(resetAction)
  }
}

export function onSaveQuantity() {
  return function(dispatch) {
    
  }
}

export function onScanResult(data) {
  return function (dispatch) {
    dispatch(navigateTo("SingleItem", 'Filtered item'))
    console.log('__MICKEY__', data)
    dispatch(showIndividualItem(data))
    dispatch(setScanResult(true))
  }
}

export function setScanResult(state) {
  return {
    type: types.SET_SCAN_RESULT,
    data: state
  }
}

export function updateItemDatas(data, aduitItems) {
  return function (dispatch) {
    let timestamp = new Date().getTime();
    data.lastUpdated = timestamp
    dispatch(updateItems(data))
    dispatch(updateAudit(aduitItems))
    const backAction = NavigationActions.back({
    })
    dispatch(backAction)
  }
  
}

export function onSubmitAudit(AuditItems){
  return function (dispatch) {
    
    fetch(types.SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AuditItems: AuditItems
      })
    })
    .then((response) => response.json())
    .then(function(data){            
        dispatch(updateAudit([]))
    })
    .catch((err)=>{
      alert(JSON.stringify(err))
    })
  }
}

export function updateItems(data){
    return {
      type: types.UPDATE_ITEM_ALLDATAS,
      data: data
    }
}

export function updateAudit(data){
  return {
      type: types.UPDATE_AUDIT_ITEMS,
      data: data
    }
}
