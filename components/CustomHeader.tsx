import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={{ paddingTop: top }}>
      <View style={[styles.container]}>
        <Link href={"/(protected)/(modals)/account"} asChild>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.secondary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.colors.typography,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              SG
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={theme.colors.primary}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={theme.colors.typography}
          />
        </View>
        <View style={styles.circle}>
          <Ionicons
            name={"stats-chart"}
            size={20}
            color={theme.colors.primary}
          />
        </View>
        <View style={styles.circle}>
          <Ionicons name={"card"} size={20} color={theme.colors.primary} />
        </View>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  btn: {
    padding: 10,
    backgroundColor: theme.colors.secondary,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.secondary,
    borderRadius: 30,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: theme.colors.secondary,
    color: theme.colors.typography,
    borderRadius: 30,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default CustomHeader;
