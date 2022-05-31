import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "../theme/typography";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";
import Button from "../components/Button";

export default function SignIn() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../images/undraw_walking.png")}
        style={{ width: 320, height: 253, alignSelf: "center" }}
      />
      <Text style={styles.title}>Never forget your notes</Text>
      <View style={styles.textInputView}>
        <TextInput style={styles.textInput} placeholder="Email" />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.bottomTextView}>
        <Button
          title={"Login"}
          customStyle={{ alignSelf: "center", marginBottom: 60 }}
        />
        <Pressable>
          <Text>
            Don't have an account {""}
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
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
    alignItems: "center",
  },
});
