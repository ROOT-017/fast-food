import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SignUp = () => {
  const router = useRouter();
  return (
    <View>
      <Text>SignUp </Text>
      <Button
        title="Go to Sign In"
        onPress={() => {
          router.push("/sign-in");
        }}
      />
    </View>
  );
};

export default SignUp;
