import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const getPushTokens = (userId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.88:8080/notification/getUsersToken',
    data: {
        userId: userId
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default getPushTokens;