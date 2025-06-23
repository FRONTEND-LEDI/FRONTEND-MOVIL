import { authContext } from "@/app/context/authContext";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
    const router = useRouter();
    const { logout,isLogin } = useContext(authContext);
    
    useEffect(() => {
    const verificarSesion = async () => {
        const token = await SecureStore.getItemAsync("token");
        if (!token || !isLogin) {
            router.replace("/(auth)/signin");
        }
    };
    verificarSesion();
}, [isLogin, router]);


    return (
        <View>
            <Text>Home</Text>
            <Button title='LogOut' onPress={logout} />
        </View>
    );
}