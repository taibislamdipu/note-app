import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "../theme/typography";
import { spacing } from "../theme/spacing";
import { showMessage } from "react-native-flash-message";
import { colors } from "../theme/colors";
import Button from "../components/Button";

export default function SignIn({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        showMessage({
          message: "Login successful",
          type: "success",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../images/undraw_walking.png")}
        style={{ width: 320, height: 253, alignSelf: "center" }}
      />
      <Text style={styles.title}>Never forget your notes</Text>
      <View style={styles.textInputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
      </View>

      <View style={styles.bottomTextView}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title={"Login"}
            customStyles={{ alignSelf: "center", marginBottom: 60 }}
            onPress={login}
          />
        )}
        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>
            Don't have an account? {""}
            <Text style={{ color: colors.green, fontFamily: typography.bold }}>
              Sign up
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
    // justifyContent: "flex-end",
    // paddingBottom: 40,
    alignItems: "center",
    marginTop: 200,
  },
});
