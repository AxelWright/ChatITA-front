import { useState, useEffect } from "react";
import { View } from "react-native";
import { IconButton, CloseIcon } from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { User } from "../../api"; // Ensure this is typed
import { useAuth } from "../../hooks"; // Ensure this returns a typed response
import { CreateChat, Search } from "../../components/Chat"; // Ensure these components are properly typed

// Assuming User class is properly typed and it has a getAll method that returns user objects
const userController = new User();

// Define a type for User objects if not already defined
type UserType = {
  id: string;
  name: string;
  // other fields as necessary
};

export function CreateChatScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { accessToken } = useAuth(); // Assume useAuth returns a structure with accessToken
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [usersResult, setUsersResult] = useState<UserType[] | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<CloseIcon />}
          padding={0}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getAll(accessToken);
        setUsers(response);
        setUsersResult(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken]);

  if (!usersResult) return null;

  return (
    <View>
      <Search data={users} setData={setUsersResult} />
      <CreateChat.ListUser users={usersResult} />
    </View>
  );
}
