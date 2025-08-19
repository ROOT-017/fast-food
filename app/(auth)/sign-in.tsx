import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SingIn = () => {
  const router = useRouter();
  return (
    <View>
      <Text>SingIn</Text>
      <Button
        title="Go to Sign Up"
        onPress={() => {
          router.push("/sign-up");
        }}
      />
    </View>
  );
};

export default SingIn;
