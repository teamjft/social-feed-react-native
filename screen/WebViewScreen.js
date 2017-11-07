import React from 'react'
import {View, StyleSheet, WebView} from 'react-native'

export default class WebViewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.titleName,
        headerStyle: {
            backgroundColor: '#2196F3'
        },
        headerTitleStyle: {
            color: '#fff',
        },

    });

    render() {
        return (
            <View style={styles.appContainer}>
                <WebView
                    source={{uri: this.props.navigation.state.params.url}}
                    startInLoadingState={true}
                    renderLoading={this.renderLoading}
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
        flex: 1
    }
});