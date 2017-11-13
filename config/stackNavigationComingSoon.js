import React from 'react';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation'
import ComingSoon from '../screen/Coming Soon'
import SocialFeeds from '../screen/Social Feeds'
import WebViewScreen from '../screen/WebViewScreen'
import TwitterList from '../screen/TwitterList'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import tabNavigation from './tabNavigation'

const stackNavigation = StackNavigator(
    {
        tabNavigation: {
            screen: tabNavigation
        },
        WebViewScreen: {
            screen: WebViewScreen
        },
        ComingSoon: {
            screen: ComingSoon,
        },
    }, {
        initialRouteName: 'ComingSoon',
        headerMode: 'screen',
        mode: 'modal',
    }
);

export default stackNavigation;