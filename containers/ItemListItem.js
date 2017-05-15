import { connect } from 'react-redux'
import { showItems, navigateTo, showIndividualItem } from '../redux/actions'
import ItemsListLink from '../screens/ItemsListLink'


const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPress: () => {
      dispatch(navigateTo("SingleItem", ownProps.title))
      console.log(ownProps.raw)
      dispatch(showIndividualItem(ownProps.raw))
    }
  }
}

const ItemListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsListLink)

export default ItemListItem
