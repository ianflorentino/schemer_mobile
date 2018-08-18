import React, { Component } from 'react'
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native'
import { ButtonGroup, ListItem } from 'react-native-elements'
import DefaultText from '../../components/DefaultText'
import Variables from '../../utils/variables'
import { connect } from 'react-redux'
import * as eventActions from './redux/modules/events'

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 1
    }

    this.updateFilter = this.updateFilter.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentWillMount() {
    const { loadHomescreen } = this.props
    const current_time_query = new Date()
    loadHomescreen({ current_time_query })
  }

  data = [
    {
      title: "THIS BE EVENT 1",
      subtitle: "Sun, 22 Apr 2018"
    },
    {
      title: "THIS BE EVENT 2",
      subtitle: "Sun, 22 Apr 2018"
    },
    {
      title: "THIS BE EVENT 3",
      subtitle: "Sun, 22 Apr 2018"
    },
  ]

  updateFilter(selectedIndex) {
    this.setState({selectedIndex})
  }

  renderItem({item}) {
    return( 
      <ListItem
        title={item.title} subtitle={item.subtitle} />
    )
  }

  render() {
    const buttons = ['All', 'Upcoming', 'Past']
    const { selectedIndex } = this.state

    return (
      <View style={styles.container}>
        <ButtonGroup
          containerStyle={styles.btnGroup}
          onPress={this.updateFilter}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
        <FlatList
          style={styles.eventList}
          keyExtractor={this.keyExtractor}
          data={this.data}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { account, events } = state

  return {
    account,
    events
  }
}

export default connect(mapStateToProps, eventActions)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Variables.white,
  },
  eventList: {
    marginTop: 40
  }
})
