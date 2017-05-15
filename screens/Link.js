import React, { PropTypes } from 'react'
import { ListItem } from 'react-native-elements'

const Link = ({ title, onPress }) => {
  return (
    <ListItem
      title={title}
      onPress={e => {
          console.log("before prevent", Date.now())
          e.preventDefault()
          console.log("after prevent", Date.now())
          onPress()
        }}
      />
  )
}

Link.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Link
