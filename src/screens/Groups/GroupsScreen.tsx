import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { size } from "lodash";
import { Group } from "../../api";
import { useAuth } from "../../hooks";
import { screens } from "../../utils";
import { LoadingScreen } from "../../components/Shared";
import { ListGroups, Search } from "../../components/Group";

const groupController = new Group();


export function GroupsScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [groupsResult, setGroupsResult] = useState<Group[] | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<AddIcon />}
          padding={0}
          onPress={() =>
            navigation.navigate(screens.tab.groups.createGroupScreen)
          }
        />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await groupController.getAll(accessToken);
          const result = response.sort((a: Group, b: Group) => {
            return (
              new Date(b.last_message_date).getTime() - new Date(a.last_message_date).getTime()
            );
          });

          setGroups(result);
          setGroupsResult(result);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [accessToken])
  );

  const upGroupChat = (groupId: string) => {
    if (!groupsResult) return;

    const data = [...groupsResult];
    const fromIndex = data.map((group) => group._id).indexOf(groupId);
    const toIndex = 0;
    const element = data.splice(fromIndex, 1)[0];
    data.splice(toIndex, 0, element);
    setGroups([...data]);
  };

  if (!groupsResult) return <LoadingScreen />;

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