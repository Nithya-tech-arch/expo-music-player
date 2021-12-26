import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { Icon, Card, Image, ListItem } from "react-native-elements";
import { AuthContext } from "../../storage/authProvider";
import Firebase from "../../storage/firebase";
import { Yellow } from "../../theme/color";

const auth = Firebase.auth();
const db = Firebase.firestore();

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [name, setName] = useState("unknown");
  const [num, setNum] = useState("unknown");
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const docRef = db.collection("user").doc(email);
        await docRef.get().then((e) => {
          const u = e.data();
          setName(u.name);
          setNum(u.mobile);
          if (u.image) setImage(u.image);
        });
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  const list = [
    {
      name: "Personal Information",
      icon: "person",
      fun: () => navigation.navigate("info"),
    },
    {
      name: `${name}`,
      icon: "face",
    },
    {
      name: `${user.email}`,
      icon: "mail",
    },
    {
      name: `+91 ${num}`,
      icon: "favorite",
    },
    {
      name: "Logout",
      icon: "logout",
      fun: () => logout(),
    },
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: Dimensions.get("screen").height / 3,
          backgroundColor: Yellow,
          elevation: 50,
          marginTop: 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 110,
                height: 110,
                borderRadius: 70,
                marginTop: 50,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          ) : (
            <Image
              source={require("../../assets/user.jpg")}
              style={{
                width: 110,
                height: 110,
                borderRadius: 70,
                marginTop: 50,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              marginHorizontal: 5,
            }}
          >
            {user.email}
          </Text>
        </View>
      </Card>
      <View style={{ margin: 10, padding: 10 }}>
        {list.map((l, i) => (
          <Pressable key={i} onPress={l?.fun}>
            <ListItem key={i} bottomDivider style={{ marginTop: 7.5 }}>
              <Icon name={l.icon} color="#469fee" />

              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
