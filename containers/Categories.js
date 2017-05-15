import { connect } from 'react-redux'
import CategoriesList from '../screens/CategoriesList'

const mapStateToProps = (state) => {
  return {
    items: state.categories.data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ),
    modalVisible: state.modalVisible
  }
}

const Categories = connect(
  mapStateToProps
)(CategoriesList)

export default Categories
