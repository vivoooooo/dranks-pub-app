import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.orders),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.orders.length !== nextProps.orders.length) {
      const nextOrder = nextProps.orders[nextProps.orders.length - 1];
      const orders = this.state.dataSource._dataBlob.s1.concat(nextOrder);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(orders)
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.orderList}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderHeader={() => <Text style={styles.header}>Orders</Text>}
          renderRow={(rowData) =>
            <View style={styles.orderItem}>
              <Text style={styles.orderItemText}><Icon name="slack" size={25} color="#746672"/> {rowData.orderNumber}</Text>
              <Icon name="bell" size={25} color="#FF7A5A" onPress={this.buzz.bind(this, rowData)}/>
            </View>
          }
        />
      </View>
    )
  }

  buzz(rowData) {
    fetch('https://order-app-web-12.herokuapp.com/api/order/' + rowData.orderId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inProgress: false
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      const ordersInProgress = this.state.dataSource._dataBlob.s1.filter((order) => {
        return order.orderId !== responseJson.id;
        // return order.orderNumber !== rowData.orderNumber;
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(ordersInProgress)
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D394B",
  },
  orderList: {
    marginLeft: 15,
    marginRight: 25,
  },
  header: {
    marginTop: 15,
    fontSize: 35,
    color: '#FFFFFF',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemText: {
    color: '#746672',
    fontSize: 30,
  }
});
