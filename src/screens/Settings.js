import React, { Component } from "react";
import {View,Text, Image} from "react-native";
import {Header, Left, Icon, Body, Title, Right} from 'native-base';
import { CardSection, SettingInput } from '../components';
import {MaterialIcons} from '@expo/vector-icons';
import {profileRequest, updateFixerProfileRequest} from '../requests/profileRequest';

export default class Settings extends Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;

    return {
      drawerIcon: () => (
        <MaterialIcons name="settings" size={27} style={{ color: 'black' }} />
      ),
      drawerLabel: () => (
        <Text style={{ color: 'black', fontSize: 20 }}>Settings</Text>  
      ),
    }
  }

  constructor(props) {
    super(props);

    this.state = { 
      fName: '', 
      lName: '', 
      email: '',  
      phone: '',
      status: '',
      fixerId: ''
    };
  }

  componentDidMount() {
    this.setState({ fixerId: global.fixerId }, () => {

      const {fixerId} = this.state
      profileRequest(fixerId).then(res => {
        this.setState({
          fName: res.firstName,
          lName: res.lastName,
          email: res.email,
          phone: res.phone,
          status: res.status
        });  
      });
      
    });
  }

  updateProfile = () => {
    const { fName, lName, email, phone, fixerId } = this.state;

    updateFixerProfileRequest(fixerId, fName, lName, email, phone).then(() => {
      profileRequest(fixerId).then(res => {
        this.setState({
          fName: res.firstName,
          lName: res.lastName,
          email: res.email,
          phone: res.phone,
          status: res.status
        });  
      });    
    })
    
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#97387a"}}>
          <Left style={{ left: 5}}>
            <Icon  name='menu' onPress={() => this.props.navigation.openDrawer()} style={{ color: 'white'}} />
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ color: 'white'}}>Settings</Title>
          </Body>
          <Right style={{ right: 5}}>
            <Icon  name='ios-checkmark' style={{ color: 'white', fontSize: 42}} onPress = {() => this.updateProfile()} />
          </Right>
        </Header>

        <CardSection>
         <Image
         source={require('../../assets/Icons/photo.png')}
         style={styles.ImageIconStyle}
         />
        </CardSection>

        <CardSection>
          <SettingInput
          placeholder="Famil"
          label="First Name:"
          testID="fname"
          value={this.state.fName}
          onChangeText={text => this.setState({ fName: text })}
          style={{ height: 40, width: 100 }}
         />
        </CardSection>

        <CardSection>
          <SettingInput
          placeholder="Samadli"
          label="Last Name:"
          testID="lname"
          value={this.state.lName}
          onChangeText={text => this.setState({ lName: text })}
          style={{ height: 40, width: 100 }}
         />
        </CardSection>

       <CardSection>
        <SettingInput
          placeholder="user@gmail.com"
          label="Email:"
          testID="email"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          style={{ height: 40, width: 100 }}
        />
       </CardSection>

       <CardSection>
        <SettingInput
           placeholder="+(Country code) 50-465-34-43"
           label="Phone:"
           testID="phone"
           value={this.state.phone}
           onChangeText={text => this.setState({ phone: text })}
        />
       </CardSection>

       <CardSection>
        <SettingInput
           placeholder="Technology"
           label="Service Type:"
           value={this.state.status}
        />
       </CardSection>

      </View>
    );
  }
}


const styles = {
  ImageIconStyle: {
    padding: 0,
    margin: 5,
    height: 80,
    width: 80,
    resizeMode: 'stretch',
  },
};