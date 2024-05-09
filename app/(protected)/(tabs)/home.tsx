import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import RoundBtn from "@/components/RoundBtn";
import { useBalanceStore } from "@/store/balanceStore";
import { useHeaderHeight } from "@react-navigation/elements";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import WidgetList from "@/components/SortableList/WidgetList";

const Home = () => {
  const { styles, theme } = useStyles(stylesheet);
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();
  const headerHeight = useHeaderHeight();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };
  const handleLongPress = () => {
    console.log("Long pressed");
  };
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>R$</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundBtn icon={"add"} text={"Add money"} onPress={onAddMoney} />
        <RoundBtn
          icon={"refresh"}
          text={"Exchange"}
          onPress={clearTransactions}
        />
        <RoundBtn icon={"list"} text={"Details"} />
      </View>
      <Text>Transactions</Text>
      <ScrollView
        style={styles.transactions}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: theme.colors.typography2 }}>
            No transactions yet
          </Text>
        )}
        {transactions
          .slice()
          .reverse()
          .map((transaction) => (
            <View
              key={transaction.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                marginBottom: 13,
              }}
            >
              <View style={styles.circle}>
                <Ionicons
                  name={transaction.amount > 0 ? "add" : "remove"}
                  size={28}
                  color={theme.colors.typography}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 14,
                    color: theme.colors.typography,
                  }}
                >
                  {transaction.title}
                </Text>
                <Text style={{ color: theme.colors.typography2, fontSize: 12 }}>
                  {transaction.date.toLocaleString()}
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 16,
                  color: theme.colors.typography,
                }}
              >
                {transaction.amount}€
              </Text>
            </View>
          ))}
      </ScrollView>
      <Text>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};
const stylesheet = createStyleSheet((theme) => ({
  account: {
    margin: 80,
    alignItems: "center",
    marginBottom: 60,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  balance: {
    fontSize: 60,
    fontWeight: "bold",
    color: theme.colors.typography,
    justifyContent: "center",
  },
  currency: {
    fontSize: 30,
    color: theme.colors.typography,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 0,
  },
  transactions: {
    height: 190,
    marginHorizontal: 20,
    padding: 10,
    overflow: "hidden",
    borderColor: theme.colors.secondary,
    borderRadius: 16,
    borderLeftWidth: 2,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default Home;
