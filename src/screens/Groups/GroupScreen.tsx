import React, { useState, useEffect } from "react";
import { View } from "native-base";
import { useRoute, RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupMessage, UnreadMessages } from "../../api";
import { useAuth } from "../../hooks";
import { HeaderGroup } from "../../components/Navigation";
import { LoadingScreen } from "../../components/Shared";
import { ListMessages, GroupForm } from "../../components/Group";
import { ENV, socket } from "../../utils";

const groupMessageController = new GroupMessage();
const unreadMessagesController = new UnreadMessages();

type RouteParams = {
  groupId: string;
};

type GroupScreenRouteProp = RouteProp<{ params: RouteParams }, 'params'>;

interface Message {
  id: string;
  text: string;
  // Add other message properties as needed
}

export function GroupScreen() {
  const { params: { groupId } } = useRoute<GroupScreenRouteProp>();
  const { accessToken } = useAuth();
  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(ENV.ACTIVE_GROUP_ID, groupId);
    })();

    return async () => {
      await AsyncStorage.removeItem(ENV.ACTIVE_GROUP_ID);
    };
  }, [groupId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await groupMessageController.getAll(
          accessToken,
          groupId
        );
        setMessages(response.messages);
        unreadMessagesController.setTotalReadMessages(groupId, response.total);
      } catch (error) {
        console.error(error);
      }
    })();

    return async () => {
      const response = await groupMessageController.getAll(
        accessToken,
        groupId
      );
      unreadMessagesController.setTotalReadMessages(groupId, response.total);
    };
  }, [accessToken, groupId]);

  useEffect(() => {
    socket.emit("subscribe", groupId);
    socket.on("message", newMessage);

    return () => {
      socket.emit("unsubscribe", groupId);
      socket.off("message", newMessage);
    };
  }, [groupId, messages]);

  const newMessage = (msg: Message) => {
    setMessages((prevMessages) => (prevMessages ? [...prevMessages, msg] : [msg]));
  };

  if (!messages) return <LoadingScreen />;

  return (
    <>
      <HeaderGroup groupId={groupId} />

      <View style={{ flex: 1 }}>
        <ListMessages messages={messages} />
        <GroupForm groupId={groupId} />
      </View>
    </>
  );
}
