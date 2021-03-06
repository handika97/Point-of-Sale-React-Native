import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import Axios from 'axios';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      password: '',
      login: '',
      token: '',
      userData: [],
      loading: true,
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
  onSubmitButton = async () => {
    await Axios.post('http://3.83.117.59:4004/api/v1/user', {
      nama: this.state.nama,
      password: this.state.password,
    }).then(res => {
      let token = res.data.token;
      this._storeData(token);
      // AsyncStorage.setItem('user', this.state.nama);
      this.props.navigation.navigate('HomeScreens');
    });
  };
  _storeData = async token => {
    try {
      await AsyncStorage.setItem('status', token);
      await AsyncStorage.setItem('user', this.state.nama);
    } catch (error) {
      console.log('gagal');
    }
  };
  componentDidMount = async () => {
    if ((await AsyncStorage.getItem('status')) !== null) {
      this.props.navigation.navigate('HomeScreens');
    } else {
      this.setState({loading: false});
    }
  };
  render() {
    return (
      <View style={styles.container}>
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
          {this.state.loading === true ? (
            <View style={styles.sectionTitle}>
              <Image
                source={require('../image/coffee.png')}
                style={{height: 100, width: 100, marginTop: 130}}
              />
              <Text style={{fontSize: 50, color: 'white'}}>CaFeTa</Text>
            </View>
          ) : (
            <View>
              <View style={styles.sectionTitle}>
                <Image
                  source={require('../image/coffee.png')}
                  style={{height: 100, width: 100, marginTop: 200}}
                />
                <Text style={{fontSize: 50, color: 'white'}}>CaFeTa</Text>
              </View>
              <View style={styles.sectionForm}>
                <TextInput
                  style={[styles.input, styles.username]}
                  placeholder="Username"
                  selectionColor="#428AF8"
                  name="nama"
                  value={this.state.nama}
                  onChangeText={text => this.setState({nama: text})}
                />
                <TextInput
                  style={[styles.input, styles.password]}
                  placeholder="Password"
                  secureTextEntry={true}
                  password={true}
                  type="password"
                  name="password"
                  onChangeText={text => this.setState({password: text})}
                />
              </View>
              {this.state.nama.length >= 5 &&
              this.state.password.length >= 5 ? (
                <View style={styles.sectionButton}>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSubmitButton();
                    }}>
                    <View style={styles.button}>
                      <Text style={styles.fontLogin}>LOGIN</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.sectionButton}>
                  <TouchableOpacity disabled>
                    <View style={styles.button}>
                      <Text style={styles.fontLogin}>LOGIN</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={styles.signupButton}> Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // // backgroundColor: '#fffeee',
    // flexDirection: 'column',
    position: 'absolute',
    top: 0,
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
    marginTop: 200,
    color: '#ffffff',
    marginVertical: 30,
    borderColor: 'white',
    borderWidth: 0.5,
  },
  sectionButton: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    marginTop: 420,
    marginLeft: 135,
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
    backgroundColor: 'rgba(255, 255,255,0.2)',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    marginTop: 30,
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
    marginTop: 102,
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
