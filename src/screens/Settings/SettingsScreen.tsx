// Importing components from 'react-native' and custom hooks and components
import { SafeAreaView } from "react-native";
import { useAuth } from "../../hooks";
import { UserInfo, Options } from "../../components/Settings";

// SettingsScreen functional component definition
export function SettingsScreen() {
  // Destructuring properties from the useAuth hook
  const { user, accessToken, logout, updateUser } = useAuth();

  // Rendering the settings screen with user information and options
  return (
    <SafeAreaView>
      {/* UserInfo component displaying the user's information */}
      <UserInfo user={user} />
      {/* Options component providing user options like logout and update */}
      <Options
        accessToken={accessToken}
        logout={logout}
        updateUser={updateUser}
      />
    </SafeAreaView>
  );
}
