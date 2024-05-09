import React, { forwardRef } from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";

// Define the stylesheet outside of the component using createStyleSheet
const stylesheet = createStyleSheet((theme) => ({
  container: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
}));

// Type the props including the forwarded ref
type RoundBtnProps = {
  icon: typeof Ionicons.defaultProps;
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  // Include other props as needed
};

// Explicitly type the ref as Ref<View>
const RoundBtn = forwardRef<View, RoundBtnProps>((props, ref) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Pressable ref={ref} style={styles.container} onPress={props.onPress}>
      <View style={styles.circle}>
        <Ionicons name={props.icon} size={30} color="white" />
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
});

export default RoundBtn;
