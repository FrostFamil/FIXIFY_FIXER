import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const updateFixersLoc = (postId, fixerId, latitude, longitude) => {
    return axios({
    method: 'put',
    url: 'http://192.168.0.87:8080/fixersLocation/updateFixersLoc',
    data: {
        postId: postId,
        fixerId: fixerId,
        latitude: latitude,
        longitude: longitude
    }
    })
    .then(response => {
        if (response.data){
            return response.data;
        }
    }, error => {
        console.log(error);
    });
}

const addFixersLoc = (latitude, longitude, fixerId) => {
    return axios({
    method: 'put',
    url: 'http://192.168.0.87:8080/fixersLocation/addFixersLoc',
    data: {
        latitude: latitude,
        longitude: longitude,
        fixerId: fixerId
    }
    })
    .then(response => {
        if (response.data){
            return response.data;
        }
    }, error => {
        console.log(error);
    });
}

const getFixersPreviousLoc = (fixerId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/fixersLocation/getFixersPreviousLoc',
    data: {
        fixerId: fixerId
    }
    })
    .then(response => {
        if (response.data){
            return response.data;
        }
    }, error => {
        console.log(error);
    });
}

export{
    updateFixersLoc,
    addFixersLoc,
    getFixersPreviousLoc
}