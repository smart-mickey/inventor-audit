import { connect } from 'react-redux'
import ItemsList from '../screens/ItemsList'

const mapStateToProps = (state) => {
  return {
    items: state.items.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ),
    modalVisible: state.modalVisible
  }
}

const Items = connect(
  mapStateToProps
)(ItemsList)

export default Items
