import React, { useContext, useEffect, useState } from "react";
import { Text, View, LogBox, Alert } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../storage/authProvider";
import Firebase from "../../storage/firebase";
import * as ImagePicker from "expo-image-picker";


const db = Firebase.firestore();
const storage = Firebase.storage();
LogBox.ignoreLogs(["Setting a timer"]);  

const Info = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const email = user.email;
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [edit, setEdit] = useState(false);
  const [mobile, setMobile] = useState("");

  //   Save function
  const onSave = async () => {
    try{
    const docRef = db.collection("user").doc(email);
    const upUri = image;
    let filename = upUri.substring(upUri.lastIndexOf("/") + 1);
    const response = await fetch(image);
    const blob = await response.blob();
    let img=""
    await storage
      .ref(filename)
      .put(blob)
      .then(
        async (e) =>
          await storage
            .ref(filename)
            .getDownloadURL()
            .then((e) => {
              console.log(e)
              setImage(e);
              img=e
            })
      );
          console.log(img)
    await docRef
      .set({
        name: name,
        email: email,
        bio: bio,
        mobile: mobile,
        updated_on: new Date(),
        active: false,
        image: img,
      })
      .then((e) => Alert.alert(user.email, "User data uploaded successfully"))
      .catch((e) => console.log("error", e));
    }catch(e){
      console.log(e)
    }
  };

  //   Image pickerr function
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  useEffect(() => {
    async function getData() {
      const docRef = db.collection("user").doc(email);
      await docRef.get().then((e) => {
        const u = e.data();
        setName(u.name);
        setBio(u.bio);
        setMobile(u.mobile);
        if (u.image) setImage(u.image);
      });
    }
    getData();
    // console.log(image)
  }, []);

  return (
    <View style={{ backgroundColor: "#fff", width: "100%" }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}> </Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Edit"
            onPress={() => setEdit(true)}
            icon={<Icon name="edit" size={20} color="#fff" />}
            iconRight
            buttonStyle={{ backgroundColor: "#FFAD0B", marginHorizontal: 20 }}
          />
          <Button
            title="Save"
            onPress={() => {
              setEdit(false);
              onSave();
            }}
            iconRight
            icon={<Icon name="save" size={20} color="#fff" />}
            buttonStyle={{ backgroundColor: "green" }}
          />
        </View>
      </View>
      <View style={{ padding: 15 }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ height: 120, width: 120 }}
            containerStyle={{ marginLeft: 110 }}
            onPress={() => {
              if (edit) pickImage();
            }}
          />
        ) : (
          <Image
            source={require("../../assets/user.jpg")}
            style={{ height: 120, width: 120 }}
            containerStyle={{ marginLeft: 110 }}
            onPress={() => {
              if (edit) pickImage();
            }}
          />
        )}
        <TextInput
          label="Email"
          value={user.email}
          editable={false}
          style={{ margin: 10 }}
        />
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          editable={edit}
          style={{ margin: 10 }}
        />
        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          editable={edit}
          style={{ margin: 10 }}
        />
        <TextInput
          label="Mobile number"
          value={mobile}
          onChangeText={setMobile}
          editable={edit}
          style={{ margin: 10 }}
        />
      </View>
    </View>
  );
};
export default Info;
