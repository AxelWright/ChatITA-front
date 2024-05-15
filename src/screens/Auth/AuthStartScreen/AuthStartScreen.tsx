import { SafeAreaView, View, Text, Image, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../utils';
import { assets } from '../../../assets';
import { styles } from './AuthStartScreen.styles';

export function AuthStartScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screens.auth.loginScreen);
  };

  return (
    <SafeAreaView style={styles.content as ViewStyle}>
      <Image source={assets.image.jpg.auth01} style={styles.img as ImageStyle} />

      <View>
        <Text style={styles.title as TextStyle}>Te damos la bienvenida a ChatITA</Text>
        <Text style={styles.description as TextStyle}>
          Una app desarrollada por y para estudiantes del ITA. Esta app no es un intento de clonar WhatsApp ni toma inspiración de ella, para nada. En lo absoluto :)
        </Text>
        <Text style={styles.description as TextStyle}>
          Este programa es público, ajeno a cualquier partido político. Queda prohibido el uso para fines distintos a los establecidos en el programa.
        </Text>

        <Text style={styles.btn as TextStyle} onPress={goToLogin}>
          Aceptar y continuar
        </Text>
      </View>
    </SafeAreaView>
  );
}