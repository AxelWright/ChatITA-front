import { useState, useEffect } from "react";
import { View } from "react-native";
import { IconButton, CloseIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { CreateGrupo, Search } from "../../components/Group";

// Define the structure for a user object
interface UserType {
  // Define properties of a user object here
}

// Create an instance of the User controller
const userController = new User();

// CreateGroupScreen component
export function CreateGroupScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  // Use state to manage users and search results, initializing as empty arrays
  const [users, setUsers] = useState<UserType[]>([]);
  const [usersResult, setUsersResult] = useState<UserType[]>([]);
  // Use state to manage the current step and selected user IDs
  const [step, setStep] = useState<number>(1);
  const [usersId, setUsersId] = useState<string[]>([]);

  // Set options for the navigation header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon={<CloseIcon />}
          padding={0}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, step]);

  // Fetch all users when the component mounts
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

  // Function to advance to the next step
  const nextStep = () => setStep((prevState) => prevState + 1);

  // Return null if usersResult is not loaded yet
  if (!usersResult.length) return null;

  // Render the create group screen with search and user list or form based on the step
  return (
    <View>
      {step === 1 && (
        <>
          <Search data={users} setData={setUsersResult} />
          <CreateGrupo.ListUser
            users={usersResult}
            nextStep={nextStep}
            setUsersId={setUsersId}
          />
        </>
      )}
      {step === 2 && <CreateGrupo.Form usersId={usersId} />}
    </View>
  );
}
