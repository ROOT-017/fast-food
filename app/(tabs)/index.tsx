import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import CardButton from "../../components/CardButton";

export default function Index() {
  const { user } = useAuthStore();
  // console.log(user);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList 
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <Pressable
              className={cn(
                "offer-card",
                isEven ? "flex-row-reverse" : "flex-row"
              )}
              style={{
                backgroundColor: item.color,
              }}
              android_ripple={{ color: "#ffff22" }}
            >
              {({ pressed }) => (
                <Fragment>
                  <View className="h-full w-1/2">
                    <Image
                      source={item.image}
                      className="size-full"
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    className={cn(
                      "offer-card__info",
                      isEven ? "pl-10" : "pr-10"
                    )}
                  >
                    <Text className="h1-bold text-white leading-tight">
                      {item.title}
                    </Text>
                    <Image
                      source={images.arrowRight}
                      resizeMode="contain"
                      className="size-10"
                      tintColor={"#fff"}
                    />
                  </View>
                </Fragment>
              )}
            </Pressable>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View className="flex-row w-full flex-between my-5">
              <View className="flex-start">
                <Text className="small-bold text-primary">DELIVER TO</Text>
                <TouchableOpacity className=" flex-center flex-row gap-x-1 mt-0.5">
                  <Text className="text-dark-100 paragraph-bold">Cameroon</Text>
                  <Image
                    source={images.arrowDown}
                    className="size-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <CardButton />
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        // ListFooterComponent={() => (
        //   <Button
        //     title="Try!"
        //     onPress={() => {
        //       Sentry.captureException(new Error("First error"));
        //     }}
        //   />
        // )}
      />
    </SafeAreaView>
  );
}
