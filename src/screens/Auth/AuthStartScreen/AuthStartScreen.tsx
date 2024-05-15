import { SafeAreaView, View, Text, Image, ImageSourcePropType, TextStyle, ViewStyle, ImageStyle } from 'react-native';
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
        <Text style={styles.title as TextStyle}>Te damos la bienvenida a ChatApp</Text>
        <Text style={styles.description as TextStyle}>
          Recomendamos usar este servicio con responsabilidad para disfrutar de
          la experiencia que proporciona esta app desarrollada con cariño
        </Text>
        <Text style={styles.description as TextStyle}>
          Consulta nuestras Política de privacidad. Pulsa "Aceptar y continuar"
          para aceptar las Condiciones del servicio
        </Text>

        <Text style={styles.btn as TextStyle} onPress={goToLogin}>
          Aceptar y continuar
        </Text>
      </View>
    </SafeAreaView>
  );
}