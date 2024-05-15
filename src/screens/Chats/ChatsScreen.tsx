import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { size } from "lodash";
import { Chat } from "../../api";
import { useAuth } from "../../hooks";
import { LoadingScreen } from "../../components/Shared";
import { ListChat, Search } from "../../components/Chat";
import { screens } from "../../utils";

// Assuming Chat has proper TypeScript definitions
const chatController = new Chat();

// Define the type for the chat objects expected from the API
type ChatType = {
  _id: string;
  last_message_date: string;
  // Add other necessary properties of chat object
};

export function ChatsScreen() {
  const { accessToken } = useAuth();  // Ensure useAuth() returns a typed object
  const navigation = useNavigation();
  const [chats, setChats] = useState<ChatType[] | null>(null);
  const [chatsResult, setChatsResult] = useState<ChatType[] | null>(null);
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<AddIcon />}
          padding={0}
          onPress={() => navigation.navigate(screens.tab.chats.createChatScreen)}
        />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await chatController.getAll(accessToken);
          const result = response.sort((a, b) => new Date(b.last_message_date).getTime() - new Date(a.last_message_date).getTime());
          setChats(result);
          setChatsResult(result);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [reload, accessToken])
  );

  const upTopChat = (chatId: string) => {
    if (!chatsResult) return;
    const data = [...chatsResult];
    const formIndex = data.findIndex((chat) => chat._id === chatId);
    const toIndex = 0;

    const element = data.splice(formIndex, 1)[0];
    data.splice(toIndex, 0, element);

    setChatsResult(data);
  };

  if (!chatsResult) return <LoadingScreen />;

  return (
    <View>
      {size(chats) > 0 && <Search data={chats} setData={setChatsResult} />}
      <ListChat
        chats={size(chats) === size(chatsResult) ? chats : chatsResult}
        onReload={onReload}
        upTopChat={upTopChat}
      />
    </View>
  );
}
