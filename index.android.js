import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const beer = {id: 1, name: 'beer', price: 8, calories: 100};
const martini = {id: 2, name: 'martini', price: 20, calories: 300};
const plusIcon = (<Icon name="plus" size={35} color="white"/>);
const minusIcon = (<Icon name="minus" size={35} color="white"/>);
const beerIcon = (<Icon name="beer" size={100} color="#FD5800"/>);
const cocktailIcon = (<Icon name="glass" size={100} color="#FD5800"/>);
const timesIcon = (<Icon name="times" size={20} color="grey"/>);

export default class TagMaButt extends Component {
  constructor(props) {
    super(props);
    this.state = {orderId: "1", beer, martini, beerQuantity: 0, martiniQuantity: 0, totalPrice: 0};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>Drnk</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.drinkPanel}>
            <View style={styles.drinkPanelLeft}>
              {beerIcon}
              <View style={styles.buttons}>
                <TouchableHighlight style={styles.plusIcon} onPress={this._onPlusButton.bind(this, 'beer')}>{plusIcon}</TouchableHighlight>
                <TouchableHighlight style={styles.plusIcon} onPress={this._onMinusButton.bind(this, 'beer')}>{minusIcon}</TouchableHighlight>
              </View>
            </View>
            <View style={styles.drinkPanelRight}>
              <Text style={styles.quantity}>{timesIcon} {this.state.beerQuantity}</Text>
              <Text style={styles.price}>Price: ${this.state.beer.price}</Text>
            </View>
          </View>
          <View style={styles.drinkPanel}>
            <View style={styles.drinkPanelLeft}>
              {cocktailIcon}
              <View style={styles.buttons}>
                <TouchableHighlight style={styles.plusIcon} onPress={this._onPlusButton.bind(this, 'martini')}>{plusIcon}</TouchableHighlight>
                <TouchableHighlight style={styles.plusIcon} onPress={this._onMinusButton.bind(this, 'martini')}>{minusIcon}</TouchableHighlight>
              </View>
            </View>
            <View style={styles.drinkPanelRight}>
              <Text style={styles.quantity}>{timesIcon} {this.state.martiniQuantity}</Text>
              <Text style={styles.price}>Price: ${this.state.martini.price}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.totalPrice}>Total: ${this.state.totalPrice}</Text>
          <TouchableHighlight style={styles.button} onPress={this._onSubmitButton.bind(this)}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _onPlusButton(drink) {
    if (drink === 'beer') {
      const quantity = this.state.beerQuantity + 1;
      const totalPrice = this.state.beer.price + this.state.totalPrice;
      this.setState({beerQuantity: quantity, totalPrice: totalPrice});
    } else {
      const quantity = this.state.martiniQuantity + 1;
      const totalPrice = this.state.martini.price + this.state.totalPrice;
      this.setState({martiniQuantity: quantity, totalPrice: totalPrice});
    }
  }

  _onMinusButton(drink) {
    if (drink === 'beer' && this.state.beerQuantity != 0) {
      const quantity = this.state.beerQuantity - 1;
      const totalPrice = this.state.totalPrice - this.state.beer.price;
      this.setState({beerQuantity: quantity, totalPrice: totalPrice});
    } else if (drink === 'martini' && this.state.martiniQuantity != 0) {
      const quantity = this.state.martiniQuantity - 1;
      const totalPrice = this.state.totalPrice - this.state.martini.price;
      this.setState({martiniQuantity: quantity, totalPrice: totalPrice});
    }
  }

  _onSubmitButton() {
    fetch('https://fathomless-peak-84606.herokuapp.com/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        orderId: this.state.orderId,
        drinks: [this.state.beer, this.state.martini],
        quantities: [this.state.beerQuantity, this.state.martiniQuantity],
        totalPrice: this.state.totalPrice
      })
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DD1164',
  },
  header: {
    flex: 1,
  },
  body: {
    justifyContent: 'center',
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  drinkPanel: {
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  drinkPanelLeft: {
    flex: 2,
    alignItems: 'center',
  },
  drinkPanelRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quantity: {
    color: 'grey',
    fontSize: 50,
  },
  price: {
    color: 'grey',
    fontSize: 15,
  },
  footer: {
    flex: 2,
    paddingLeft: 10,
    backgroundColor: '#009CDE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  totalPrice: {
    flex: 5,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#00CF92',
  },
  buttonText: {
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  logo: {
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#00CF92',
    textAlign: 'center',
    marginBottom: 40,
  },
  plusIcon: {
    backgroundColor: '#00CF92',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('TagMaButt', () => TagMaButt);