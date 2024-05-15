import { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { User, Group } from "../../api";
import { useAuth } from "../../hooks";
import { Search, ListUserAddParticipants } from "../../components/Group";

// Define the structure for a user object
interface UserType {
  // Define properties of a user object here
}

// Create instances of the controllers
const userController = new User();
const groupController = new Group();

// AddUserGroupScreen component
export function AddUserGroupScreen() {
  // Use state to manage users and search results, initializing as empty arrays
  const [users, setUsers] = useState<UserType[]>([]);
  const [usersResult, setUsersResult] = useState<UserType[]>([]);
  const { accessToken } = useAuth();
  // Extract params from the route
  const { params } = useRoute<any>(); // Use any or a more specific type for route parameters
  const navigation = useNavigation();

  // Fetch users except participants of the group when the component mounts
  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getUsersExeptParticipantsGroup(
          accessToken,
          params.groupId
        );
        setUsers(response);
        setUsersResult(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, params.groupId]);

  // Function to add participants to the group
  const addParticipants = async (ids: string[]) => {
    try {
      await groupController.addParticipants(accessToken, params.groupId, ids);
      // Go back twice to return to the previous screen before the current one
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  // Render the add user to group screen with search and list components
  return (
    <View>
      <Search data={users} setData={setUsersResult} />
      <ListUserAddParticipants
        users={usersResult}
        addParticipants={addParticipants}
      />
    </View>
  );
}
