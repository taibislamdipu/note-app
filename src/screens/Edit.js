import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";
import Button from "../components/Button";
import { showMessage } from "react-native-flash-message";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const noteColorOptions = ["red", "blue", "green"];

export default function Create({ user, navigation, route }) {
  const noteItem = route.params.item;

  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressEdit = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        color: noteColor,
      });
      setLoading(false);
      showMessage({
        message: "Updated!",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      showMessage({
        message: "something went wrong",
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        height: "100%",
        marginHorizontal: 20,
      }}
    >
      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        value={description}
      />
      <View style={{ marginTop: 25, marginBottom: 15 }}>
        <Text>Select your note color</Text>
      </View>
      {noteColorOptions.map((option, i) => (
        <RadioInput
          key={i}
          option={option}
          noteColor={noteColor}
          setNoteColor={setNoteColor}
        />
      ))}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title={"Submit"}
          onPress={onPressEdit}
          customStyles={{
            alignSelf: "center",
            marginBottom: 20,
            width: "100%",
            marginTop: 60,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  selectedOuterCircle: {
    borderColor: "orange",
  },
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
