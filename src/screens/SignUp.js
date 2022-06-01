import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "../theme/typography";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import Text from "../components/Text/Text";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const genderOptions = ["Male", "Female"];

export default function SignUp({ navigation }) {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.textInputView}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Full name"
          onChangeText={(text) => setUsername(text)}
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
          customStyle={{ alignSelf: "center", marginBottom: 60 }}
          title={"Sign up"}
          onPress={signup}
        />
        <Pressable
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>
            Already have an account? {""}
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
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
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
