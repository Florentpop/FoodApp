import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import categoriesData from "../assets/data/categoriesData";
import popularData from "../assets/data/popularData";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../assets/colors";

const DetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const renderIngredientsItem = ({ item }) => {
    return (
      <View
        style={[
          styles.ingredientsItemWrapper,
          { marginLeft: item.id == 1 ? 20 : 0 },
        ]}
      >
        <TouchableOpacity onPress={() => alert("Indgredient added")}>
          <Image source={item.image} style={styles.ingredientsImage} />
        </TouchableOpacity>
      </View>
    );
  };

  {
    /* Fonts */
  }
  let [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../assets/font/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("../assets/font/Montserrat-SemiBold.ttf"),
    "Montserrat-Regular": require("../assets/font/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/font/Montserrat-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather
                  name="chevron-left"
                  size={14}
                  color={colors.textDark}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.headerRight}>
              <MaterialCommunityIcons
                name="star"
                size={14}
                color={colors.white}
              />
            </View>
          </View>
        </SafeAreaView>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{item.title}</Text>
          </View>

          {/* Price */}
          <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>
              GH{"\u20B5"} {item.price}
            </Text>
          </View>

          {/* Pizza Info */}
          <View style={styles.infoWrapper}>
            <View style={styles.infoLeftWrapper}>
              <View style={styles.infoItemrapper}>
                <Text style={styles.infoItemTitle}>Size</Text>
                <Text style={styles.infoItemText}>
                  {item.sizeName} {item.sizeNumber}"
                </Text>
              </View>

              <View style={styles.infoItemrapper}>
                <Text style={styles.infoItemTitle}>Crust</Text>
                <Text style={styles.infoItemText}>{item.crust}</Text>
              </View>

              <View style={styles.infoItemrapper}>
                <Text style={styles.infoItemTitle}>Delivery in</Text>
                <Text style={styles.infoItemText}>{item.deliveryTime} min</Text>
              </View>
            </View>
            <View>
              <Image source={item.image} style={styles.itemImage} />
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.ingredientsWrapper}>
            <Text style={styles.ingredientsTitle}>Ingredients</Text>
            <View style={styles.ingredientsListWrapper}>
              <FlatList
                data={item.ingredients}
                renderItem={renderIngredientsItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* Place an Order */}
          <TouchableOpacity
            onPress={() => alert("Your Order has been place FLOSA")}
          >
            <View style={styles.orderWrapper}>
              <Text style={styles.orderText}>Place an Order</Text>
              <Feather name="chevron-right" size={18} color={colors.black} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 10,
  },
  headerLeft: {
    borderColor: colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  titlesWrapper: {
    paddingHorizontal: 20,
    marginTop: 35,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 32,
    color: colors.textDark,
    width: "60%",
  },
  priceWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  priceText: {
    color: colors.price,
    fontFamily: "Montserrat-Bold",
    fontSize: 32,
  },
  infoWrapper: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLeftWrapper: {
    paddingLeft: 20,
  },
  infoItemrapper: {
    marginBottom: 20,
  },
  infoItemTitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: colors.textLight,
  },
  infoItemText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    color: colors.textDark,
  },

  itemImage: {
    resizeMode: "contain",
    marginLeft: 30,
  },
  ingredientsWrapper: {
    marginTop: 10,
  },
  ingredientsTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: colors.textDark,
    paddingHorizontal: 20,
  },
  ingredientsListWrapper: {
    paddingVertical: 20,
  },
  ingredientsItemWrapper: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginRight: 15,
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 12,
  },
  ingredientsImage: {
    resizeMode: "contain",
  },
  orderWrapper: {
    marginTop: 60,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  orderText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginRight: 10,
  },
});

export default DetailScreen;
