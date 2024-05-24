import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { User, Group } from "../../api";
import { useAuth } from "../../hooks";
import { Search, ListUserAddParticipants } from "../../components/Group";

const userController = new User();
const groupController = new Group();

type RouteParams = {
  groupId: string;
};

type AddUserGroupScreenRouteProp = RouteProp<{ params: RouteParams }, 'params'>;

export function AddUserGroupScreen() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [usersResult, setUsersResult] = useState<User[] | null>(null);
  const { accessToken } = useAuth();
  const { params } = useRoute<AddUserGroupScreenRouteProp>();
  const navigation = useNavigation();

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

  const addParticipants = async (ids: string[]) => {
    try {
      await groupController.addParticipants(accessToken, params.groupId, ids);
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

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
