import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { useSupabase } from "@/components/supabase-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function SignIn() {
  const { signInWithPassword } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const { styles, theme } = useStyles(stylesheet);

  const validateAndSubmit = async () => {
    if (!email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (password.length < 8 || password.length > 64) {
      Alert.alert(
        "Validation Error",
        "Password must be between 8 and 64 characters."
      );
      return;
    }
    try {
      setSubmitting(true);
      await signInWithPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      // Check if error is an object and has a property 'message' which is a string
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        Alert.alert("Sign In Error", error.message);
      } else {
        Alert.alert("Sign In Error", "An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let`s Sign You In</Text>
      <Text
        style={[
          {
            fontSize: 20,
            color: theme.colors.typography2,
            marginBottom: 50,
          },
        ]}
      >
        Welcome back!
      </Text>
      <View>
        <Text style={styles.subheader}>Email:</Text>
        <TextInput
          placeholderTextColor="grey"
          style={styles.input}
          placeholder="name@gmail.com"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <Text style={[styles.subheader, { marginTop: 10 }]}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <Pressable
          style={[styles.btn, { backgroundColor: theme.colors.primary }]}
          onPress={validateAndSubmit}
        >
          <Text
            style={[
              {
                fontSize: 20,
                color: theme.colors.typography,
              },
            ]}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "flex-start",
    backgroundColor: theme.colors.background,
  },
  header: {
    marginTop: 50,
    fontSize: 44,
    marginBottom: 10,
    color: theme.colors.typography,
  },
  subheader: {
    fontSize: 24,
    marginBottom: 10,
    color: theme.colors.typography,
  },
  input: {
    color: theme.colors.typography,
    height: 40,
    borderBottomColor: theme.colors.secondary,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.background,
    fontSize: 18,
  },
  btn: {
    marginTop: 50,
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 100,
    marginVertical: 10,
  },
}));
