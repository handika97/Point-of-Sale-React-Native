import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import Axios from 'axios';
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      password: '',
      login: '',
      token: '',
      userData: [],
    };
    //this.getTv = _.debounce(this.getTv, 1000);
  }
  // onChangeValue = e => {
  //   let usernew = {...this.state.loginUser};
  //   usernew[e.target.name] = e.target.value;
  //   this.setState({
  //     loginUser: usernew,
  //   });
  //   console.log(this.state.loginUser.name);
  //   console.log(this.state.loginUser.password);
  // };
  onSubmitButton = () => {
    Axios.post('http://192.168.1.250:4002/api/v1/user/register', {
      nama: this.state.nama,
      password: this.state.password,
    }).then(res => {
      // AsyncStorage.setItem('user', this.state.nama);
    });
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <ImageBackground
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'relative',
          resizeMode: 'center',
          flex: 1,
          width: null,
          height: null,
          justifyContent: 'center',
        }}
        blurType="light"
        //blurAmount={2}
        blurRadius={0.5}
        source={{
          uri:
            'https://ichef.bbci.co.uk/news/410/cpsprodpb/100AA/production/_100860756_gettyimages-635793190.jpg',
        }}>
        <View style={styles.container}>
          <View style={styles.sectionTitle}>
            <Text style={{fontSize: 35, color: 'white', marginTop: 20}}>
              Please Register
            </Text>
          </View>
          <View style={styles.sectionForm}>
            <TextInput
              style={[styles.input, styles.username]}
              placeholder="Username"
              selectionColor="#428AF8"
              name="nama"
              onChangeText={text => this.setState({nama: text})}
            />
            <TextInput
              style={[styles.input, styles.password]}
              secureTextEntry={true}
              password={true}
              placeholder="Password"
              name="password"
              onChangeText={text => this.setState({password: text})}
            />
          </View>
          {this.state.nama.length >= 5 && this.state.password.length >= 5 ? (
            <View style={styles.sectionButton}>
              <TouchableOpacity
                onPress={() => {
                  this.onSubmitButton();
                }}>
                <View style={styles.button}>
                  <Text style={styles.fontLogin}>Register</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.sectionButton}>
              <TouchableOpacity disabled>
                <View style={styles.button}>
                  <Text style={styles.fontLogin}>Register</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View>
            <View style={{marginTop: 30, marginLeft: 270}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <View style={styles.button}>
                  <Text style={{fontSize: 20, color: 'white'}}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // // backgroundColor: '#fffeee',
    // flexDirection: 'column',
    position: 'absolute',
    top: -20,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  sectionTitle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //--------------------------------------LOGIN-----------------------------------------------------
  sectionForm: {
    width: 360,
    height: 200,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    justifyContent: 'center',
    marginTop: 0,
    color: '#ffffff',
    marginVertical: 30,
    borderColor: 'white',
    borderWidth: 0.5,
  },
  sectionButton: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(216,216,176,0.3)',
    color: 'rgba(25,21,60,1)',
    borderRadius: 10,
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  username: {
    marginTop: 0,
    fontWeight: '100',
  },
  password: {
    marginTop: 30,
    fontWeight: '100',
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
  //---------------------SIGHUP----------------------------------------------------------------
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});
