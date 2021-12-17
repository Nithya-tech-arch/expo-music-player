import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton, Image } from 'react-native';

import { Button, InputField, ErrorMessage } from '../component';
import Firebase from '../storage/firebase';

const auth = Firebase.auth();

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [loginError, setLoginError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark-content' backgroundColor='#000' />
            <View style={{ marignTop: 200, alignItems: 'center' }}>
                <Image
                    source={require('../assets/majja_logo.jpg')}
                    style={{ height: 80, width: 80 }}

                />
                <Text style={{ fontSize: 23, fontWeight: '700' }}>MAJJA</Text>
            </View>
            <View style={{ padding: 25, marginTop: 20 }}>

                <Text style={styles.title}>Login</Text>
                <InputField
                    inputStyle={{
                        fontSize: 14
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        marginBottom: 20
                    }}
                    leftIcon='email'
                    placeholder='Enter email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus={true}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <InputField
                    inputStyle={{
                        fontSize: 14
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        marginBottom: 20
                    }}
                    leftIcon='lock'
                    placeholder='Enter password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType='password'
                    rightIcon={rightIcon}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    handlePasswordVisibility={handlePasswordVisibility}
                />
                {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
                <Button
                    onPress={onLogin}
                    backgroundColor='#f57c00'
                    title='Login'
                    tileColor='#fff'
                    titleSize={20}
                    containerStyle={{
                        marginBottom: 25
                    }}
                />
                <Text style={{ alignSelf: 'center', marginBottom: 25, fontWeight: '700' }}>
                    OR
                </Text>
                <RNButton
                    onPress={() => navigation.navigate('signup')}
                    title='Go to Signup'
                    color='#000'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFB902',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'center',
        paddingBottom: 24
    }
});

export default Login;