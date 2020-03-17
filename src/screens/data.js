/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Modal,
  Picker,
  Image,
  ScrollView,
} from 'react-native';
import ListDataComp from '../components/ListDataComp';
import ListCategoryComp from '../components/ListCategoryComp';
import axios from 'axios';
import Dialog from 'react-native-dialog';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {TextInput} from 'react-native-gesture-handler';
import _ from 'lodash';
import {TextInput} from 'react-native-gesture-handler';
// import {
//   getCategory,
// postCategory,
// deleteCategory,
// updateCategory
// } from '../../src/redux/actions/category';
import ImagePicker from 'react-native-image-picker';

class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      search: '',
      loading: false,
      error: false,
      addProduct: false,
      nama: '',
      description: '',
      stock: '',
      price: '',
      Image: '',
      id_category: '',
      category: [],
      avatarSource: null,
      ImageUpload: null,
    };
    //this.getTv = _.debounce(this.getTv, 1000);
  }
  componentDidMount() {
    this.getTv();
    this.getCategory();
    //this.getTv();
  }

  getCategory = async () => {
    const response = await axios.get(
      'http://192.168.1.181:4002/api/v1/category/',
    );
    this.setState({
      category: response.data,
    });
  };

  getTv = async () => {
    this.setState({
      loading: true,
    });
    try {
      await axios
        .get(
          'http://192.168.1.181:4002/api/v1/product/',
          //'http://api.tvmaze.com/search/shows?q=naruto',
        )
        .then(response => {
          this.setState({
            result: response.data,
            loading: false,
            error: false,
          });
        });
    } catch (err) {
      console.log(err);
      this.setState({
        loading: true,
        error: true,
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
  getProduct = async () => {
    this.setState({
      loading: true,
    });
    try {
      await axios
        .get(
          'http://192.168.1.181:4002/api/v1/product/',
          //'http://api.tvmaze.com/search/shows?q=naruto',
        )
        .then(response => {
          this.setState({
            result: response.data,
            loading: false,
            error: false,
          });
        });
    } catch (err) {
      console.log(err);
      this.setState({
        loading: true,
        error: true,
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

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        const source = response.uri;

        this.setState({
          avatarSource: source,
          ImageUpload: response,
        });
      }
      // }
    });
  };

  handleAdd = async () => {
    if (this.state.ImageUpload) {
      this.setState({
        loading: true,
      });
      const dataFile = new FormData();
      dataFile.append('nama', this.state.nama);
      dataFile.append('description', this.state.description);
      dataFile.append('price', this.state.price);
      dataFile.append('stock', this.state.stock);
      dataFile.append('Image', {
        uri: this.state.ImageUpload.uri,
        type: 'image/jpeg',
        name: this.state.ImageUpload.fileName,
      });
      dataFile.append('id_category', this.state.id_category);
      axios
        .post('http://192.168.1.181:4002/api/v1/product/', dataFile)
        .then(res => {
          this.getTv();
          this.setState({
            loading: false,
            addProduct: false,
          });
          Alert.alert('add sukses');
        });
    } else {
      Alert.alert('silahkan upload fotonya terlebih dahulu');
    }
  };

  render() {
    const {result, loading, error} = this.state;
    return (
      <SafeAreaView>
        <View style={styles.nav}>
          <Text style={styles.titleTab}>Product List</Text>
          <View style={styles.sectionButton}>
            <TouchableOpacity
              onPress={() => {
                this.setState({addProduct: true});
              }}>
              <View style={styles.button}>
                <Text style={styles.fontLogin}>Add Product</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginBottom: 120}}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>Error, Plaese try again</Text>
          ) : result.length > 1 ? (
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={result}
              numColumns={1}
              renderItem={({item}) => (
                <ListDataComp data={item} get={this.getTv} />
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>No Product</Text>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.addProduct}
          style={{}}>
          <View style={{backgroundColor: 'white'}}>
            <View style={styles.nav}>
              <Text style={styles.titleTab}>Add Product</Text>
            </View>
            <View>
              <View>
                <TextInput
                  style={{
                    marginTop: 22,
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: 'white',
                    opacity: 0.8,
                    elevation: 7,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}
                  placeholder="Name"
                  onChangeText={text => this.setState({nama: text})}
                />
                <TextInput
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: 'white',
                    opacity: 0.8,
                    elevation: 7,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}
                  placeholder="Description"
                  onChangeText={text => this.setState({description: text})}
                />
                <TextInput
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: 'white',
                    opacity: 0.8,
                    elevation: 7,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}
                  keyboardType="numeric"
                  placeholder="Stock"
                  onChangeText={text => this.setState({stock: text})}
                />

                <TextInput
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: 'white',
                    opacity: 0.8,
                    elevation: 7,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}
                  keyboardType="numeric"
                  placeholder="price"
                  onChangeText={text => this.setState({price: text})}
                />

                <Picker
                  selectedValue={this.state.id_category}
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: '#516f78',
                    opacity: 0.8,
                    width: 100,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 5,
                    height: 40,
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({id_category: itemValue})
                  }>
                  {this.state.category.map(category => {
                    return (
                      <Picker.Item
                        label={category.name_category}
                        value={category.id}
                      />
                    );
                  })}
                </Picker>
                <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                  <View style={styles.upload}>
                    <Text
                      style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginLeft: 120,
                      }}>
                      Upload Image
                    </Text>
                  </View>
                </TouchableOpacity>
                {this.state.avatarSource === null ? (
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      borderWidth: 1,
                      marginLeft: 125,
                    }}
                  />
                ) : (
                  <Image
                    source={{uri: this.state.avatarSource}}
                    style={{height: 100, width: 100, marginLeft: 125}}
                  />
                )}
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({addProduct: false});
                  }}>
                  <View
                    style={{
                      fontSize: 18,
                      borderWidth: 1,
                      backgroundColor: '#bcbcf2',
                      opacity: 0.8,
                      width: 90,
                      marginLeft: 5,
                      borderRadius: 10,
                      margin: 5,
                      height: 40,
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                      }}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
                {this.state.nama.length >= 1 &&
                this.state.description.length >= 1 &&
                this.state.price > 0 &&
                this.state.stock > 0 ? (
                  <TouchableOpacity onPress={() => this.handleAdd()}>
                    <View
                      style={{
                        fontSize: 18,
                        borderWidth: 1,
                        backgroundColor: '#bcbcf2',
                        opacity: 0.8,
                        width: 90,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                        borderRadius: 10,
                        margin: 5,
                        height: 40,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                        }}>
                        Add
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity disabled>
                    <View
                      style={{
                        fontSize: 18,
                        borderWidth: 1,
                        backgroundColor: '#bcbcf2',
                        opacity: 0.8,
                        width: 90,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                        borderRadius: 10,
                        margin: 5,
                        height: 40,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                        }}>
                        Add
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                {/* <TouchableOpacity onPress={() => this.handleAdd()}>
                  <View
                    style={{
                      fontSize: 18,
                      borderWidth: 2,
                      backgroundColor: '#516f78',
                      opacity: 0.8,
                      width: 90,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 5,
                      borderRadius: 10,
                      margin: 5,
                      height: 40,
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                      }}>
                      Add
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

//-------------------------------------------------------------------------------------------------
class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      search: '',
      loading: false,
      error: false,
      handSearch: false,
      addCategory: false,
      name_category: '',
    };
    //this.getTv = _.debounce(this.getTv, 1000);
  }
  componentDidMount() {
    this.getCategory();
    //this.getTv();
  }

  getCategory = async () => {
    console.log('render');
    try {
      const response =
        //await this.props.dispatch(getCategory(y));
        await axios.get(
          'http://192.168.1.181:4002/api/v1/category/',
          //   //'http://api.tvmarze.com/search/shows?q=naruto',
        );
      //console.log(this.props.category.categoryData);
      this.setState({
        result: response.data,
        //this.props.category.categoryData,

        loading: false,
        error: false,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
        error: true,
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

  addCategory = () => {
    axios
      .post(`http://192.168.1.181:4002/api/v1/category/`, {
        name_category: this.state.name_category,
      })
      .then(res => {
        this.getCategory();
        this.setState({addCategory: false});
      });
  };

  render() {
    const {result, loading, error} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
          <Text style={styles.titleTab}>Category List</Text>
          <View style={styles.sectionButton}>
            <TouchableOpacity
              onPress={() => {
                this.setState({addCategory: true});
              }}>
              <View style={styles.button}>
                <Text style={styles.fontLogin}>Add Category</Text>
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
            renderItem={({item}) => (
              <ListCategoryComp data={item} get={this.getCategory} />
            )}
            keyExtractor={item => item.id}
          />
        )}
        <Dialog.Container visible={this.state.addCategory}>
          <Dialog.Title>Add Product</Dialog.Title>
          <Dialog.Input
            onChangeText={text => this.setState({name_category: text})}>
            name category
          </Dialog.Input>
          <Dialog.Button label="Add" onPress={this.addCategory} />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.setState({addCategory: false});
            }}
          />
        </Dialog.Container>
      </SafeAreaView>
    );
  }
}
//---------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    height: 50,
    //backgroundColor: 'grey',
    marginTop: 0,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    elevation: 7,
  },
  titleTab: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'black',
    fontSize: 30,
  },
  titleModal: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'black',
    fontSize: 30,
    alignItems: 'center',
    marginLeft: 100,
  },
  fontLogin: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'black',
    fontSize: 20,
    marginLeft: 30,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
});

//------------------------------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Product" component={product} />
      <Tab.Screen name="Category" component={category} />
    </Tab.Navigator>
  );
}

// const mapStateToProps = ({category}) => {
//   return {
//     category,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     dispatch,
//   };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
