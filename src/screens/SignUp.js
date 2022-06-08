import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "../theme/typography";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";
// import Button from "../components/Button";
import Input from "../components/Input";
import Text from "../components/Text/Text";

import Button from "../components/Button";
import { addDoc, collection } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { AntDesign } from "@expo/vector-icons";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const genderOptions = ["Male", "Female"];

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUpAction = async () => {
    setLoading(true);
    try {
      // 1. create a new user with email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("result", result);
      // 2. add user profile to database
      await addDoc(collection(db, "users"), {
        username: username,
        email: email,
        age: age,
        uid: result.user.uid,
      });
      setLoading(false);
      showMessage({
        message: "Successful!",
        type: "success",
      });
    } catch (error) {
      console.log("error", error);

      showMessage({
        message: "FirebaseError: Firebase: Error (auth/email-already-in-use).",
        type: "danger",
      });
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      console.log("googleLogin");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.textInputView}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"} // for lowercase text
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Full name"
          onChangeText={(text) => setUsername(text)}
          autoCapitalize={"words"}
        />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        <View style={{ marginVertical: 20 }}>
          <Text>Select Gender</Text>
        </View>
        {genderOptions.map((option) => {
          const selected = option === gender;
          return (
            <Pressable
              onPress={() => setGender(option)}
              key={option}
              style={styles.radioContainer}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCircle,
                  ]}
                />
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.bottomTextView}>
        <Button
          title={<AntDesign name="google" size={24} color="black" />}
          onPress={googleLogin}
          customStyles={{ alignSelf: "center", marginBottom: 20 }}
        />

        <Button
          title={"Signup"}
          onPress={signUpAction}
          customStyles={{ alignSelf: "center", marginBottom: 20 }}
        />

        <Pressable
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>
            Already have an account?{" "}
            <Text style={{ color: colors.green, fontFamily: typography.bold }}>
              Login
            </Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: typography.primaryBold,
    textAlign: "center",
  },
  textInput: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: spacing[5],
  },
  textInputView: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[5],
  },
  bottomTextView: {
    // flex: 1,
    justifyContent: "flex-end",
    marginTop: 100,
    alignItems: "center",
  },
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
