import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
    Home, Music, Notification, Post, Profile,
} from '../pages'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Yellow } from '../theme/color'

const Tab = createMaterialBottomTabNavigator()
const NavBar = () => {
    return (
        <Tab.Navigator
            activeColor={Yellow}
            inactiveColor='#EEEEEE'
            barStyle={{ backgroundColor: "#222831", borderColor: Yellow, borderStyle: 'dotted', borderWidth: 1, height: 70 }}
            initialRouteName='Home'
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Music"
                component={Music}
                options={{
                    tabBarLabel: 'Music',
                    tabBarIcon: ({ color }) => (
                        <Foundation name="play-circle" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Post"
                component={Post}
                options={{
                    tabBarLabel: 'Post',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="add-circle" size={24} color={color} />

                    ),
                }}
            />

            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="bell" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (

                        <FontAwesome name="user" size={26} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
export default NavBar;