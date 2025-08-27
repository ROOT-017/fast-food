import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants";
import { CustomHeaderProps } from "@/types";

const CustomHeader = ({ title, onPressSearch }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View className="custom-header">
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={images.arrowBack}
          className="size-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
      {title && <Text className="base-semibold text-dark-100">{title}</Text>}
      <TouchableOpacity
        onPress={onPressSearch ?? (() => router.push("/search"))}
      >
        <Image source={images.search} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
