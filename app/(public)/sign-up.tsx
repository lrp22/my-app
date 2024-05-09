import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Alert,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { useSupabase } from "@/components/supabase-provider";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const { styles, theme } = useStyles(stylesheet);

  const validateAndSubmit = async () => {
    // Validate email
    if (!email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    // Validate password for length and patterns
    const passwordErrors = [];
    if (password.length < 8 || password.length > 64) {
      passwordErrors.push("Password must be between 8 and 64 characters.");
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push(
        "Your password must have at least one lowercase letter."
      );
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push(
        "Your password must have at least one uppercase letter."
      );
    }
    if (!/[0-9]/.test(password)) {
      passwordErrors.push("Your password must have at least one number.");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      passwordErrors.push(
        "Your password must have at least one special character."
      );
    }
    if (passwordErrors.length > 0) {
      Alert.alert("Validation Error", passwordErrors.join("\n"));
      return;
    }
    // Confirm password match
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Your passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      await signUp(email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      Alert.alert("Success", "Registration successful!");
    } catch (error) {
      // Type assertion or type checking for the error object
      if (
        typeof error === "object" &&
        error !== null &&
        "error_description" in error &&
        typeof error.error_description === "string"
      ) {
        Alert.alert("Sign Up Error", error.error_description);
      } else {
        Alert.alert("Sign Up Error", "An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Text
        style={[
          {
            fontSize: 20,
            color: theme.colors.typography2,
            marginBottom: 40,
          },
        ]}
      >
        Lets make your account!
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
        <Text style={styles.subheader}>Password:</Text>
        <TextInput
          placeholderTextColor="grey"
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <Text style={styles.subheader}>Confirm Password:</Text>
        <TextInput
          placeholderTextColor="grey"
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <Pressable
          style={[styles.btn, { backgroundColor: theme.colors.primary }]}
          onPress={validateAndSubmit}
          disabled={isSubmitting}
        >
          <Text
            style={[
              {
                fontSize: 20,
                color: theme.colors.typography,
              },
            ]}
          >
            {isSubmitting ? "Registering..." : "Sign Up"}
          </Text>
        </Pressable>
      </View>
      <Text style={{ color: theme.colors.typography2, marginTop: 10 }}>
        Already have an account?
        <Text
          style={{
            color: theme.colors.secondary,
            textDecorationLine: "underline",
          }}
          onPress={() => {
            router.push("/sign-in");
          }}
        >
          {" "}
          Sign in
        </Text>
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
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
