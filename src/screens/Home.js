import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Button from "../components/Button";

export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteConfirmDialog = (item) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            deleteDoc(doc(db, "notes", item.id));
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const logoutConfirmDialog = () => {
    return Alert.alert("Are your sure?", "Are you sure you want to exit?", [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          {
            signOut(auth)
              .then(() => {
                showMessage({
                  message: "Logout successful",
                  type: "success",
                });
              })
              .catch((error) => {
                console.log("error --->", error);
              });
          }
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };

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
      setIsLoading(false);
    });

    return notesListenerSubscription;
  }, []);

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
          onPress={() => deleteConfirmDialog(item)}
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
      }}
    >
      <ScrollView>
        <View style={styles.title}>
          <Text>My Notes</Text>

          <Pressable onPress={onPressCreate}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </Pressable>
        </View>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              padding: 20,
            }}
          >
            <FlatList
              data={notes}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        <View>
          <Button
            title={"Logout"}
            customStyles={{
              alignSelf: "center",
              marginBottom: 60,
              marginTop: 20,
            }}
            onPress={logoutConfirmDialog}
          />
        </View>
      </ScrollView>
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
