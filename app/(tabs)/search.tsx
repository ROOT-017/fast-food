import seed from "@/lib/seed";
import { Sentry } from "@/utils";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  return (
    <SafeAreaView>
      <Text>Search</Text>
      <Button
        title="Seed"
        onPress={() => {
          console.log("Seeding...");
          
          seed().catch((onrejected) => {
            console.log(onrejected);
            Sentry.captureEvent(onrejected);
          });
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
