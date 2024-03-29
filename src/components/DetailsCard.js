import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, CardItem, Text } from "native-base";
import ProgressBar from "react-native-progress";
import Image from "react-native-image-progress";

export default function DetailsCard({ content, imageUrl }) {
  return (
    <Card>
      <CardItem cardBody>
        <Image
          source={{
            uri: imageUrl,
          }}
          indicator={ProgressBar}
          indicatorProps={{
            size: 35,
            color: "#00A6FB",
            unfilledColor: "rgba(200, 200, 200, 0.2)",
          }}
          style={styles.image}
        />
      </CardItem>
      <View>
        <Text style={styles.content}>{content}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: { height: 300, width: 100, flex: 1 },
  content: { margin: 8, fontSize: 15 },
});
