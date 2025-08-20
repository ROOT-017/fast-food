import { CustomInputProps } from "@/types";
import cn from "clsx";
import React from "react";
import { Text, TextInput, View } from "react-native";

const CustomInput = ({
  label,
  onChangeText,
  placeholder,
  value,
  keyboardType = "default",
  secureTextEntry = false,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View className="w-full ">
      <Text className="label">{label}</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "input",
          isFocused ? "border-primary" : "border-gary-300"
        )}
      />
    </View>
  );
};

export default CustomInput;
