const slides = [
  {
    key: 's1',
    text: 'Cart',
    title: 'product',
    image: require('../image/cart.png'),
    backgroundColor: '#1ef70f',
  },
  {
    key: 's2',
    title: 'Data',
    text: 'data',
    image: require('../image/data.png'),
    backgroundColor: '#f7f70f',
  },
  {
    key: 's3',
    title: 'Record',
    text: 'record',
    image: require('../image/garp.png'),
    backgroundColor: '#9e1616',
  },
  {
    key: 's4',
    title: 'Login',
    text: 'Logout',
    image: require('../image/logout.png'),
    backgroundColor: '#34b7eb',
  },
];

/*This is an example of React Native App Intro Slider */
import React from 'react';
//import react in project
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Slider,
  AsyncStorage,
} from 'react-native';
//import all the required component
import AppIntroSlider from 'react-native-app-intro-slider';
//import AppIntroSlider to use it
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      //To show the main page of the app
    };
  }

  _onDone = () => {
    this.setState({showRealApp: true});
  };
  _onSkip = () => {
    this.setState({showRealApp: true});
  };

  _renderItem = ({item}) => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(
                `${item.title}`,
                item.title === 'Login' ? AsyncStorage.clear() : null,
              );
            }}
            // {item.title=='Login' ? (AsyncStorage.clear()):null}
          >
            <View style={styles.button}>
              <Text style={styles.fontLogin}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      //console.log(AsyncStorage.getItem('status'));
      return (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 50,
          }}>
          {/* <TouchableOpacity
            onPress={() => {
               navigate('Home');
            }}>
            <View style={styles.button}>
              <Text style={styles.fontLogin}>Login</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      );
    } else {
      //Intro slides

      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this._onDone}
          navigation={this.props.navigation}
          //showSkipButton={true}
          //onSkip={this._onSkip}

          bottomButton
        />
        /* <TouchableOpacity
            onPress={() => {
              props.navigation.push('Home');
            }}>
            <View style={styles.button}>
              <Text style={styles.fontLogin}>Login</Text>
            </View>
          </TouchableOpacity> */
      );
    }
  }
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionButton: {
    flex: 3,
    alignItems: 'center',
  },
  button: {
    width: 100,
    //backgroundColor: 'rgba(255, 255,255,0.2)',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontLogin: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 120,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    left: 30,
    right: 30,
    opacity: 0.5,
    borderRadius: 10,
  },
});
