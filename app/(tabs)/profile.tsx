import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import ProfilePicture from "@/components/ProfilePicture";
import { images } from "@/constants";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { User } from "@/types";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DetailEntryProps {
  icon: ImageSourcePropType;
  label: string;
  value: string;
}
const DetailEntry = ({ icon, label, value }: DetailEntryProps) => {
  return (
    <View className="flex-row gap-4 w-full">
      <View className=" items-center  p-2 h-16 w-16 bg-accent justify-center overflow-hidden rounded-full">
        <Image source={icon} className="size-5 " resizeMode="contain" />
      </View>
      <View className="gap-y-1 w-full">
        <Text className="text-base text-light-text">{label}</Text>
        <Text className="text-base text-dark-100 font-semibold">{value}</Text>
      </View>
    </View>
  );
};
const DetailForm = ({ user }: { user: User | null }) => {
  return (
    <View className="p-8">
      <View className="rounded-xl bg-white h-fit gap-y-8 p-4">
        <DetailEntry
          icon={images.user}
          label="Fill Name"
          value={user?.name || ""}
        />
        <DetailEntry
          icon={images.envelope}
          label="Email"
          value={user?.email || ""}
        />
        <DetailEntry
          icon={images.phone}
          label="Phone Number"
          value="+1 555 123 4567"
        />
        <DetailEntry
          icon={images.location}
          label="Address 1 - (Home)"
          value={"123 Main Street, Springfield, IL 62704"}
        />
        <DetailEntry
          icon={images.location}
          label="Address 2 - (Work)"
          value="221B Rose Street, Foodville, FL 12345"
        />
      </View>
    </View>
  );
};
const Profile = () => {
  const { setIsAuthenticated, isAuthenticated, user } = useAuthStore();
  // console.log(user);

  const handleSignout = async () =>
    await signOut().then(() => {
      setIsAuthenticated(!isAuthenticated);
      router.push("/(auth)/sign-in");
    });
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <ScrollView className="flex-1 px-5 ">
        <View className="flex-1 border-3 items-center pt-5">
          <CustomHeader title="Profile" />
          <ProfilePicture image_url={user?.avatar} />
          <DetailForm user={user} />
          <CustomButton title="Edit Profile" />
          <CustomButton
            title="Log Out"
            leftIcon={
              <Image
                source={images.logout}
                className="size-5"
                resizeMode="contain"
                tintColor={"#F14141"}
              />
            }
            onPress={handleSignout}
            style="bg-whites border-[1px] border-error bg-[#F141410D] mt-4"
            textStyle="!text-error"
          />
        </View>
        <View className="h-28" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
