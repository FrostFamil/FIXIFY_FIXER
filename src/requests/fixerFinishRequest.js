import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';


const fixerAddFinishedRequestToHistory = (acceptor) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.89:8080/requests/getAllHistoriesOfFixer',
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
    fixerAddFinishedRequestToHistory
};