import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const profileRequest = (fixerId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/auth/fixerProfile',
    data: {
        fixerId: fixerId
    }
    })
    .then(response => {
        return response.data.fixer;
    }, error => {
        console.log(error);
    });
}

export default profileRequest;