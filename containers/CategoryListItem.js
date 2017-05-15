import { connect } from 'react-redux'
import { showItems, navigateTo, setTitle } from '../redux/actions'
import Link from '../screens/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPress: () => {
      dispatch(navigateTo("Items", ownProps.title))
      dispatch(showItems(ownProps.raw.items.elements))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
