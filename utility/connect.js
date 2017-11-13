import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';



export default class connect extends Component{
constructor(props){
    super(props);
    this.state={
        getBooks:function(callback){
            let url = "https://mcnam.ee/api/index.php?type=goodreads";
            fetch(url)
                .then(response => {
                    return response.json()
                })
                .then(json => callback(json))
                .catch(error => console.warn("error", error));
        },
        getTweets:function(callback){
            let url = "https://mcnam.ee/api/index.php?type=twitter";
            fetch(url)
                .then(response => {
                    return response.json()
                })
                .then(json => callback(json))
                .catch(error => console.warn("error", error));
        },
        
    }
}
}