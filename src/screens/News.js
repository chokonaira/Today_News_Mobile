import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Card from "../components/Card";
import Header from "../components/Header";
import { news } from "../redux/actions/news";
import { useDispatch } from "react-redux";
import { headerDate } from "../helpers/date";
import { useSelector } from "react-redux";

export default function TodaysNews({ navigation }) {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.news);
  const loading = useSelector((state) => state.news.isLoading);

  React.useEffect(() => {
    dispatch(news());
  }, []);
  console.log(loading);
  return (
    <View style={styles.todayNews}>
      <Header
        date={headerDate()}
        onPress={() => navigation.openDrawer()}
        name="menu"
        title="Today News"
        navigation={navigation}
      />
      <View style={styles.container}>
        <ScrollView>
          {articles &&
            articles.articles.map((article, index) => {
              console.log(article);
              console.log(article, `hellllllllllo${index++}`);
              return (
                <Card
                  key={index + 1}
                  author={article.author}
                  sourceName={article.source.name}
                  imageUrl={article.urlToImage}
                  color={"red"}
                  onPress={() => {console.log('pressed')}}
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
  todayNews: {
    flex: 1,
    backgroundColor: "#DDDDDD",
  },
  text: {
    alignSelf: "center",
  },
});
