import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { setIsAuthenticated, isAuthenticated } = useAuthStore();
  const handleSignout = async () =>
    await signOut().then(() => {
      setIsAuthenticated(!isAuthenticated);
      router.push("/(auth)/sign-in");
    });
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center border-3 items-center px-5">
        <CustomButton
          title="Log Out"
          leftIcon={
            <Image
              source={images.logout}
              className="size-5"
              resizeMode="contain"
              tintColor={"#fff"}
            />
          }
          onPress={handleSignout}
          // style="bg-whites border-2 border-red-500"
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
