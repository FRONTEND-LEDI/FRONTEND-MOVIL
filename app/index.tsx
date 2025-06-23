// app/index.tsx
import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native'; // Importar StyleSheet
import { authContext } from './context/authContext';

export default function Index() {
  const { isLogin, isLoading } = useContext(authContext);
  const router = useRouter();

  useEffect(() => {

    // Solo actuar una vez que la carga inicial de autenticación haya terminado
    if (isLoading) {
      return;
    }

    if (isLogin) {
      
      router.replace("/(tabs)/home");
    } else {
      
      router.replace("/(auth)/signin");
    }
  }, [isLogin, isLoading, router]); 

  // Muestra un indicador de carga mientras isLoading es true

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
});