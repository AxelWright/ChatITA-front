import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { size } from "lodash";
import { Group } from "../../api";
import { useAuth } from "../../hooks";
import { screens } from "../../utils";
import { LoadingScreen } from "../../components/Shared";
import { ListGroups, Search } from "../../components/Group";

// Define the structure for a group object
interface GroupType {
  _id: string;
  last_message_date: string;
  // ... other properties of the group
}

// Create an instance of the Group controller
const groupController = new Group();

// GroupsScreen component
export function GroupsScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  // Use state to manage groups and search results, initializing as empty arrays
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [groupsResult, setGroupsResult] = useState<GroupType[]>([]);

  // Set options for the navigation header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<AddIcon />}
          padding={0}
          onPress={() => navigation.navigate(screens.tab.groups.createGroupScreen)}
        />
      ),
    });
  }, [navigation]);

  // Fetch and sort groups when the screen is focused
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await groupController.getAll(accessToken);
          const result = response.sort((a, b) => (
            new Date(b.last_message_date).getTime() - new Date(a.last_message_date).getTime()
          ));

          setGroups(result);
          setGroupsResult(result);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [accessToken])
  );

  // Function to move a group to the top of the list
  const upGroupChat = (groupId: string) => {
    const data = groupsResult;
    const fromIndex = data.findIndex(group => group._id === groupId);
    if (fromIndex !== -1) {
      const element = data.splice(fromIndex, 1)[0];
      data.unshift(element);
      setGroups([...data]);
    }
  };

  // Render a loading screen if groups are not yet loaded
  if (!groupsResult.length) return <LoadingScreen />;

  // Render the main screen with search and list of groups
  return (
    <View>
      {size(groups) > 0 && <Search data={groups} setData={setGroupsResult} />}
      <ListGroups
        groups={size(groups) === size(groupsResult) ? groups : groupsResult}
        upGroupChat={upGroupChat}
      />
    </View>
  );
}
