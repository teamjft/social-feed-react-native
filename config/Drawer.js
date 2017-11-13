import React from 'react';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation'
import ComingSoon from '../screen/Coming Soon'
import SocialFeeds from '../screen/Social Feeds'
import WebViewScreen from '../screen/WebViewScreen'
import TwitterList from '../screen/TwitterList'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import stackNavigation from './stackNavigation'
import tabNavigation from './tabNavigation'
import stackNavigationComingSoon from './stackNavigationComingSoon'

const Drawer = DrawerNavigator(
    {
        StackNavigations: {
            screen: stackNavigation,
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
            screen: stackNavigationComingSoon,
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