import { useState, useEffect } from "react";
import { View } from "native-base";
import { useRoute, RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatMessage, UnreadMessages } from "../../api";
import { useAuth } from "../../hooks";
import { HeaderChat } from "../../components/Navigation";
import { LoadingScreen } from "../../components/Shared";
import { ListMessages, ChatForm } from "../../components/Chat";
import { ENV, socket } from "../../utils";

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

type ChatScreenRouteProp = RouteProp<{ params: { chatId: string } }, 'params'>;

export function ChatScreen() {
  const route = useRoute<ChatScreenRouteProp>();
  const { chatId } = route.params;
  const { accessToken } = useAuth();
  
  const [messages, setMessages] = useState<any[]>(null);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(ENV.ACTIVE_CHAT_ID, chatId);
    })();

    return async () => {
      await AsyncStorage.removeItem(ENV.ACTIVE_CHAT_ID);
    };
  }, [chatId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await chatMessageController.getAll(accessToken, chatId);
        setMessages(response.messages);
        await unreadMessagesController.setTotalReadMessages(chatId, response.total);
      } catch (error) {
        console.error(error);
      }
    })();

    return async () => {
      const response = await chatMessageController.getAll(accessToken, chatId);
      await unreadMessagesController.setTotalReadMessages(chatId, response.total);
    };
  }, [chatId]);

  useEffect(() => {
    const newMessage = (msg: any) => {
      setMessages((prevMessages) => prevMessages ? [...prevMessages, msg] : [msg]);
    };

    socket.emit("subscribe", chatId);
    socket.on("message", newMessage);

    return () => {
      socket.emit("unsubscribe", chatId);
      socket.off("message", newMessage);
    };
  }, [chatId]);

  return (
    <>
      <HeaderChat chatId={chatId} />

      {!messages ? (
        <LoadingScreen />
      ) : (
        <View style={{ flex: 1 }}>
          <ListMessages messages={messages} />
          <ChatForm chatId={chatId} />
        </View>
      )}
    </>
  );
}
