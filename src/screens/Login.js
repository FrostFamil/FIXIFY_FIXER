import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import loginRequest from '../requests/loginRequest';

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    if(email === '' || password === ''){
        errors.push("email");
        errors.push("password");
        this.setState({ errors, loading: false });
    }else{
      loginRequest(email, password).then(res => {
        if(res === undefined){
        errors.push("email");
        errors.push("password");
        this.setState({ errors, loading: false })
        }            
        else if(res.token){
          global.fixerId = res.fixerId; 
          this.props.navigation.navigate('home');
          this.setState({ errors, loading: false, email: '', password: '' });
        };
      });
    }
    
  }

  handleRegister = () => {
    this.props.navigation.navigate('register');
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <ImageBackground source={require('../../assets/UsedPhotos/Login.jpg')} style={{width: '100%', height: '100%'}}>
            <Block padding={[0, theme.sizes.base * 2]}>
            <Text center white bold style={{top: 40, fontSize: 40}}>
                Fixify
            </Text>
            <Block middle>
                <Input
                label="Email"
                placeholder="user@email.com"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                />
                <Input
                secure
                label="Password"
                placeholder="password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                />
                <Button color='#681f51' onPress={() => this.handleLogin()}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text bold white center style={{ fontSize: 18 }}>
                    Login
                    </Text>
                )}
                </Button>

                <Button white onPress={() => this.handleRegister()}>
                    <Text bold center style={{ fontSize: 18, color: '#98377a' }}>
                    Register
                    </Text>
                </Button>
            </Block>
            </Block>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});