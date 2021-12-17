import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    Pressable,
    Image,
    StyleSheet
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import {
    Button,
    Card,
    Icon,
    Input
} from 'react-native-elements';

const Post = () => {
    const [image, setImage] = useState(null);
    const [song, setSong] = React.useState(null);
    const [sound, setSound] = React.useState();
    const [play, setPlay] = useState(false)

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: song?.uri
            }
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    const handleRefresh = () => {
        setImage(null)
        setSong(null)
        setSound()
        setPlay(false)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const pickAudio = async () => {
        let result = await DocumentPicker.getDocumentAsync(
            {
                type: 'audio/*'
            }
        )
        console.log(result)
        if (!result.cancelled) {
            setSong(result);
        }
    }
    return (
        <SafeAreaView>
            <View
                style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10, padding: 10, marginHorizontal: 7 }}
            >
                <Text
                    style={{ fontWeight: '700', fontSize: 18, color: '#333343' }}
                >Publish your song</Text>
                <Icon name="refresh" size={26} color="black" onPress={handleRefresh} />
                <Button
                    icon={
                        <Icon
                            name="save"
                            size={15}
                            color="white"
                        />
                    }
                    title="Save"
                    buttonStyle={{ backgroundColor: 'green', borderRadius: 5 }}
                />
            </View>
            <Card containerStyle={{ height: '88%' }}>
                {
                    !image ?
                        <Pressable
                            onPress={pickImage}
                            style={style.img}
                        >
                            <Text style={{ color: '#777' }}>Upload Photo</Text>
                            <Icon
                                name="image"
                                size={25}
                                color="#777"
                            />
                        </Pressable>
                        :
                        <Image source={{ uri: image }} style={style.img} />
                }
                {
                    !song ?
                        <Pressable
                            onPress={pickAudio}
                            style={style.mp3}
                        >
                            <Text style={{ color: '#777' }}>Upload song</Text>
                            <Icon
                                name="file-upload"
                                size={25}
                                color="#777"
                            />
                        </Pressable>
                        :
                        <View style={style.mp3}>
                            <Text style={{ width: 261 }}>{song.name}</Text>
                            {
                                play ?
                                    <Icon name="pause-circle-outline" size={28} color="#000"
                                        onPress={async () => {
                                            setPlay(false)
                                            await sound.pauseAsync()
                                        }}
                                    />
                                    :
                                    <Icon name="play-circle-outline" size={28} color="#000"
                                        onPress={() => {
                                            setPlay(true)
                                            playSound()
                                        }}
                                    />
                            }
                        </View>
                }
                <Input
                    placeholder='Title'
                    containerStyle={style.input}
                    style={style.input}
                    label="Title"
                />
                <Input
                    placeholder='Description'
                    containerStyle={style.input}
                    style={style.input}
                    autoCapitalize='sentences'
                    label="Description"
                />
            </Card>
        </SafeAreaView>
    )
}

export default Post;

const style = StyleSheet.create({
    img: {
        height: 200,
        width: "100%",
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        marginTop: 10
    },
    mp3: {
        height: 50,
        width: '100%',
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 15,
        backgroundColor: '#fffeef'
    }
})