// app/(auth)/signin.tsx
import { useRouter } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import { useContext, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SignInApi } from "../api/auth";
import { authContext } from "../context/authContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false); // Estado local para el proceso de login en el botón
  const { setIsLogin } = useContext(authContext); 
  const router = useRouter();

  const handleLogin = async () => {
    setIsSigningIn(true); 
    try {
    
      const res = await SignInApi(email, password);
      
      if (!res?.token) {
        Alert.alert("Error de Login", res?.msg || "Credenciales incorrectas.");
        return;
      }
      console.log("Token recibido:", res.token);

      //  Guarda el token
      await SecureStorage.setItemAsync("token", res.token);

      const userReq = await fetch("http://192.168.0.20:3402/getUser", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${res.token}`,
        },
      });
      
      const userRes = await userReq.json();
      console.log("Datos del usuario recibidos:", userRes);

       setIsLogin(true);
      
      router.replace("/(tabs)/home"); 
      
      
      
    } catch (error) {
      console.error("Error en el login:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor. Inténtalo de nuevo.");
      await SecureStorage.deleteItemAsync("token"); 
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity 
        onPress={handleLogin} 
        disabled={isSigningIn}
        style={styles.button}
      >
        {isSigningIn ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.replace("./signup")} style={styles.signupButton}>
        <Text style={styles.signupText}>Registrarme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 20,
    padding: 10,
  },
  signupText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});