import React, { Component } from "react";
import {View,Text, Alert, TextInput} from "react-native";
import {Header, Left, Icon, Body, Title, Right} from 'native-base';
import { CardSection, SettingInput } from '../components';
import email from 'react-native-email';
import {Ionicons} from '@expo/vector-icons';

export default class Support extends Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;

    return {
      drawerIcon: () => (
        <Ionicons name="ios-call" size={28} style={{ color: 'black' }} />
      ),
      drawerLabel: () => (
        <Text style={{ color: 'black', fontSize: 20 }}>Support</Text>  
      ),
    }
  }

  state = {
    name: '',
    email: '',
    problem: ''
  }

  onSendSuccess() {
    Alert.alert("We will get back to you shortly, Best Regards");

    const to = ['famil.semedli@yahoo.com']
        email(to, {
            subject: 'User ' + this.state.name + ' Needs Help',
            body: this.state.problem
        }).catch(console.error)

    this.setState({ name: '', email: '', problem: '' })
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#97387a"}}>
          <Left style={{ left: 5}}>
            <Icon  name='menu' onPress={() => this.props.navigation.openDrawer()} style={{ color: 'white'}} />
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ color: 'white'}}>Support</Title>
          </Body>
          <Right style={{ right: 5}} >
            <Icon  name='ios-checkmark' onPress={() => this.onSendSuccess()} style={{ color: 'white', fontSize: 42}} />
          </Right>
        </Header>

        <CardSection>
          <SettingInput
          placeholder="Famil Samadli"
          label="Full Name"
          style={{ height: 40, width: 100 }}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
         />
        </CardSection>

       <CardSection>
        <SettingInput
          placeholder="user@gmail.com"
          label="Email"
          style={{ height: 40, width: 100 }}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
       </CardSection>

       <CardSection>
        <TextInput
          {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable = {true}
          maxLength = {1000}
          style={{ fontSize: 18 }}
          multiline = {true}
          placeholder="Write about your problem"
          value={this.state.problem}
          onChangeText={problem => this.setState({ problem })}
       />
       </CardSection>
        
      </View>
    );
  }
}