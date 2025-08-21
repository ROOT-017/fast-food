import { Category } from "@/types";
import { cn } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  const [active, setActive] = useState(searchParams.category || "");

  const handlePress = (id: string) => {
    setActive(id);
    if (id === "all")
      router.setParams({
        category: undefined,
      });
    else
      router.setParams({
        category: id,
      });
  };
  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  return (
    <FlatList
      data={filterData}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.$id}
          className={cn(
            active === item.$id || (item.$id === "all" && !Boolean(active))
              ? "bg-amber-500"
              : "bg-white",
            "px-4 py-2 rounded-full mr-2"
          )}
          style={
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
          onPress={() => handlePress(item.$id)}
        >
          <Text
            className={cn(
              "body-medium",
              active === item.$id || (item.$id === "all" && !Boolean(active))
                ? "text-white"
                : "text-gray-200"
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.$id || item.name}
      contentContainerStyle={{
        paddingVertical: 5,
      }}
    />
  );
};

export default Filter;
