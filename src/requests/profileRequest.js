import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const profileRequest = (fixerId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.88:8080/auth/fixerProfile',
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

const getUserProfileRequest = (userId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.88:8080/auth/profile',
    data: {
        userId: userId
    }
    })
    .then(response => {
        return response.data.user;
    }, error => {
        console.log(error);
    });
}

export {profileRequest, getUserProfileRequest};