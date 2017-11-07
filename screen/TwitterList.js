import React, {PureComponent} from 'react';
import {ListView, View, Text, StyleSheet, TouchableOpacity,RefreshControl} from 'react-native';
import WebViewScreen from './WebViewScreen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment'
import _ from 'lodash'


let tweetArray = [];
let dataMap = {};
let dataMapArray = [];
let externalListDataSource;
let renderedSectionData = '';

export default class BooksList extends PureComponent<> {

    constructor(props) {
        super(props);
        externalListDataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.guid != r2.guid,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            dataSource: dataMapArray,
            isLoading: true,
            isRefreshing:true
        };

    }


    componentWillMount() {
        this.getTweets(function (json) {
            this.createArray(json);
        }.bind(this));
    }

    createArray = (json) =>{
        tweetArray = json;
        let sortedTweetArray = tweetArray.sort((firstObject, secondObject) => {
            var firstObjDate = Moment(firstObject.pubDate, "Do-MMM-YYYY").format('YYYY-MM-DD');
            var secondObjDate = Moment(secondObject.pubDate, "Do-MMM-YYYY").format('YYYY-MM-DD');
            var firstDateObj = new Date(firstObjDate);
            var secondDateObj = new Date(secondObjDate);


            return Number(secondDateObj.getTime()) - Number(firstDateObj.getTime());
        });


        var that = this;

        dataMap = {};

        sortedTweetArray.forEach(function (tobject) {
            that.addKeyIfDoesNotExists(tobject)
        });

        dataMapArray = _.reduce(dataMap, (acc, next, index) => {
            acc.push({
                key: index,
                data: next
            });
            return acc;
        }, []);

        this.setState({
            dataSource: dataMapArray,
            isLoading: false,
            isRefreshing:false
        })
    };

    addKeyIfDoesNotExists = function (dataObject) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var pubDate = Moment(dataObject.pubDate, "Do-MMM-YYYY").format('YYYY-MM-DD');
        var pubDateObj = new Date(pubDate);
        var dataKey = monthNames[pubDateObj.getMonth()] + "_" + pubDateObj.getYear();
        var existingData = dataMap[dataKey];
        if (existingData) {
            existingData.push(dataObject)
        } else {
            existingData = [];
            existingData.push(dataObject);
            dataMap[dataKey] = existingData;
        }
    };

    getTweets(callback) {
        let url = "https://mcnam.ee/api/index.php?type=twitter";
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(json => callback(json))
            .catch(error => console.warn("error", error));
    }

    static navigationOptions = ({navigation}) => ({
        tabBarLabel:'Twitter',
        title: 'Social Feeds',
        headerLeft: <MaterialIcons
            name={"menu"}
            size={24}
            style={{color: '#fff'}}
            onPress={() => navigation.navigate('DrawerOpen')}
        />,
        headerStyle: {
            backgroundColor: '#2196F3'
        },
        headerTitleStyle: {
            color: '#fff'
        },
        drawerLabel: 'Social Feeds',
    });


    _root: ?ListView;

    _renderRow = (data) => {
        return (
            <View style={styles.row}>
                <TouchableOpacity style={{flexDirection: 'row'}}
                                  onPress={() => this.props.navigation.navigate('WebViewScreen', {
                                      url: data.url,
                                      titleName: 'Books'
                                  })}>
                    <View style={{flexDirection: 'row'}}>

                        <View style={{width: 200, alignContent: 'center', alignItems: 'center'}}>

                            <Text style={styles.text}>{data.content}</Text>
                            <Text style={[styles.text, {marginTop: 5,}]}>{data.pubDate}</Text>

                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    renderItem = (item, sectionData) => {

        if (renderedSectionData == sectionData) {
            return null;
        } else {
            renderedSectionData = sectionData;
            return (
                <ListView
                    {...this.props}
                    removeClippedSubviews={false}
                    contentContainerStyle={styles.scrollViewStyle}
                    dataSource={externalListDataSource.cloneWithRows(dataMap[sectionData])}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    automaticallyAdjustContentInsets={true}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    ref={(el: ?ListView) => (this._root = el)}
                />
            );
        }
    };

    renderSectionHeader = function (sectionData, category) {
        return (
            <View>
                <Text style={{fontWeight: "700", fontSize: 15}}>{category.split('_')[0]}</Text>
            </View>
        )
    };

    handleRefresh = () => {
        this.setState({
            isRefreshing: true,
        }, () => {
            this.getTweets(function (json) {
                this.createArray(json);
            }.bind(this));
        })
    };


    render() {
        return (
            <ListView
                {...this.props}
                removeClippedSubviews={false}
                contentContainerStyle={{flexDirection: 'column'}}
                dataSource={externalListDataSource.cloneWithRowsAndSections(dataMap)}
                renderSectionHeader={this.renderSectionHeader}
                automaticallyAdjustContentInsets={true}
                renderRow={this.renderItem}
                enableEmptySections={true}
                ref={(el: ?ListView) => (this._root = el)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.handleRefresh}
                    />
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flexDirection: 'column'
    },
    row: {
        margin: 8,
        padding: 5,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 0, 0,1)',
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        flex: 1
    },
    scrollViewStyle: {
        flexDirection: 'row',
    }
});