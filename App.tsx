import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./src/contexts";
import { HandlerNavigation } from "./src/navigations";
import "intl";
import "intl/locale-data/jsonp/es";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthProvider>
          <HandlerNavigation />
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
