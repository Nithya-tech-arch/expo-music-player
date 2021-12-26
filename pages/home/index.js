import React, { useEffect, useState } from "react";
import { View, Text, RefreshControl, ScrollView, FlatList } from "react-native";
import { Card, Image } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Firebase from "../../storage/firebase";
import { Yellow } from "../../theme/color";
import { Audio } from "expo-av";

const db = Firebase.firestore();
const Home = () => {
  const [data, setData] = useState([]);
  const [sound, setSound] = React.useState();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  async function playSound(songUri) {
    await sound.getStatusAsync().then(async (e) => {
      if (e.isPlaying) {
        await sound.pauseAsync();
      } else {
        const { sound } = await Audio.Sound.createAsync({
          uri: songUri,
        });
        setSound(sound);
        await sound.playAsync();
      }
    });
  }

  useEffect(() => {
    async function getData() {
      let temp = [];
      await db
        .collection("post")
        .get()
        .then((e) => {
          e.forEach((item) => {
            temp.push(item.data());
          });
        });
      setData(temp);
    }
    getData();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Card Details
  const CardDetails = (item) => {
    const val = item.item;
    return (
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ height: 45, width: 45, borderRadius: 45 }}
            source={{
              uri: val.userImg,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 15,
              fontWeight: "700",
            }}
          >
            {val.name}
          </Text>
        </View>
        <Card.Image
          style={{ height: 300, marginTop: 15 }}
          source={{
            uri: val.image,
          }}
          onPress={() => playSound(val.song)}
        />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Icon
            name="play-circle-outline"
            color={Yellow}
            size={28}
            style={{ marginHorizontal: 10 }}
            onPress={() => playSound(val.song)}
          />
          <Icon name="favorite-border" color={Yellow} size={28} />

          <Icon
            name="more-vert"
            style={{ alignSelf: "flex-end", marginLeft: "70%" }}
          />
        </View>
      </Card>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#222831",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Icon name="menu" color={Yellow} size={30} />
        <Text
          style={{
            color: Yellow,
            alignSelf: "center",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          Majja
        </Text>
        <Icon name="refresh" size={30} color={Yellow} onPress={onRefresh} />
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        renderItem={CardDetails}
        keyExtractor={(item) => item.created_on}
        // style={{flex:1}}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </View>
  );
};

export default Home;
