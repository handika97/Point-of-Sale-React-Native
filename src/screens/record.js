/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Picker,
  Alert,
  Image,
} from 'react-native';
import moment from 'moment';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native-gesture-handler';
import Axios from 'axios';
import {styles} from '../components/ListDataComp';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

class History extends Component {
  constructor() {
    super();
    this.state = {
      id_category: 1,
      avatarSource: null,
      items: [],
      history: [],
      record: '',
      loading: false,
    };
  }
  record = async () => {
    await Axios.get('http://192.168.1.181:4002/api/v1/shop/').then(response => {
      this.setState({
        record: response.data[0],
      });
    });
  };

  componentDidMount() {
    this.record();

    // if (localStorage.getItem("status")) {
    //   if (window.location.href === "http://localhost:3000/home/history") {
    //   } else {
    //     window.location.href = "http://localhost:3000/home/history";
    //     console.log("berhasil");
    //   }
    // } else {
    //   console.log("gagal");
    //   window.location.href = "http://localhost:3000/login";
    // }
  }
  render() {
    return (
      <View style={stylesd.container_all}>
        <View style={stylesd.title}>
          <Text style={{fontSize: 50, marginLeft: 30}}>RECORD</Text>
        </View>
        <View style={stylesd.container}>
          <View style={stylesd.record}>
            <Text style={{marginTop: 20, marginLeft: 70, fontSize: 18}}>
              This Year's Income
            </Text>
            <Text style={{marginLeft: 70, fontSize: 18}}>
              Rp. {this.state.record.year_omzet}
            </Text>
          </View>
          <View style={stylesd.record}>
            <View style={stylesd.item}>
              <Text style={{fontSize: 18}}>Today Income</Text>
              <Text style={{fontSize: 18}}>
                Rp. {this.state.record.income_today}
              </Text>
              <View style={{marginLeft: 100}}>
                <Text style={{fontSize: 18}}>Persentase Day Omzet</Text>
                <Text style={{fontSize: 18}}>
                  {this.state.record.persentaseDay_omzet}% Yesterday
                </Text>
              </View>
            </View>
          </View>
          <View style={stylesd.record}>
            <View style={stylesd.item}>
              <Text style={{fontSize: 18}}>Order Week</Text>
              <Text style={{fontSize: 18}}>
                {this.state.record.order_week} Order
              </Text>
              <View style={{marginLeft: 100}}>
                <Text style={{fontSize: 18}}>Persentase Week Order</Text>
                <Text style={{fontSize: 18}}>
                  {this.state.record.persentaseWeek_order}% Last Week
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
//-------------------------------------------------------------------------------------------------------
class Record extends Component {
  constructor() {
    super();
    this.state = {
      id_category: 1,
      avatarSource: null,
      items: [],
      history: [],
      record: '',
      loading: false,
    };
  }

  history = async () => {
    await Axios.get('http://192.168.1.181:4002/api/v1/shop/history').then(
      response => {
        console.log(response.data);

        this.setState({
          history: response.data,
        });
      },
    );
  };
  items = id => {
    Axios.get(`http://192.168.1.181:4002/api/v1/shop/history/${id}`).then(
      response => {
        console.log(response.data);

        this.setState({
          items: response.data,
        });
      },
    );
    console.log(id);
  };
  componentDidMount() {
    this.history();
    // if (localStorage.getItem("status")) {
    //   if (window.location.href === "http://localhost:3000/home/history") {
    //   } else {
    //     window.location.href = "http://localhost:3000/home/history";
    //     console.log("berhasil");
    //   }
    // } else {
    //   console.log("gagal");
    //   window.location.href = "http://localhost:3000/login";
    // }
  }
  render() {
    console.log(this.state.history);
    return (
      <View style={stylesd.container_all}>
        <View style={stylesd.title}>
          <Text style={{fontSize: 50, marginLeft: 30}}>HISTORY</Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', margin: 5, borderBottomWidth: 1}}>
            <Text style={{fontSize: 20, margin: 7}}>#</Text>
            <Text style={{fontSize: 20, margin: 7, marginLeft: 20}}>
              Cashier
            </Text>
            <Text style={{fontSize: 20, margin: 7, marginLeft: 20}}>Price</Text>
            <Text style={{fontSize: 20, margin: 7, marginLeft: 20}}>Date</Text>
          </View>
          {/* <FlatList vertical showsVerticalScrollIndicator={true}> */}
          <ScrollView>
            {this.state.history.map((history, i) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 5,
                    borderBottomWidth: 1,
                  }}>
                  <Text style={{fontSize: 20, margin: 7}}>{i + 1}</Text>
                  <Text style={{fontSize: 20, margin: 7}}>{history.user}</Text>
                  <Text style={{fontSize: 20, margin: 7}}>{history.price}</Text>
                  <Text style={{fontSize: 20, margin: 7}}>
                    {moment(history.timeFinal).format('D MMMM YYYY')}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
          {/* </FlatList> */}
        </View>
      </View>
    );
  }
}
//-------------------------------------------------------------------------------------------------------
const stylesd = StyleSheet.create({
  container_all: {
    flex: 1,
    width: 370,
    height: 1000,
    backgroundColor: '#bdd9d6',
  },
  container: {
    flexDirection: 'column',
    color: 'white',
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: 30,
    marginLeft: 25,
    marginTop: 0,
    width: 300,
    height: 500,
  },
  title: {
    width: 250,
    borderWidth: 1,
    borderColor: 'grey',
    borderBottomColor: 'blue',
    backgroundColor: '#0384fc',
    borderBottomEndRadius: 10,
  },
  record: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 280,
    height: 120,
    borderBottomStartRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#a9c7b1',
    margin: 5,
  },
  history: {
    flexDirection: 'row',
  },
});

//------------------------------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Record" component={History} />
      <Tab.Screen name="History" component={Record} />
    </Tab.Navigator>
  );
}
export default App;
