import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password)
      return Alert.alert("Error", "Please enter valid fields");

    setIsSubmitting(true);
    try {
      await createUser({
        name,
        email,
        password,
      });
      router.push("/(auth)/sign-in");
    } catch (error: any) {
      console.error("Sign In Error:", error);
      Alert.alert("Error", error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Name"
        value={form.name}
        secureTextEntry={false}
        onChangeText={(text) => setForm({ ...form, name: text })}
        placeholder="Enter your full name"
      />
      <CustomInput
        label="Email"
        value={form.email}
        secureTextEntry={false}
        keyboardType="email-address"
        onChangeText={(text) => setForm({ ...form, email: text })}
        placeholder="Enter your email"
      />
      <CustomInput
        label="Password"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(text) => setForm({ ...form, password: text })}
        placeholder="Enter your password"
      />
      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting} />
      <View className="flex-row items-center justify-center gap-2">
        <Text className="base-regular text-gray-10">
          Already have an account?
        </Text>
        <Link className="base-bold text-primary" href={"/(auth)/sign-in"}>
          <Text> Sign In</Text>
        </Link>
      </View>
      r
    </View>
  );
};

export default SignUp;
