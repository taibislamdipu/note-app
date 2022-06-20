import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";

import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // create query
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));

    // listener for query
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
    });

    return notesListenerSubscription;
  }, []);

  // console.log("notes", notes);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;
    return (
      <Pressable
        style={{
          backgroundColor: color,
          marginBottom: 25,
          borderRadius: 16,
          padding: 15,
        }}
        onPress={() => {
          navigation.navigate("Edit", { item });
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            padding: 20,
            zIndex: 1,
          }}
          onPress={() => {
            deleteDoc(doc(db, "notes", item.id));
          }}
        >
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>

        <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
        <Text style={{ color: "white", fontSize: 18, marginTop: 16 }}>
          {description}
        </Text>
      </Pressable>
    );
  };

  const onPressCreate = () => {
    navigation.navigate("Create");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.white, height: "100%" }}>
      {/* <View style={styles.title}> */}
      <View style={styles.title}>
        <Text>My Notes</Text>

        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>

      <View style={{ padding: 20 }}>
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
