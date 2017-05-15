import { connect } from 'react-redux'
import { showItems, navigateTo, setTitle } from '../redux/actions'
import SingleItemScreen from '../screens/SingleItemScreen'


const mapStateToProps = (state, ownProps) => {
  return {
    item: state.individualItem,
    allItems: state.allItems
  }
}

const IndividualItem = connect(
  mapStateToProps,
)(SingleItemScreen)

export default IndividualItem
