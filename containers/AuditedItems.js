import { connect } from 'react-redux'
import CategoriesList from '../screens/CategoriesList'

const mapStateToProps = (state) => {
  return {
    items: state.auditedItems
  }
}

const Categories = connect(
  mapStateToProps
)(CategoriesList)

export default Categories
