import React from 'react';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation'
import ComingSoon from '../screen/Coming Soon'
import SocialFeeds from '../screen/Social Feeds'
import WebViewScreen from '../screen/WebViewScreen'
import TwitterList from '../screen/TwitterList'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const tabNavigation = TabNavigator(
    {
        SocialFeeds: {
            screen: SocialFeeds,
        },
        TwitterList: {
            screen: TwitterList,
        },
    }, {
        tabBarPosition: 'top',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#e91e63',
        },
        lazy: true,
    }
);

export default tabNavigation;