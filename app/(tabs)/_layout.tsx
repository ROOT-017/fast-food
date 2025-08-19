import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Layout = () => {
  const isAuthenticated = false;
  if (!isAuthenticated) return <Redirect href={"/sign-in"} />;
  return (
    <View>
      <Text>Layout</Text>
    </View>
  );
};

export default Layout;
