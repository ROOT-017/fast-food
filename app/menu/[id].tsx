import CustomHeader from "@/components/CustomHeader";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MenuDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-5">
        <CustomHeader />
        <Text>MenuDetail:{id}</Text>
      </View>
    </SafeAreaView>
  );
};

export default MenuDetail;
