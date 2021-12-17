import React, { useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Icon, Image } from 'react-native-elements'
const DATA = [
    {
        id: 1, day: 'Today',
        title: "yuvi and 10 others liked your photo",
        pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117271268_186458759503619_789414827709318983_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_ohc=URsHEiuC214AX_UYyj0&tp=1&oh=56d0b5f9517a27e782e150ce0d6f800f&oe=6033EAD8',
        follower_pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.186.480.480a/s150x150/67288528_2268533966598789_425631773838517986_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=RGhS04jJsXMAX_y5iha&tp=1&oh=9e17ff0a92a9f51fd594fd38b7a3f151&oe=600E7BBE'
    },
    {
        id: 2, day: 'Today',
        title: "vj and 12 others liked your photo",
        pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117271268_186458759503619_789414827709318983_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_ohc=URsHEiuC214AX_UYyj0&tp=1&oh=56d0b5f9517a27e782e150ce0d6f800f&oe=6033EAD8',
        follower_pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.420.1080.1080a/s150x150/66814258_691678461283632_6438632468869261323_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=0OJZO8_YZ5IAX8tD6QO&tp=1&oh=ef5ed1f07b8c608455dad87ffb9a7215&oe=600E73FB'
    },
    {
        id: 3, day: 'This week',
        title: "shinchan and 12 others liked your photo",
        pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117271268_186458759503619_789414827709318983_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_ohc=URsHEiuC214AX_UYyj0&tp=1&oh=56d0b5f9517a27e782e150ce0d6f800f&oe=6033EAD8',
        follower_pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.420.1080.1080a/s150x150/51840533_779779452403655_7166292667124080777_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=t7519dTM3ywAX-zi9qw&tp=1&oh=b7414eae709b5ead131be3d73662517b&oe=600E584C'
    },
    {
        id: 4, day: 'This week',
        title: "phineas and 12 others liked your photo",
        pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117271268_186458759503619_789414827709318983_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_ohc=URsHEiuC214AX_UYyj0&tp=1&oh=56d0b5f9517a27e782e150ce0d6f800f&oe=6033EAD8',
        follower_pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.420.1080.1080a/s150x150/39398530_319284471982976_6785961818448723968_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=OMWY4MYxXTQAX8yj9Lu&tp=1&oh=cee6340426f079ad1d0ff0909e3aa81d&oe=600DD9CD'
    },
    {
        id: 5, day: 'This week',
        title: "shinchan and 12 others liked your photo",
        pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117271268_186458759503619_789414827709318983_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_ohc=URsHEiuC214AX_UYyj0&tp=1&oh=56d0b5f9517a27e782e150ce0d6f800f&oe=6033EAD8',
        follower_pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.420.1080.1080a/s150x150/51840533_779779452403655_7166292667124080777_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=t7519dTM3ywAX-zi9qw&tp=1&oh=b7414eae709b5ead131be3d73662517b&oe=600E584C'
    },
    {
        id: 6, day: 'This week',
        title: "phineas and 12 others liked your photo",
        pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117271268_186458759503619_789414827709318983_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_ohc=URsHEiuC214AX_UYyj0&tp=1&oh=56d0b5f9517a27e782e150ce0d6f800f&oe=6033EAD8',
        follower_pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.420.1080.1080a/s150x150/39398530_319284471982976_6785961818448723968_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=OMWY4MYxXTQAX8yj9Lu&tp=1&oh=cee6340426f079ad1d0ff0909e3aa81d&oe=600DD9CD'
    },
    {
        id: 7, day: 'This week',
        title: "shinchan and 12 others liked your photo",
        pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117271268_186458759503619_789414827709318983_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_ohc=URsHEiuC214AX_UYyj0&tp=1&oh=56d0b5f9517a27e782e150ce0d6f800f&oe=6033EAD8',
        follower_pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.420.1080.1080a/s150x150/51840533_779779452403655_7166292667124080777_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=t7519dTM3ywAX-zi9qw&tp=1&oh=b7414eae709b5ead131be3d73662517b&oe=600E584C'
    },
    {
        id: 8, day: 'This week',
        title: "phineas and 12 others liked your photo",
        pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117271268_186458759503619_789414827709318983_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_ohc=URsHEiuC214AX_UYyj0&tp=1&oh=56d0b5f9517a27e782e150ce0d6f800f&oe=6033EAD8',
        follower_pic: 'https://instagram.fmaa11-1.fna.fbcdn.net/v/t51.12442-15/e35/c0.420.1080.1080a/s150x150/39398530_319284471982976_6785961818448723968_n.jpg?_nc_ht=instagram.fmaa11-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=OMWY4MYxXTQAX8yj9Lu&tp=1&oh=cee6340426f079ad1d0ff0909e3aa81d&oe=600DD9CD'
    },
]


const Notification_Body = () => {

    const renderItem = ({ item }) => {
        return (
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 10 }}>{item.day}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={{ uri: item.pic }}
                        style={{ padding: 5, margin: 5, marginBottom: 0, height: 30, width: 30 }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                    <Text numberOfLines={2} style={{ marginHorizontal: 5, textAlignVertical: 'center' }}>{item.title}</Text>
                    <View>
                        <Image
                            source={{ uri: item.follower_pic }}
                            style={{ padding: 5, margin: 5, marginBottom: 0, alignContent: 'flex-end', height: 30, width: 30 }}
                            PlaceholderContent={<ActivityIndicator />}
                        />

                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
const NOtification = () => {
    return (
        <View>
            <View style={{ alignContent: 'flex-start', backgroundColor: 'white', justifyContent: 'flex-start' }} >
                <Text style={{ paddingVertical: 10, fontSize: 20, fontFamily: 'monospace', fontWeight: 'bold' }}>
                    Activity
                </Text>
            </View>
            <View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Icon name="people" size={24} color="black" style={{ borderBottomColor: 'black', borderWidth: 1, borderRadius: 60, padding: 5, margin: 5 }} />
                    <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <Text >Follow request</Text>
                        <Text style={{ color: 'gray' }}>Apporeve or ignore requests</Text>
                    </View>
                </View>
                <Notification_Body />
            </View>
        </View>
    )
}

export default NOtification
