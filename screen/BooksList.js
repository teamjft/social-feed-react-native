import React, {PureComponent} from 'react';
import {ListView, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import {StackNavigator} from 'react-navigation'
import WebViewScreen from './WebViewScreen'

type State = {
    bookArray: Array<number>,
    dataSource: ListView.DataSource,
};

let bookArray = [];

export default class BooksList extends PureComponent<{}, State> {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid});
        this.state = {
            dataSource: dataSource.cloneWithRows(bookArray),
            isLoading: true
        };

    }

    componentWillMount() {
        this.getBooks(function (json) {
            bookArray = json;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(bookArray),
                isLoading: false
            })
        }.bind(this));
    }

    _root: ?ListView;

    // _genRows = () => {
    //     const bookArrayData = this.state.bookArray.slice(0);
    //     const itemsLength = bookArrayData.length;
    //
    //     if (itemsLength >= 1000) {
    //         return;
    //     }
    //
    //     for (let i = 0; i < 100; i++) {
    //         bookArrayData.push(itemsLength + i);
    //     }
    //
    //     this.setState({
    //         bookArrayData,
    //         dataSource: this.state.dataSource.cloneWithRows(bookArrayData),
    //         isLoading: false
    //     });
    // };

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


    // goToWebViewPage = (data) => {
    //     navigate('WebViewScreen', {ListViewClickItemHolder: data});
    // };

    scrollTo = (...args: any) => this._root && this._root.scrollTo(...args);

    getBooks(callback) {
        let url = "https://mcnam.ee/api/index.php?type=goodreads";
        fetch(url)
            .then(response => {

                return response.json()
            })
            .then(json => callback(json))
            .catch(error => console.warn("error", error));
    }

    render() {
        return (
            <ListView
                {...this.props}
                removeClippedSubviews={false}
                contentContainerStyle={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <View style={styles.row}>
                    <TouchableOpacity style={{flexDirection: 'row'}}
                                      onPress={() => this.props.navigation.navigate('WebViewScreen')}>
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
                </View>}
                enableEmptySections={true}
                ref={(el: ?ListView) => (this._root = el)}
            />
        );
    }
}

const styles = StyleSheet.create({
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
        color: 'rgba(0, 0, 0,1)',
    },
});