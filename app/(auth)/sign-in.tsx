import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password)
      return Alert.alert("Error", "Please fill in all fields");
    setIsSubmitting(true);
    try {
      await signIn({
        email,
        password,
      });
      setIsAuthenticated(!isAuthenticated);
      router.replace("/");
    } catch (error: any) {
      console.error("Sign In Error:", error);
      Alert.alert("Error", error?.message);
      // Sentry.captureEvent(error)
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Email"
        value={form.email}
        secureTextEntry={false}
        onChangeText={(text) => setForm({ ...form, email: text })}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <CustomInput
        label="Password"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(text) => setForm({ ...form, password: text })}
        placeholder="Enter your password"
      />
      <CustomButton title="Sign In" onPress={submit} isLoading={isSubmitting} />
      <View className="flex-row items-center justify-center gap-2">
        <Text className="base-regular text-gray-10">Don&apos;t have an account?</Text>
        <Link className="base-bold text-primary" href={"/(auth)/sign-up"}>
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
