import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const profileRequest = (fixerId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.89:8080/auth/fixerProfile',
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
    url: 'http://192.168.0.89:8080/auth/profile',
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

const updateFixerProfileRequest = (fixerId, fName, lName, email, phone) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.89:8080/auth/updateFixerProfile',
    data: {
        fixerId: fixerId,
        fName: fName,
        lName: lName,
        email: email,
        phone: phone
    }
    })
    .then(response => {
        return response;
    }, error => {
        console.log(error);
    });
}

export {profileRequest, getUserProfileRequest, updateFixerProfileRequest};