import { MenuItem } from "@/types";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item: { name, price, image_url } }: { item: MenuItem }) => {
  // const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;

  const imageUrl = `${image_url}`;

  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />

      <Text className="text-center base-bold text-dark-100 mb-2">{name}</Text>
      <Text className="body-regular text-gray-200 mt-4">From ${price}</Text>
      <TouchableOpacity>
        <Text className="text-primary text-xs mt-2">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
