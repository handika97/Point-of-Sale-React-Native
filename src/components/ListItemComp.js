import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Content, List, ListItem, Thumbnail, Text} from 'native-base';
// import { withNavigation } from '@react-navigation/compat';

export default class ListItemComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let file = this.props.data.Image.replace(
      `http://localhost:4002`,
      `http://192.168.1.181:4002`,
    );
    return (
      <View>
        <Content>
          <List>
            <ListItem style={styles.containers}>
              {this.props.data.Image ? (
                <TouchableOpacity
                  onPress={() => {
                    this.props.cart(this.props.data);
                  }}>
                  <Thumbnail style={styles.photo} source={{uri: `${file}`}} />
                </TouchableOpacity>
              ) : (
                <Text>No Image</Text>
              )}

              {/* <Text style={styles.title} note>
              {name}
            </Text> */}
              {/* <Text note>{type}</Text> */}
              <View style={styles.container_item}>
                <Text style={styles.title}>{this.props.data.nama}</Text>
              </View>
              <Text style={styles.price}>{this.props.data.price}</Text>
            </ListItem>
          </List>
        </Content>
      </View>
    );
  }
}

// 2 photos per width
export const styles = StyleSheet.create({
  containers: {
    flex: 1,
    width: 150,
    height: 150 + 75,
    margin: 10,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: 'center',
  },
  container_item: {
    flexDirection: 'column',
  },
  photo: {
    width: 150,
    height: 150,
    marginTop: -75,
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
    marginTop: 100,
    marginRight: 5,
    marginLeft: -200,
  },
  price: {
    marginTop: 200,
    marginBottom: 0,
    marginLeft: -50,
  },
  nama: {
    marginTop: -50,
    marginBottom: 0,
    marginLeft: -50,
    width: 50,
  },
});
