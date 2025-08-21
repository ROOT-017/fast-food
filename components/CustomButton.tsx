import { CustomButtonProps } from "@/types";
import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  isLoading,
  leftIcon,
  onPress,
  style,
  textStyle,
  title,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn("custom-btn", style)} onPress={onPress}>
      <View className="flex-center flex-row gap-x-2">
        {leftIcon}
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text className={cn("paragraph-bold text-white-100", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
