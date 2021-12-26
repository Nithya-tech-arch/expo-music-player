import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './profileScreen';
import Info from './info';
const Stack = createNativeStackNavigator()
const Profile = () => {
    return (
        <Stack.Navigator initialRouteName='profile'>
            <Stack.Screen
                name='profile'
                component={ProfileScreen}
                options={{
                    // headerShown: false
                }}
            />
            <Stack.Screen name='info' component={Info}

            />
        </Stack.Navigator>
    )
}
export default Profile;