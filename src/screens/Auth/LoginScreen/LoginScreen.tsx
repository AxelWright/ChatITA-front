import { View, Text, TextStyle, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../utils";
import { LoginForm } from "../../../components/Auth";
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screens.auth.registerScreen);
  };

  return (
    <View style={styles.content as ViewStyle}>
      <Text style={styles.title as TextStyle}>Entra y empieza a chatear</Text>

      <LoginForm />

      <Text style={styles.register as TextStyle} onPress={goToRegister}>
        Registrarse
      </Text>

      <Text style={styles.info as TextStyle}>
        Debes de tener al menos 18 años de edad para registrarte en ChatITA.
      </Text>
    </View>
  );
}
