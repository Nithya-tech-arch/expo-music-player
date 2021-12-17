import React, { useContext, useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Login, Signup } from '../auth'
import { AuthContext } from '../storage/authProvider'
import Firebase from '../storage/firebase'
import NavBar from './navBar'

const auth = Firebase.auth();
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
    const { user, setUser } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
            try {
                await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        });

        // unsubscribe auth listener on unmount
        return unsubscribeAuth;
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {
                user ? <StackNav /> : <AuthStackNav />
            }
        </NavigationContainer>
    )
}
export default UserNav;
