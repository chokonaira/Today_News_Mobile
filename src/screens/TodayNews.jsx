import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NewsCard from "../components/NewsCard";

const TodaysNews = () => {
  return (
    <View style={styles.todayNews}>
      <NewsCard />
      <Text style={styles.text}>Today News</Text>
    </View>
  );
};

export default TodaysNews;

const styles = StyleSheet.create({
  todayNews: {
    flex: 1,
    backgroundColor: "#DDDDDD",
  },
  text: {
    alignSelf: "center",
  }
});