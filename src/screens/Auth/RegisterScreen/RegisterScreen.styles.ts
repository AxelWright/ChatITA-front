import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Define interfaces para clasificar los tipos de estilo según los componentes que los usarán.
interface Styles {
  content: ViewStyle;
  title: TextStyle;
  register: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  content: {
    margin: 20,
  },
  title: {
    color: "#fff",
    marginVertical: 15,
    opacity: 0.6,
  },
  register: {
    color: "#0891b2",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 30,
  },
});
