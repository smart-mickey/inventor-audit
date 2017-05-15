import { connect } from 'react-redux'
import AppWithNav from '../screens/AppWithNav'

const mapStateToProps = (state) => {
  return {
    nav:state.nav,
    dispatch: state.dispatch
  }
}

const AppWithNavigationState = connect(
  mapStateToProps
)(AppWithNav)

export default AppWithNavigationState
