import React, {Component} from 'react';
import Dialog from 'react-native-dialog';
import {Modal, Button, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Content, List, ListItem, Thumbnail, Text, Image} from 'native-base';
// import { withNavigation } from '@react-navigation/compat';

export default class ListCartComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
    };
  }

  add = () => {
    //let add=this.state.qty + 1
    this.setState({
      qty: this.state.qty + 1,
    });

    console.log(this.state.qty);
    this.props.Total(parseInt(this.props.data.price));
  };

  subtract = () => {
    this.setState({
      qty: this.state.qty - 1,
    });
    console.log(this.state.qty);
    if (this.state.qty >= 1) {
      this.props.Total(parseInt(-this.props.data.price));
    }
  };
  render() {
    console.log(this.props.data.Image);
    let file = this.props.data.Image.replace(
      `http://3.83.117.59:4004`,
      `http://3.83.117.59:4004`,
    );
    let price = this.props.data.price * this.state.qty;
    return (
      <View>
        {/* <Content> */}
        <List>
          <ListItem style={styles.containers}>
            {this.props.data.Image ? (
              <Thumbnail
                style={styles.photo}
                source={{uri: `${this.props.data.Image}`}}
              />
            ) : (
              <Text>No Image</Text>
            )}

            {/* <Text style={styles.title} note>
              {name}
            </Text> */}
            {/* <Text note>{type}</Text> */}

            <Text style={styles.category} note>
              {this.props.data.name}
            </Text>
            <View style={styles.containers_item}>
              <View style={styles.containers}>
                <View style={styles.sectionButton}>
                  <TouchableOpacity onPress={this.subtract}>
                    <View style={styles.button}>
                      <Text style={styles.fontLogin}>-</Text>
                      {this.props.Qty(this.state.qty, this.props.data.id)}
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.sectionButton}>
                  <View style={styles.button}>
                    <Text style={styles.fontLogin}>{this.state.qty}</Text>
                  </View>
                </View>
                <View style={styles.sectionButton}>
                  <TouchableOpacity onPress={this.add}>
                    <View style={styles.button}>
                      <Text style={styles.fontLogin}>+</Text>
                      {this.props.Qty(this.state.qty, this.props.data.id)}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.fontPrice}>Rp. {price}</Text>
            </View>
          </ListItem>
        </List>
        {/* </Content> */}
      </View>
    );
  }
}

// 2 photos per width

// 2 photos per width
export const styles = StyleSheet.create({
  containers: {
    flexDirection: 'row',
    margin: 0,
    marginTop: -30,
    marginBottom: 40,
    // flex: 1,
    // width: 150,
    //height: 150 + 75,
    // margin: 10,
    // borderColor: '#cccccc',
    // borderWidth: 0.5,
    // borderRadius: 15,
    // marginTop: -20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containers_item: {
    flex: 1,
    flexDirection: 'row',
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
  fontLogin: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
  },
  fontPrice: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: -120,
    marginTop: 40,
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
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
  },
  modalButton: {
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#A9ADAE',
  },
});
