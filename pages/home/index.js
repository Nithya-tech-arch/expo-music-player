import React from "react";
import { View, Text, RefreshControl, ScrollView } from "react-native";
import { Card, Image } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Yellow } from "../../theme/color";
const Home = () => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
          <Card>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image
                    style={{height:50,width:50,borderRadius:50}}
                    source={{uri:"https://i.ytimg.com/vi/BNcxTNrtRdk/maxresdefault.jpg"}}
                  />
                <Text 
                    style={{fontSize:18,alignItems:'center',justifyContent:"center",marginHorizontal:15,fontWeight:'700'}}
                >
                    username
                </Text>
              </View>
              <Card.Image
                style={{height:300,marginTop:15}}
                source={{uri:"https://static.toiimg.com/photo/msid-81567469/81567469.jpg?66554"}}
              />
              <View 
                style={{flexDirection:'row',marginTop:10}}
              >
                  <Icon
                  name="play-circle-outline"
                  color={Yellow}
                  size={28}
                  style={{marginHorizontal:10}}
                  />
                  <Icon
                    name="favorite-border"
                    color={Yellow}
                    size={28}
                  />
                  
                  <Icon
                    name="more-vert"
                    style={{alignSelf:'flex-end',marginLeft:'70%'}}
                  />
              </View>
          </Card>
          <Card>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image
                    style={{height:50,width:50,borderRadius:50}}
                    source={{uri:"https://i.ytimg.com/vi/BNcxTNrtRdk/maxresdefault.jpg"}}
                  />
                <Text 
                    style={{fontSize:18,alignItems:'center',justifyContent:"center",marginHorizontal:15,fontWeight:'700'}}
                >
                    username
                </Text>
              </View>
              <Card.Image
                style={{height:300,marginTop:15}}
                source={{uri:"https://static.toiimg.com/photo/msid-81567469/81567469.jpg?66554"}}
              />
              <View 
                style={{flexDirection:'row',marginTop:10}}
              >
                  <Icon
                  name="play-circle-outline"
                  color={Yellow}
                  size={28}
                  style={{marginHorizontal:10}}
                  />
                  <Icon
                    name="favorite-border"
                    color={Yellow}
                    size={28}
                  />
                  
                  <Icon
                    name="more-vert"
                    style={{alignSelf:'flex-end',marginLeft:'70%'}}
                  />
              </View>
          </Card>
      </ScrollView>
    </View>
  );
};

export default Home;
