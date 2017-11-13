import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity, RefreshControl} from 'react-native'
import React, {PureComponent} from 'react'
import { SceneMap} from 'react-native-tab-view';
import WebViewScreen from './WebViewScreen'
import StarRating from 'react-native-star-rating'
import TwitterList from './TwitterList'
import Moment from 'moment';
import connect from '../utility/connect';


const SecondRoute = () => <TwitterList/>;

type State = {
    bookArray: Array<number>,
    dataSource: ListView.DataSource,
};

let bookArray = [];

export default class SecondScreen extends PureComponent<{}, State> {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid});
        this.state = {
            dataSource: dataSource.cloneWithRows(bookArray),
            isLoading: true,
            isRefreshing: true
        };

    }

    componentWillMount() {
        con=new connect();
        con.state.getBooks(function (json) {
            this.createArray(json);
        }.bind(this));
    }

    createArray = (json) => {
        bookArray = json;

        let sortedBookArray = bookArray.sort((firstObject, secondObject) => {
            var firstDate = Moment(firstObject.date_added, "Do-MMM-YYYY").format('YYYY-MM-DD');
            var secondDate = Moment(secondObject.date_added, "Do-MMM-YYYY").format('YYYY-MM-DD');

            return Number(new Date(secondDate).getTime()) - Number(new Date(firstDate).getTime());
        });

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(sortedBookArray),
            isLoading: false,
            isRefreshing: false
        })
    };

    _root: ?ListView;

    _renderStar = (data) => {
        let bookRating = parseInt(data.rating, 10);
        if (bookRating > 0) {
            return (
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={bookRating}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    starColor={'blue'}
                    starSize={20}
                />
            );
        } else {
            return null;
        }
    };

    scrollTo = (...args: any) => this._root && this._root.scrollTo(...args);
    
    _renderScene = SceneMap({
        '1': () => <ListView
            {...this.props}
            removeClippedSubviews={false}
            contentContainerStyle={styles.container}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            enableEmptySections={true}
            ref={(el: ?ListView) => (this._root = el)}
        />,
        '2': SecondRoute,
    });

    _renderRow = (data) => {
        return (
            <View style={styles.row}>
                <TouchableOpacity style={{flexDirection: 'row'}}
                                  onPress={() => this.props.navigation.navigate('WebViewScreen', {
                                      url: data.link,
                                      titleName: 'Books'
                                  })}>
                    <View style={{flexDirection: 'row'}}>

                        <View style={{flex: 1}}>

                            <Text style={styles.text}>{data.title}</Text>
                            <Text style={[styles.text, {marginTop: 4}]}>{data.author}</Text>

                            <View style={{
                                flexDirection: 'row',
                                position: 'absolute',
                                bottom: 0
                            }}>
                                <Text style={styles.text}>{data.date_added}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                position: 'absolute',
                                bottom: 0,
                                alignItems: 'flex-end',
                                flex: 1,
                                right: 7
                            }}>
                                {this._renderStar(data)}
                            </View>
                        </View>

                        <Image
                            source={{
                                uri: data.image_url,
                            }}
                            style={{width: 70, height: 100, resizeMode: 'stretch'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    static navigationOptions = ({navigation}) => ({
        tabBarLabel: 'Books',
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
        drawerLabel: 'Social Feeds'
    });

    handleRefresh = () => {
        this.setState({
            isRefreshing: true,
        }, () => {
            con=new connect();
            con.state.getBooks(function (json) {
                this.createArray(json);
            }.bind(this));
        })
    };

    render() {
        return (
            <View style={styles.appContainer}>
                <ListView
                    {...this.props}
                    removeClippedSubviews={false}
                    contentContainerStyle={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    ref={(el: ?ListView) => (this._root = el)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.handleRefresh}
                        />
                    }
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    toolbar: {
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#673ab7',
        padding: 15,
        height: 70
    },
    toolbarButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1                //Step 3
    }, page: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        padding: 8,
        flexDirection: 'column'
    },
    row: {
        margin: 8,
        padding: 16,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 0, 0,1)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },
    text: {
        color: 'white',
    },
});