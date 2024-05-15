import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "native-base";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Group } from "../../../api";
import { useAuth } from "../../../hooks";
import { GroupProfile } from "../../../components/Group";
import { styles } from "./GroupProfileScreen.styles";

// Define the structure for a group object
interface GroupType {
  // Define properties of a group object here
}

// Create an instance of the Group controller
const groupController = new Group();

// GroupProfileScreen component
export function GroupProfileScreen() {
  const { params } = useRoute<any>(); // Use any or a more specific type for route parameters
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  // Use state to manage the group object and reload flag
  const [group, setGroup] = useState<GroupType | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  // Function to toggle the reload state
  const onReload = () => setReload((prevState) => !prevState);

  // Fetch group details when the component mounts or reload state changes
  useEffect(() => {
    (async () => {
      try {
        const response = await groupController.obtain(
          accessToken,
          params.groupId
        );
        setGroup(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, params.groupId, reload]);

  // Function to handle exiting the group
  const exitGroup = async () => {
    try {
      await groupController.exit(accessToken, params.groupId);
      // Go back twice to return to the previous screen before the current one
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  // Return null if the group is not loaded yet
  if (!group) return null;

  // Render the group profile screen with group info and participants
  return (
    <ScrollView style={styles.content}>
      <GroupProfile.Info group={group} setGroup={setGroup} />
      <GroupProfile.Participants group={group} onReload={onReload} />

      <View style={styles.actionsContent}>
        <Button colorScheme="secondary" onPress={exitGroup}>
          Leave Group
        </Button>
      </View>
    </ScrollView>
  );
}
