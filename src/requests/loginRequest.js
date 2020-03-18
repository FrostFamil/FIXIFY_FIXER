import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const loginRequest = (email, password) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.88:8080/auth/fixerLogin',
    data: {
        email: email,
        password: password
    }
    })
    .then(response => {
        return response.data
    }, error => {
        console.log(error);
    });
}

export default loginRequest;