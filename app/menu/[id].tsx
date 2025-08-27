import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { getMenuItem } from "@/lib/appwrite";
import { MenuItem } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
const ToppingsCard = () => {
  return (
    <View
      style={
        Platform.OS === "android"
          ? {
              shadowColor: "#878787",
              elevation: 10,
              // backgroundColor:'#3C2F2F'
            }
          : {}
      }
      className="rounded-3xl h-32 w-28 overflow-hidden bg-chocolate shadow-md shadow-black/10"
    >
      <View className="h-[60%] rounded-b-3xl justify-center items-center bg-white">
        <Image source={images.tomatoes} className="size-16" />
      </View>
      <View className="flex-row justify-between  items-center p-3  h-[40%]">
        <Text className="text-white">Tomato</Text>
        <TouchableOpacity className="h-5 w-5 rounded-full bg-primary justify-center items-center p-2">
          <Image source={images.plus} className="size-3" tintColor={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const InfoSect = ({ rating }: { rating: number }) => {
  return (
    <View className="my-2 justify-center items-center">
      <View className="flex-row justify-between items-center w-full bg-accent p-3 rounded-full">
        <View className="items-center flex-row gap-x-2 h-full">
          <Image
            className="size-8"
            source={images.dollar}
            resizeMode="contain"
          />
          <Text className="font-semibold">Free Delivery</Text>
        </View>
        <View className="items-center flex-row gap-x-2 h-full">
          <Image
            className="size-4"
            source={images.clock}
            resizeMode="contain"
          />
          <Text className="font-semibold">20 - 30 mins</Text>
        </View>
        <View className="items-center flex-row gap-x-2">
          <Image className="size-5" source={images.star} resizeMode="contain" />
          <Text className="font-semibold">{rating}</Text>
        </View>
      </View>
    </View>
  );
};

const MenuOverView = ({ data }: { data: MenuItem | null }) => {
  console.log(data?.category_name);

  return (
    <View className="flex-row">
      <View className="">
        <Text className="text-dark-100 font-semibold text-xl">
          {data?.name}
        </Text>
        <Text className="text-gray-100 text-lg">{data?.categories.name}</Text>
        <View className="flex-row items-center mt-2 gap-3">
          <Rating
            // showRating
            imageSize={18}
            readonly
            startingValue={data?.rating}
            // onFinishRating={this.ratingComted}
            style={{ paddingVertical: 10 }}
          />
          <Text className="text-lg text-gray-200 font-quicksand-bold">
            {data?.rating}/5
          </Text>
        </View>
        <View className="flex-row items-center mt-2 gap-3">
          <Image
            source={images.dollar}
            className="size-6 w-fit h-fit"
            resizeMode="contain"
          />
          <Text className="m-0 text-xl font-quicksand-bold font-bold text-dark-100">
            {data?.price}
          </Text>
        </View>
        <View className="flex-row items-center mt-2 gap-3">
          <View>
            <Text className="text-lg text-gray-100">Calories</Text>
            <Text className="text-lg font-quicksand-bold font-bold text-dark-100">
              {data?.calories} Cal
            </Text>
          </View>
          <View>
            <Text className="text-lg text-gray-100">Protein</Text>
            <Text className="text-lg font-quicksand-bold font-bold text-dark-100">
              {data?.protein}g
            </Text>
          </View>
        </View>
      </View>
      <View className="max-h-[25vh] relative  w-[50%]">
        <Image
          source={images.burgerTwo}
          className="absolute bottom-0 right-0 size-52"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
const MenuDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useFetch(() => getMenuItem(id));
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 ">
        <View className="py-5">
          <CustomHeader />
          <MenuOverView data={data} />
          <InfoSect rating={4.5} />
          <Text className="text-base text-light-text my-2">
            {data?.description}
          </Text>
          <View className="my-5">
            <Text className="text-black font-semibold text-xl mb-5">
              Toppings
            </Text>
            <FlatList
              data={Array.from({ length: 10 })}
              horizontal
              renderItem={({ item }) => <ToppingsCard />}
              keyExtractor={(_, index) => index.toString()}
              contentContainerClassName="gap-x-8 my-4"
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View className="pb-4 my-5">
            <Text className="text-black font-semibold text-xl ">
              Side Options
            </Text>
            <FlatList
              data={Array.from({ length: 10 })}
              horizontal
              renderItem={({ item }) => <ToppingsCard />}
              keyExtractor={(_, index) => index.toString()}
              contentContainerClassName="gap-x-8 py-5"
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View className=" justify-center items-center ">
            <View
              // style={
              //   Platform.OS === "android"
              //     ? { elevation: 10, shadowColor: "#878787" }
              //     : {}
              // }
              className="rounded-3xl p-4  w-full justify-between flex-row  overflow-hidden items-center"
              style={{
                shadowColor: "#878787",
                elevation: 10,
                backgroundColor: "#fff",
              }}
            >
              <View className="flex-row items-center h-full gap-x-4 mt-2">
                <TouchableOpacity
                  // onPress={() => decreaseQty(item.id, item.customizations!)}
                  className="cart-item__actions"
                >
                  <Image
                    source={images.minus}
                    className="size-1/2"
                    resizeMode="contain"
                    tintColor={"#FF9C01"}
                  />
                </TouchableOpacity>

                <Text className="base-bold text-dark-100">{5}</Text>

                <TouchableOpacity
                  // onPress={() => increaseQty(item.id, item.customizations!)}
                  className="cart-item__actions"
                >
                  <Image
                    source={images.plus}
                    className="size-1/2"
                    resizeMode="contain"
                    tintColor={"#FF9C01"}
                  />
                </TouchableOpacity>
              </View>
              <CustomButton
                title="Add to cart ($26)"
                textStyle="text-semibold"
                style="w-1/2 !px-18"
                leftIcon={<Image source={images.bag} className="size-5" />}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuDetail;
