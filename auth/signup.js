import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton, Image } from 'react-native';

import { Button, InputField, ErrorMessage } from '../component';
import Firebase from '../storage/firebase';

const auth = Firebase.auth();

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [cpasswordVisibility, setCpasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };
    const handleCpasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setCpasswordVisibility(!cpasswordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setCpasswordVisibility(!cpasswordVisibility);
        }
    };

    const onHandleSignup = async () => {
        if (password !== cpassword) {
            setSignupError("Password mismatch")
        }
        try {
            if (email !== '' && password !== '') {
                await auth.createUserWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setSignupError(error.message);
        }
    };

    return (
        <View style={styles.container}>

            <StatusBar style='dark-content' />
            <View style={{ marignTop: 200, alignItems: 'center' }}>
                <Image
                    source={require('../assets/majja_logo.jpg')}
                    style={{ height: 80, width: 80 }}

                />
                <Text style={{ fontSize: 23, fontWeight: '700' }}>MAJJA</Text>
            </View>
            <View style={{ padding: 25, marginTop: 20 }}>
                <Text style={styles.title}>Create new account</Text>
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
                <InputField
                    inputStyle={{
                        fontSize: 14
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        marginBottom: 20
                    }}
                    leftIcon='lock'
                    placeholder='Enter confirm password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={cpasswordVisibility}
                    textContentType='password'
                    rightIcon={rightIcon}
                    value={cpassword}
                    onChangeText={text => setCpassword(text)}
                    handlePasswordVisibility={handleCpasswordVisibility}
                />
                {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
                <Button
                    onPress={onHandleSignup}
                    backgroundColor='#f57c00'
                    title='Signup'
                    tileColor='#fff'
                    titleSize={20}
                    containerStyle={{
                        marginBottom: 25,
                        marginTop: 15,

                    }}
                />
                <Text style={{ alignSelf: 'center', marginBottom: 25, fontWeight: '700' }}>
                    OR
                </Text>
                <RNButton
                    onPress={() => navigation.navigate('login')}
                    title='Go to Login'
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

export default Signup;