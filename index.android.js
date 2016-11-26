import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import NFCModule from './App/Modules/NFCModule';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TagMaButt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: "1",
      beer: {
        id: 1,
        name: 'beer',
        price: 8,
        calories: 100,
      },
      martini: {
        id: 2,
        name: 'martini',
        price: 20,
        calories: 300,
      },
      beerQuantity: 0,
      martiniQuantity: 0,
      totalPrice: 0
    };
  }

  render() {
    const plusIcon = (<Icon name="plus" size={35} color="white"/>)
    const minusIcon = (<Icon name="minus" size={35} color="white"/>)
    const beerIcon = (<Icon name="beer" size={35} color="white"/>)
    const cocktailIcon = (<Icon name="coffee" size={35} color="white"/>)

    return (
          <View style={styles.container}>
            <View style={styles.body}>
               <Text style={styles.logo}>
                 Drnk
               </Text>
              <View style={styles.drinksListContainer}>
                <View style={styles.drinksList}>
                  <View style={styles.beerIcon}>
                    {beerIcon}
                  </View>
                  <TouchableHighlight style={styles.plusIcon} onPress={this._onPlusButton.bind(this, 'beer')}>
                     <View>
                       {plusIcon}
                     </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.plusIcon} onPress={this._onMinusButton.bind(this, 'beer')}>
                     <View>
                       {minusIcon}
                     </View>
                  </TouchableHighlight>
                  <Text style={styles.quantity}>{this.state.beerQuantity}</Text>
                  <Text style={styles.subtotal}>${this.state.beer.price}</Text>
                </View>
                <View style={styles.drinksList}>
                  <View style={styles.cocktailIcon}>
                    {cocktailIcon}
                  </View>
                  <TouchableHighlight style={styles.plusIcon} onPress={this._onPlusButton.bind(this, 'martini')}>
                     <View>
                       {plusIcon}
                     </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.plusIcon} onPress={this._onMinusButton.bind(this, 'martini')}>
                     <View>
                       {minusIcon}
                     </View>
                  </TouchableHighlight>
                  <Text style={styles.quantity}>{this.state.martiniQuantity}</Text>
                  <Text style={styles.subtotal}>${this.state.martini.price}</Text>
                </View>
              </View>
            </View>
            <View style={styles.totalWrapper}>
              <Text style={styles.totalLogo}>
              Total:
              </Text>
              <Text style={styles.totalAmount}>
              ${this.state.totalPrice}
              </Text>
            </View>
            <TouchableHighlight style={styles.button} onPress={this._onSubmitButton.bind(this)}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableHighlight>
          </View>
    );
  }


  _onPlusButton(drink) {
    if (drink === 'beer') {
        const quantity = this.state.beerQuantity + 1;
        const totalPrice = this.state.beer.price + this.state.totalPrice;
        this.setState({beerQuantity: quantity, totalPrice: totalPrice});
    } else if (drink === 'martini'){
        const quantity = this.state.martiniQuantity + 1;
        const totalPrice = this.state.martini.price + this.state.totalPrice;
        this.setState({martiniQuantity: quantity, totalPrice: totalPrice});
      }
    }

  _onMinusButton(drink) {
    if (drink === 'beer' && this.state.beerQuantity != 0 ) {
      const quantity = this.state.beerQuantity - 1;
      const totalPrice = this.state.totalPrice - this.state.beer.price;
      this.setState({beerQuantity: quantity, totalPrice: totalPrice});
    } else if (drink === 'martini' && this.state.martiniQuantity != 0 ) {
        const quantity = this.state.martiniQuantity - 1;
        const totalPrice = this.state.totalPrice - this.state.martini.price;
        this.setState({martiniQuantity: quantity, totalPrice: totalPrice});
      }
    }

  _onSubmitButton() {
    fetch('https://fathomless-peak-84606.herokuapp.com/orders', {
      method: 'POST',
      body: JSON.stringify({
        orderId: this.state.orderId,
        drinks: [this.state.beer, this.state.martini],
        quantities: [this.state.beerQuantity, this.state.beerQuantity],
        totalPrice: this.state.totalPrice
      })
    })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((totalPrice) => console.log(totalPrice))
    .catch((err) => {
      console.log(err);
    });
  }
}

async function tagMaButt(orderNumber) {
  console.log('Tagging... ');
  try {
    var {
      tagStatus
    } = await NFCModule.tagMaButt(orderNumber);
    return tagStatus;
  } catch (error) {
    console.error(error);
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: {paddingLeft: 3},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    flex: 10,
    position: 'absolute',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  body: {
    flex: 2,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#462066',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    borderWidth: 0.8,
    borderRadius: 3,
    paddingLeft: 5
  },
  plusIcon: {
    // flex: 1,
    backgroundColor: '#8ED2C9',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  singleLine: {
    flex: 5,
    fontSize: 15,
  },
  drinksList: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  drinksListDescript: {
  },
  beerIcon: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  cocktailIcon: {
    backgroundColor: 'pink',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  quantity: {
    color: 'grey',
    fontSize: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 10
  },
  subtotal: {
    color: 'grey',
    fontSize: 30,
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 10
  },
  totalWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  totalLogo: {
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#462066'
  },
  totalAmount: {
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#462066'
  },
  button: {
    padding: 20,
    backgroundColor: 'pink',
    borderRadius: 15,
    marginBottom: 10
  }
});

AppRegistry.registerComponent('TagMaButt', () => TagMaButt);
