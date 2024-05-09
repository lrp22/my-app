import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { darkTheme, lightTheme } from "@/styles/themes";
import CustomHeader from "@/components/CustomHeader";

export default function AppLayout() {
  const { theme } = useStyles();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          lightTheme.colors.primary || darkTheme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0.7,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="bitcoin" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
