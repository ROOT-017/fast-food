import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/types";
import { Link } from "expo-router";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({
  item: { name, price, image_url, $id },
}: {
  item: MenuItem;
}) => {
  // const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;
  const { addItem } = useCartStore();
  const imageUrl = `${image_url}`;

  return (
    <Link href={`/menu/${$id}`} asChild>
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
        <TouchableOpacity
          onPress={() =>
            addItem({ id: $id, price, name, customizations: [], image_url })
          }
        >
          <Text className="text-primary text-xs mt-2">Add to Cart +</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

export default MenuCard;
