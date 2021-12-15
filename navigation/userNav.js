import React, { useContext } from 'react'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Login, Signup } from '../auth'
import { AuthContext } from '../storage/authProvider'
import NavBar from './navBar'
const Stack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()
const StackNav = () => {
    return (
        <Stack.Navigator initialRouteName='navbar'>
            <Stack.Screen
                name="navbar"
                component={NavBar}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
const AuthStackNav = () => {
    return (
        <AuthStack.Navigator initialRouteName='login'>
            <AuthStack.Screen
                options={{
                    headerShown: false
                }}
                name="login"
                component={Login}
            />
            <AuthStack.Screen
                name="signup"
                component={Signup}
                options={{
                    headerShown: false
                }}
            />

        </AuthStack.Navigator>
    )
}
const UserNav = () => {
    const context = useContext(AuthContext)
    return (
        <NavigationContainer>
            {
                !context.user ? <StackNav /> : <AuthStackNav />
            }
        </NavigationContainer>
    )
}
export default UserNav;
