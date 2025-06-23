import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { SignUpApi } from "../api/auth";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    lastName: "",
    birthDate: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const pagerRef = useRef<PagerView>(null);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleChange = (field: string, value: string | Date) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goToNextStep = () => {
    if (pagerRef.current) {
      pagerRef.current.setPage(step + 1);
      setStep(step + 1);
    }
  };

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) handleChange("birthDate", selectedDate);
  };

  const handleRegister = async () => {
    try {
      const {
        username,
        name,
        lastName,
        birthDate,
        email,
        password,
      } = formData;

      const formattedDate = birthDate.toISOString().split("T")[0];

      const res = await SignUpApi(
        username,
        name,
        lastName,
        formattedDate,
        email,
        password
      );

      if (res?.result) {
        router.replace("/signin");
      } else {
        Alert.alert("Error", res?.msg || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert("Error", "Error de conexión con el servidor");
    }
  };

  return (
    <PagerView
      ref={pagerRef}
      style={{ flex: 1 }}
      initialPage={0}
      
    >
      {/* datos personales*/}
      <View key="1" className="flex-1 bg-white justify-center px-6 py-">
        
        <Text className="text-3xl font-bold text-center mb-1 text-primary opacity-80">Comienza ahora</Text>
        <Text className="text-gray-500 text-center mb-4 text base">
          Ingresa tus datos personales para personalizar tu experiencia</Text>

        <TextInput
          placeholder="Nombre"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
          className="mb-4 p-3 bg-white rounded-lg border border-primary"
        />

        <TextInput
          placeholder="Apellido"
          value={formData.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          className="mb-4 p-3 bg-white rounded-lg border border-primary"
        />

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="mb-4 p-3 bg-white rounded-lg border border-primary"
        >
          <Text className="text-gray-500">
            Fecha de nacimiento
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.birthDate}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={onChangeDate}
          />
        )}

        <TextInput
          placeholder="Nombre de usuario"
          value={formData.username}
          onChangeText={(text) => handleChange("username", text)}
          className="mb-4 p-3 bg-white rounded-lg border border-primary"
        />

        <TouchableOpacity
          onPress={goToNextStep}
          className="bg-primary py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>

      {/*credenciales*/}
      <View key="2" className="flex-1 bg-white justify-center px-6 py-8">
        <Text className="text-3xl font-bold text-center mb-8 text-primary opacity-80">Comienza ahora</Text>
        <Text className="text-gray-500 text-center mb-4 text base"> Crea tus credenciales para acceder de forma segura</Text>
        <TextInput
          placeholder="Correo"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          className="mb-4 p-3 bg-white rounded-lg border border-primary"
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          className="mb-4 p-3 bg-white rounded-lg border border-primary"
        />

        <TouchableOpacity
          onPress={handleRegister}
          className="bg-primary py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            Crear cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </PagerView>
  );
}
