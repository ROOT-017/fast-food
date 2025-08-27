import { images } from "@/constants";
import React from "react";
import { Image, View } from "react-native";

interface ProfilePictureProps {
  image_url?: string;
}
const ProfilePicture = ({ image_url }: ProfilePictureProps) => {
  return (
    <View className=" justify-center items-center w-full  py-5 ">
      <View className="relative w-fit h-fit">
        <View className="justify-center items-center  overflow-hidden rounded-full h-28 w-28 bg-accent">
          <Image
            source={image_url ? { uri: image_url } : images.avatar}
            className="size-full"
            resizeMode="contain"
          />
        </View>
        <View className="justify-center items-center rounded-full absolute bottom-1 -right-1 bg-primary h-8 w-8 p-2 border border-white">
          <Image
            source={images.pencil}
            className="size-5"
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default ProfilePicture;
