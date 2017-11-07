import React from 'react';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation'
import ComingSoon from './screen/Coming Soon'
import SocialFeeds from './screen/Social Feeds'
import WebViewScreen from './screen/WebViewScreen'
import TwitterList from './screen/TwitterList'
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
const stack = StackNavigator(
    {
        tabNavigation: {
            screen: tabNavigation
        },
        WebViewScreen: {
            screen: WebViewScreen
        },
        ComingSoon: {
            screen: ComingSoon,

        }
    }, {
        initialRouteName: 'tabNavigation',
        headerMode: 'screen',
        mode: 'modal',
    }
);

const Drawer = DrawerNavigator(
    {
        SocialFeeds: {
            screen: stack,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={"rss-feed"}
                        size={24}
                        style={{color: '#e91e63'}}
                    />
                )
            }

        },
        ComingSoon: {
            screen: ComingSoon,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={"watch"}
                        size={24}
                        style={{color: '#e91e63'}}
                    />
                )
            }
        }
    }, {
        drawerPosition: 'left',
        drawerWidth: 250,
        contentOptions: {
            activeTintColor: '#f44'
        }
    }
);

export default Drawer;