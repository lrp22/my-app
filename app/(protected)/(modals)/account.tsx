import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSupabase } from "@/components/supabase-provider";

const Account = () => {
  const { signOut } = useSupabase();
  return (
    <Pressable
      style={{ marginTop: 150 }}
      onPress={() => {
        signOut();
      }}
    >
      <Text style={{ fontSize: 50 }}>Sign Out</Text>
    </Pressable>
  );
};

export default Account;
