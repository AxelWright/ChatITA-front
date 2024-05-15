import { useState, useEffect } from "react";
import { View } from "native-base";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupMessage, UnreadMessages } from "../../api";
import { useAuth } from "../../hooks";
import { HeaderGroup } from "../../components/Navigation";
import { LoadingScreen } from "../../components/Shared";
import { ListMessages, GroupForm } from "../../components/Group";
import { ENV, socket } from "../../utils";

// Define the structure for a message object
interface MessageType {
  // Define properties of a message object here
}

// Create instances of the controllers
const groupMessageController = new GroupMessage();
const unreadMessagesController = new UnreadMessages();

// GroupScreen component
export function GroupScreen() {
  const {
    params: { groupId },
  } = useRoute<any>(); // Use any or a more specific type for route parameters
  const { accessToken } = useAuth();
  // Use state to manage messages, initializing as an empty array
  const [messages, setMessages] = useState<MessageType[]>([]);

  // Effect for setting the active group ID in AsyncStorage
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(ENV.ACTIVE_GROUP_ID, groupId);
    })();

    return async () => {
      await AsyncStorage.removeItem(ENV.ACTIVE_GROUP_ID);
    };
  }, [groupId]);

  // Effect for fetching messages and setting total read messages
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

  // Effect for subscribing and unsubscribing to socket messages
  useEffect(() => {
    socket.emit("subscribe", groupId);
    socket.on("message", newMessage);

    return () => {
      socket.emit("unsubscribe", groupId);
      socket.off("message", newMessage);
    };
  }, [groupId, messages]);

  // Function to handle new messages received via socket
  const newMessage = (msg: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  // Render a loading screen if messages are not yet loaded
  if (!messages.length) return <LoadingScreen />;

  // Render the group screen with header, messages list, and message form
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
