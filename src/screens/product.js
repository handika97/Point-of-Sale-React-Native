import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dialog from 'react-native-dialog';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  AsyncStorage,
  TextInput,
} from 'react-native';
import ListItemComp from '../components/ListItemComp';
import ListCartComp from '../components/ListCartComp';
import image from '../image/cart.png';
import image1 from '../image/back.png';
import axios from 'axios';
// import {TextInput} from 'react-native-gesture-handler';
import _ from 'lodash';
//import {styles} from '../components/ListDataComp';

export default class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      search: '',
      loading: false,
      error: false,
      handSearch: false,
      cart: [],
      dialogvisible: false,
      qty: [],
      total: 0,
      user: '',
      keyword: '',
      page: 1,
      clear: false,
    };
    //this.getTv = _.debounce(this.getTv, 1000);
  }
  componentDidMount() {
    this.getTv();
    this._retrieveData();
  }

  getTv = async page => {
    try {
      if (this.state.keyword.length === 0) {
        if (page === undefined) {
          page = 1;
        }
        const response = await axios.get(
          `http://192.168.1.181:4002/api/v1/product/${page}`,
          //'http://api.tvmaze.com/search/shows?q=naruto',
        );
        console.log(response.data);
        this.setState({
          result: response.data,
          loading: false,
          error: false,
          page: page,
        });
      } else {
        const response = await axios.get(
          `http://192.168.1.181:4002/api/v1/shop/search/${this.state.keyword}`,
          //'http://api.tvmaze.com/search/shows?q=naruto',
        );
        console.log(response.data);
        this.setState({
          result: response.data,
          loading: false,
          error: false,
        });
      }
      // const response = await axios.get(
      //   'http://192.168.1.181:4002/api/v1/product/',
      //   //'http://api.tvmaze.com/search/shows?q=naruto',
      // );
      // console.log(response.data);
      // this.setState({
      //   result: response.data,
      //   loading: false,
      //   error: false,
      // });
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
        error: true,
        keyword: '',
      });
      return Alert.alert(
        'Error',
        'Error connection to server error',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        this.setState({user: value});
      }
      console.log(this.state.user);
    } catch (error) {
      // Error retrieving data
    }
  };

  addCart = product => {
    console.log('yee');
    if (this.state.cart.length === 0 || this.state.cart === null) {
      let cart = {
        id: product.id,
        name: product.nama,
        Image: product.Image,
        qty: product.stock,
        price: product.price,
      };
      var carts = this.state.cart;
      carts.push(cart);
      this.setState({
        cart: carts,
      });
    } else {
      if (
        this.state.cart
          .map(function(obj) {
            return obj.name;
          })
          .indexOf(product.nama) === -1
      ) {
        let items = {
          id: product.id,
          name: product.nama,
          Image: product.Image,
          qty: product.stock,
          price: product.price,
        };
        this.setState({
          cart: [...this.state.cart, items],
        });
        console.log(this.state.cart);
      } else {
        for (let i = 0; i < this.state.cart.length; i++) {
          if (product.nama === this.state.cart[i].name) {
            return false;
          }
        }
        console.log('y');
      }
    }
    console.log(this.state.cart);
  };
  Qty = (qty, myId) => {
    console.log(qty, myId);
    if (this.state.qty.length === 0 || this.state.qty === null) {
      let id = {Id: myId, qty: 1};
      let qtys = this.state.qty;
      qtys.push(id);
      this.setState({
        qty: qtys,
      });
    } else {
      if (
        this.state.qty
          .map(function(obj) {
            return obj.Id;
          })
          .indexOf(myId) === -1
      ) {
        let id = {Id: myId, qty: 1};
        this.setState({
          qty: [...this.state.qty, id],
        });
      } else {
        for (let i = 0; i < this.state.qty.length; i++) {
          if (myId === this.state.qty[i].Id) {
            if (qty < 0) {
              this.delete(myId);
              let newCart = this.state.qty.filter(qty => qty.Id !== myId);
              console.log(newCart);
              this.setState({
                qty: newCart,
              });
            } else {
              // eslint-disable-next-line react/no-direct-mutation-state
              this.state.qty[i].qty = qty;
            }
          }
        }
      }
    }
    console.log(this.state.qty);
  };
  delete = id => {
    let newCart = this.state.cart.filter(cart => cart.id !== id);
    console.log(newCart);
    this.setState({
      cart: newCart,
    });
  };

  Total = price => {
    console.log(price);
    this.setState({
      total: this.state.total + price,
    });
  };

  finish = user => {
    if (this.state.qty.length === 1) {
      axios.post(`http://192.168.1.181:4002/api/v1/shop/`, {
        id_item: this.state.qty[0].Id,
        qty: this.state.qty[0].qty,
      });

      console.log(this.state.qty.length);
    } else {
      const _storeData = async () => {
        try {
          this.state.qty.forEach(async i => {
            await axios.post(`http://192.168.1.181:4002/api/v1/shop/`, {
              id_item: i.Id,
              qty: i.qty,
            });
          });
        } catch (e) {}
      };

      _storeData().then(async () => {
        console.log('selesai');
      });
    }

    this.setState({
      user: user,
      total: 0,
      qty: [],
      cart: [],
    });
    //console.log(this.state.qty)
  };
  handleOk = async () => {
    await axios.patch(
      `http://192.168.1.181:4002/api/v1/shop/${this.state.user}`,
    );
    this.setState({clear: false, dialogvisible: false});
  };
  reset = () => {
    console.log(this.state.cart);
    this.setState({
      cart: [],
      qty: [],
      total: 0,
      dialogvisible: false,
    });
    console.log(this.state.cart);
  };

  render() {
    const {result, loading, error} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
          <View>
            <TextInput
              style={{
                backgroundColor: 'white',
                opacity: 0.8,
                width: 130,
                height: 40,
                marginTop: 5,
                borderWidth: 2,
                borderRadius: 20,
                color: 'black',
                fontSize: 15,
              }}
              placeholder="keyword"
              onChangeText={text => this.setState({keyword: text})}
            />
          </View>
          <View style={styles.sectionButton}>
            <TouchableOpacity onPress={() => this.getTv()}>
              <View style={{marginLeft: 5}}>
                <Image
                  source={require('../image/search.png')}
                  style={{height: 50, width: 50}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionButton}>
            <TouchableOpacity
              onPress={() => {
                this.setState({dialogvisible: true});
              }}>
              <View style={styles.button}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 110,
                    marginTop: 12,
                  }}>
                  <Image style={{height: 30, width: 30}} source={image} />
                  <Text
                    style={{
                      marginLeft: 2,
                      backgroundColor: '#8579d4',
                      width: 12,
                      height: 25,
                      borderRadius: 3,
                      fontSize: 20,
                      color: 'white',
                    }}>
                    {this.state.cart.length}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error, Plaese try again</Text>
        ) : result.length < 1 ? (
          <Text>No Series fount with keyboard</Text>
        ) : (
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={result}
            numColumns={2}
            renderItem={({item}) => (
              <ListItemComp
                data={item}
                cart={this.addCart}
                reset={this.reset}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.dialogvisible}>
          <View style={{marginTop: 0, modalButton: 30}}>
            <View>
              <View style={styles.nav}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({dialogvisible: false, total: 0});
                  }}>
                  <Image
                    style={{height: 30, width: 30, marginTop: 10}}
                    source={image1}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.reset()}>
                  <View style={(styles.button, styles.modalButton)}>
                    <Text
                      style={{
                        fontSize: 20,
                        borderBottomWidth: 3,
                        marginTop: 12,
                        marginLeft: 40,
                      }}>
                      CANCEL
                    </Text>
                    {/* {this.setState({dialogvisible: false})} */}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.finish(this.state.user),
                      this.setState({
                        clear: true,
                      });
                  }}>
                  <View style={(styles.button, styles.modalButton)}>
                    <Text
                      style={{
                        fontSize: 20,
                        marginLeft: 20,
                        borderBottomWidth: 3,
                        marginTop: 12,
                      }}>
                      Checkout
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text style={{marginTop: 23, marginLeft: 10}}>
                  TOTAL= {this.state.total}
                </Text>
              </View>
              <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                data={this.state.cart}
                renderItem={({item}) => (
                  <ListCartComp data={item} Qty={this.Qty} Total={this.Total} />
                )}
                keyExtractor={item => item.id}
                style={{marginBottom: 100}}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.next}>
          {this.state.page > 1 ? (
            <TouchableOpacity onPress={() => this.getTv(this.state.page - 1)}>
              <View style={(styles.button, styles.modalButton)}>
                <Image
                  source={require('../image/next.png')}
                  style={{height: 50, width: 50, rotation: 180}}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity Hidden>
              <View style={(styles.button, styles.modalButton)}>
                <Image
                  source={require('../image/next.png')}
                  style={{height: 50, width: 50, rotation: 180}}
                />
              </View>
            </TouchableOpacity>
          )}
          {this.state.result.length > 5 ? (
            <TouchableOpacity onPress={() => this.getTv(this.state.page + 1)}>
              <View style={(styles.button, styles.modalButton)}>
                <Image
                  source={require('../image/next.png')}
                  style={{height: 50, width: 50}}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity Hidden>
              <View style={(styles.button, styles.modalButton)}>
                <Image
                  source={require('../image/next.png')}
                  style={{height: 50, width: 50}}
                />
              </View>
            </TouchableOpacity>
          )}
          <Dialog.Container visible={this.state.clear}>
            <Dialog.Title>successful transaction</Dialog.Title>

            <Dialog.Button label="OK" onPress={this.handleOk} />
          </Dialog.Container>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    height: 50,
    backgroundColor: '#4b80d6',
    marginTop: 0,
    flexDirection: 'row',
  },
  next: {
    height: 50,
    backgroundColor: '#4b80d6',
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
