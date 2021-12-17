import React, { useContext } from 'react'
import { View, Text, SafeAreaView, Dimensions, TouchableHighlight } from 'react-native'
import { Icon, Card, Image, ListItem } from 'react-native-elements'
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../../storage/authProvider'
import Firebase from '../../storage/firebase';

const auth = Firebase.auth()

const Profile = () => {
    const { user } = useContext(AuthContext)
    const list = [
        {
            name: 'Personal Information',
            icon: 'person'
        },
        {
            name: user.email,
            icon: 'mail'
        },
        {
            name: 'Likes',
            icon: 'favorite'
        },
        {
            name: 'Edit',
            icon: 'edit'
        },
        {
            name: 'Logout',
            icon: 'logout'
        },
    ]
    const logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SafeAreaView>
            <Card
                containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Dimensions.get('screen').height / 3,
                    backgroundColor: '#FFB902',
                    elevation: 50,
                    marginTop: 10
                }}
            >
                <View>

                    <Image
                        source={require('../../assets/user.jpg')}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            marginTop: 50
                        }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 20,
                            marginHorizontal: 5
                        }}
                    >Username</Text>
                </View>
                <View>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 14,
                            marginTop: 10,
                            marginHorizontal: 5
                        }}
                    >
                        Vies 21 | Visit 21
                    </Text>
                </View>
            </Card>
            <View style={{ margin: 10, padding: 10 }}>
                {
                    list.map((l, i) => (
                        <TouchableHighlight
                            key={i}
                            onPress={() => {
                                if (l.name === "Logout")
                                    logout()
                            }}>
                            <ListItem bottomDivider style={{ marginTop: 7.5 }}>
                                <Icon name={l.icon} />

                                <ListItem.Content >
                                    <ListItem.Title>{l.name}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </TouchableHighlight>
                    ))
                }
            </View>
        </SafeAreaView>
    )
}

export default Profile
