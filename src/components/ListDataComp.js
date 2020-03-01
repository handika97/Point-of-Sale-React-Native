/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, {Component} from 'react';
import Dialog from 'react-native-dialog';
import {
  Modal,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Picker,
  Alert,
} from 'react-native';
import {Content, List, ListItem, Thumbnail, Text} from 'native-base';
// import { withNavigation } from '@react-navigation/compat';
import ImagePicker from 'react-native-image-picker';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';

export default class ListDataComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      detailModal: false,
      dialogDelete: false,
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
  }

  componentDidMount() {
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

  handleEdit = async id => {
    if (this.state.ImageUpload) {
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
      await axios.patch(
        `http://192.168.1.181:4002/api/v1/product/${this.state.id}`,
        dataFile,
      );
    } else {
      Alert.alert('silahkan upload fotonya terlebih dahulu');
    }

    this.props.get();
    this.setState({
      editModal: false,
    });
  };

  deleteProduct = async id => {
    await axios.delete(
      `http://192.168.1.181:4002/api/v1/product/${this.state.id}`,
    );
    this.setState({dialogDelete: false});
    this.props.get();
  };

  detailProduct = async id => {
    const response = await axios.get(
      `http://192.168.1.181:4002/api/v1/product/${id}`,
    );
    this.setState({
      detail: response.data,
    });
  };

  render() {
    let ffile = this.props.data.Image.replace(
      `http://localhost:4002`,
      `http://192.168.1.181:4002`,
    );
    return (
      <View>
        {/* <Content> */}
        <List>
          <ListItem>
            {this.props.data.Image ? (
              <Thumbnail style={styles.photo} source={{uri: `${ffile}`}} />
            ) : (
              <Text>No Image</Text>
            )}

            {/* <Text style={styles.title} note>
              {name}
            </Text> */}
            {/* <Text note>{type}</Text> */}

            <Text style={styles.category} note>
              {this.props.data.nama}
            </Text>

            <View style={styles.containers}>
              <View style={styles.sectionButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      editModal: true,
                      nama: this.props.data.nama,
                      description: this.props.data.description,
                      stock: this.props.data.stock,
                      price: this.props.data.price,
                      id_category: this.props.data.id_category,
                      id: this.props.data.id,
                    });
                  }}>
                  <View style={styles.button}>
                    <Text style={styles.fontLogin}>Edit</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      dialogDelete: true,
                      id: this.props.data.id,
                    });
                  }}>
                  <View style={styles.button}>
                    <Text style={styles.fontLogin}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      detailModal: true,
                      nama: this.props.data.nama,
                      description: this.props.data.description,
                      stock: this.props.data.stock,
                      price: this.props.data.price,
                      id_category: this.props.data.id_category,
                      id: this.props.data.id,
                    });
                  }}>
                  <View style={styles.button}>
                    <Text style={styles.fontLogin}>Detail</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ListItem>
        </List>
        {/* </Content> */}
        {/*---------------------------------------------------------------- */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.editModal}
          style={{}}>
          <View style={{backgroundColor: '#31a349'}}>
            <View>
              <View>
                <TextInput
                  style={{
                    marginTop: 22,
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: '#516f78',
                    opacity: 0.8,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}
                  onChangeText={text => this.setState({nama: text})}>
                  {this.state.nama}
                </TextInput>
                <TextInput
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: '#516f78',
                    opacity: 0.8,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}
                  placeholder="Description"
                  onChangeText={text => this.setState({description: text})}>
                  {this.state.description}
                </TextInput>
                <TextInput
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: '#516f78',
                    opacity: 0.8,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}
                  keyboardType="numeric"
                  placeholder="Stock"
                  onChangeText={text => this.setState({stock: text})}>
                  {this.state.stock}
                </TextInput>
                <TextInput
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: '#516f78',
                    opacity: 0.8,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}
                  keyboardType="numeric"
                  placeholder="price"
                  onChangeText={text => this.setState({price: text})}>
                  {this.state.price}
                </TextInput>
                <Text
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: '#516f78',
                    opacity: 0.8,
                    width: 250,
                    marginLeft: 5,
                    borderRadius: 10,
                    margin: 10,
                    height: 40,
                  }}>
                  Category
                </Text>
                <Picker
                  selectedValue={this.state.id_category}
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: '#516f78',
                    opacity: 0.8,
                    width: 250,
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
                        marginLeft: 5,
                      }}>
                      Upload Image
                    </Text>
                  </View>
                </TouchableOpacity>
                <Image
                  source={{uri: this.state.avatarSource}}
                  style={{height: 100, width: 100}}
                />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({editModal: false});
                  }}>
                  <View
                    style={{
                      fontSize: 18,
                      borderWidth: 2,
                      backgroundColor: '#516f78',
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
                  <TouchableOpacity onPress={() => this.handleEdit()}>
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
                        Edit
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity disabled>
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
                        Edit
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
        {/*------------------------------------------------------------------------------- */}
        {/*---------------------------------------------------------------- */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.detailModal}
          style={{}}>
          <View style={{backgroundColor: '#31a349'}}>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <View>
                <Thumbnail
                  style={{
                    height: 300,
                    width: 300,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                  source={{uri: `${ffile}`}}
                />
                <Text
                  style={{
                    marginTop: 20,
                    marginLeft: 77,
                    fontSize: 20,
                    borderBottomWidth: 1,
                  }}>
                  Name Product: {this.state.nama}
                </Text>

                <Text
                  style={{
                    marginTop: 20,
                    marginLeft: 77,
                    fontSize: 20,
                    borderBottomWidth: 1,
                  }}>
                  Description: {this.state.description}
                </Text>

                <Text
                  style={{
                    marginTop: 20,
                    marginLeft: 77,
                    fontSize: 20,
                    borderBottomWidth: 1,
                  }}>
                  Stock: {this.state.stock}
                </Text>

                <Text
                  style={{
                    marginTop: 20,
                    marginLeft: 77,
                    fontSize: 20,
                    borderBottomWidth: 1,
                  }}>
                  Price: {this.state.price}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({detailModal: false});
                }}>
                <View
                  style={{
                    fontSize: 18,
                    borderWidth: 2,
                    backgroundColor: '#516f78',
                    opacity: 0.8,
                    width: 90,
                    marginLeft: 140,
                    borderRadius: 10,
                    margin: 5,
                    height: 40,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      marginLeft: 3,
                    }}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/*------------------------------------------------------------------------------- */}
        <Dialog.Container visible={this.state.dialogDelete}>
          <Dialog.Title>Delete This Product?</Dialog.Title>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.setState({dialogDelete: false});
            }}
          />
          <Dialog.Button
            label="Delete"
            onPress={() => this.deleteProduct(this.state.id)}
          />
        </Dialog.Container>
      </View>
    );
  }
}

// 2 photos per width

// 2 photos per width
export const styles = StyleSheet.create({
  containers: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    marginTop: 50,
    //justifyContent: 'space-between',
  },
  photo: {
    padding: 10,
    width: 150,
    height: 150,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontFamily: 'FallingSky',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 200,
    marginRight: 5,
    marginLeft: -100,
  },
  category: {
    marginTop: 200,
    marginBottom: 0,
    marginLeft: -150,
    width: 200,
  },
  sectionButton: {
    flex: 1,
    alignItems: 'center',
  },
  modalButton: {
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#A9ADAE',
  },
});
