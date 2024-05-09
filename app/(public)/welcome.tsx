import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function WelcomeScreen() {
  const router = useRouter();
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  const { height } = Dimensions.get("window");
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={{ marginTop: height * 0.12, padding: 20 }}>
        <Text style={styles.header}>Ready to change</Text>
        <Text style={styles.header}>the way</Text>
        <Text style={styles.header}>you money?</Text>
      </View>
      <View style={[styles.buttons, { top: -(height * 0.12) }]}>
        <Pressable
          style={[styles.btn, { backgroundColor: theme.colors.primary }]}
          onPress={() => {
            router.push("/sign-in");
          }}
        >
          <Text style={styles.btntext}>Sign In</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, { backgroundColor: theme.colors.secondary }]}
          onPress={() => {
            router.push("/sign-up");
          }}
        >
          <Text style={styles.btntext}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: theme.colors.typography,
  },
  buttons: {
    alignItems: "center",
    gap: 10,
    padding: 15,
    flexDirection: "column",
  },
  btn: {
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 100,
    marginVertical: 10,
  },
  btntext: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
}));
