import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';


const fixerAddFinishedRequestToHistory = (acceptor) => {
    return axios({
    method: 'post',
    url: 'http://localhost:8080/requests/getAllHistoriesOfFixer',
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