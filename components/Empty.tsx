import { images } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const Empty = ({ message }: { message: string }) => {
  return (
    <View className="flex-1 justify-center items-center " >
      <Image
        source={images.emptyState}
        className="size-1/2"
        resizeMode="contain"
      />
      <Text className="text-base text-gray-200">
        {message}
      </Text>
    </View>
  );
};

export default Empty;
