import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from "react-native";

// Define interfaces para cada estilo de componente según sus propiedades.
interface Styles {
  content: ViewStyle;
  img: ImageStyle;
  title: TextStyle;
  description: TextStyle;
  btn: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  content: {
    flex: 1,
    margin: 20,
    marginTop: 0,
  },
  img: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginVertical: 20,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    color: "#fff",
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 20,
  },
  btn: {
    color: "#0891b2",
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
    marginTop: 30,
  },
});