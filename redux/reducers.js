import { combineReducers } from 'redux'
import * as types from './types'
import AppWithNavigationState from '../screens/AppWithNav'
import AppNavigator from '../navigation/AppNavigator'

//const { SHOW_ALL } = VisibilityFilters

// function visibilityFilter(state = SHOW_ALL, action) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return action.filter
//     default:
//       return state
//   }
// }

function modalVisible(state = true, action) {
  switch (action.type) {
    case types.TOGGLE_MODAL:
      return !state
    default:
      return !state
  }
}

function items(state = [], action){
  switch (action.type){
    case types.SHOW_ITEMS:
      return action.items
  }
  return state
}

function individualItem(state = {}, action){
  switch (action.type){
    case types.SHOW_INDIVIDUAL_ITEM:
      return action.item
  }
  return state
}

function auditedItems(state = [], action) {
  switch (action.type) {
    case types.ADD_ITEM:
      return [
        ...state,
        action.data,

      ]
    case types.UPDATE_AUDIT_ITEMS:
      return action.data
    default:
      return state
  }
}

function categories(state= {
  isFetching: false,
  didInvalidate: false,
  data: []
}, action){
  switch (action.type){
    case types.REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case types.RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.categories,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function allItems(state= {
  isFetching: false,
  didInvalidate: false,
  data: []
}, action){
  switch (action.type){
    case types.REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case types.RECEIVE_CATEGORIES:
      let itemArray = []
      action.categories.map(function(item, index){
        item.items.elements.map(function(item, index){
          itemArray.push(item)
        })
      })
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: itemArray,
        lastUpdated: action.receivedAt
      })
    case types.UPDATE_ITEM_ALLDATAS:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

function isScanned(state = false, action){
  switch (action.type){
    case  types.SET_SCAN_RESULT:
      return action.data
    default:
      return state
  }
}

function nav(state, action){
  console.log(state)
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
}



const inventoryAuditApp = combineReducers({
  nav,
  auditedItems,
  individualItem,
  items,
  categories,
  modalVisible,
  isScanned,
  allItems,
})

export default inventoryAuditApp
