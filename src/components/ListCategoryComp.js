/* eslint-disable quotes */
import React, {Component} from 'react';
import Dialog from 'react-native-dialog';
import Axios from 'axios';
import {Modal, Button, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Content, List, ListItem, Thumbnail, Text, Image} from 'native-base';
// import { withNavigation } from '@react-navigation/compat';

export default class ListDataComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogvisible: false,
      dialogDelete: false,
      name_category: '',
      id: '',
    };
  }

  editCategory = () => {
    Axios.patch(`http://192.168.1.181:4002/api/v1/category/${this.state.id}`, {
      name_category: this.state.name_category,
    }).then(res => {
      this.props.get();
      this.setState({dialogvisible: false});
    });
  };

  deleteCategory = () => {
    Axios.delete(
      `http://192.168.1.181:4002/api/v1/category/${this.state.id}`,
    ).then(res => {
      this.props.get();
      this.setState({dialogDelete: false});
    });
  };

  render() {
    console.log(this.state.name_category);
    return (
      <View>
        <List>
          <ListItem style={styles.container}>
            <Text style={styles.title} note>
              {this.props.data.id}. {this.props.data.name_category}
            </Text>
            {/* <Text note></Text>
              <Text note> {this.props.data.name_Category}</Text> */}
            <View style={styles.containers}>
              <View style={styles.sectionButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      dialogvisible: true,
                      id: this.props.data.id,
                      name_category: this.props.data.name_category,
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
            </View>
          </ListItem>
        </List>

        {/* <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.dialogvisible}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setState({dialogvisible: false});
                }}>
                <View style={(styles.button, styles.modalButton)}>
                  <Text style={styles.fontLogin}>Detail</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        <Dialog.Container visible={this.state.dialogvisible}>
          <Dialog.Title>Edit Product</Dialog.Title>
          <Dialog.Input
            onChangeText={text => this.setState({name_category: text})}>
            {this.props.data.name_category}
          </Dialog.Input>
          <Dialog.Button label="Edit" onPress={this.editCategory} />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.setState({dialogvisible: false});
            }}
          />
        </Dialog.Container>
        <Dialog.Container visible={this.state.dialogDelete}>
          <Dialog.Title>Delete This Category?</Dialog.Title>
          <Dialog.Button label="Delete" onPress={this.deleteCategory} />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.setState({dialogDelete: false});
            }}
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
    flexDirection: 'row',
    margin: 50,
    marginTop: 50,
    //justifyContent: 'space-between',
  },
  container: {
    marginTop: -10,
  },
  title: {
    fontFamily: 'FallingSky',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
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
