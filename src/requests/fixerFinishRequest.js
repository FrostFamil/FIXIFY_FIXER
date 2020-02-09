import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const fixerFinishRequest = (requestIndex) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/requests/fixerFinishRequest',
    data: {
        requestIndex: requestIndex
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

const fixerAddFinishedRequestToHistory = (acceptor) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/requests/getAllHistoriesOfFixer',
    data: {
        acceptor: acceptor
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export {
    fixerFinishRequest, 
    fixerAddFinishedRequestToHistory
};