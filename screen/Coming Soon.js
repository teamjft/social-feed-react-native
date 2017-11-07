import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class ComingSoon extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Coming Soon',
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
        drawerLabel: 'Coming Soon',
    });

    render() {
        return (
            <View style={styles.appContainer}>
                <View style={{flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#f43', fontWeight: 'bold', fontSize: 25}}>
                        Coming Soon...
                    </Text>
                </View>
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