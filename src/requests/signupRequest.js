import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const signupRequest = (email, password, firstName, lastName,status, phone) => {
    return axios({
    method: 'put',
    url: 'http://192.168.0.89:8080/auth/fixerSignup',
    data: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        status: status,
        phone: phone
    }
    })
    .then(response => {
        if (response.data.userId){
            return response.data.userId;
        }
    }, error => {
        console.log(error);
    });
}

export default signupRequest;