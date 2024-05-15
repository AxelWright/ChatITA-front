// Definimos interfaces para cada grupo de pantallas
interface AuthScreens {
  authStartScreen: string;
  loginScreen: string;
  registerScreen: string;
}

interface GlobalScreens {
  userProfileScreen: string;
  cameraScreen: string;
  imageFullScreen: string;
  chatScreen: string;
  groupScreen: string;
  groupProfileScreen: string;
  addUserGroupScreen: string;
  changeNameGroupScreen: string;
}

interface ChatScreens {
  root: string;
  chatsScreen: string;
  createChatScreen: string;
}

interface GroupScreens {
  root: string;
  groupsScreen: string;
  createGroupScreen: string;
}

interface SettingScreens {
  root: string;
  settingScreen: string;
  changeFirstnameScreen: string;
  changeLastnameScreen: string;
}

interface TabScreens {
  root: string;
  chats: ChatScreens;
  groups: GroupScreens;
  settings: SettingScreens;
}

// Creamos objetos concretos con tipos específicos
const auth: AuthScreens = {
  authStartScreen: "AuthStartScreen",
  loginScreen: "LoginScreen",
  registerScreen: "RegisterScreen",
};

const global: GlobalScreens = {
  userProfileScreen: "UserProfileScreen",
  cameraScreen: "CameraScreen",
  imageFullScreen: "ImageFullScreen",
  chatScreen: "ChatScreen",
  groupScreen: "GroupScreen",
  groupProfileScreen: "GroupProfileScreen",
  addUserGroupScreen: "AddUserGroupScreen",
  changeNameGroupScreen: "ChangeNameGroupScreen",
};

const chats: ChatScreens = {
  root: "ChatsRoot",
  chatsScreen: "ChatsScreen",
  createChatScreen: "CreateChatScreen",
};

const groups: GroupScreens = {
  root: "GroupsRoot",
  groupsScreen: "GroupsScreen",
  createGroupScreen: "CreateGroupScreen",
};

const settings: SettingScreens = {
  root: "SettingsRoot",
  settingScreen: "SettingsScreen",
  changeFirstnameScreen: "ChangeFirstnameScreen",
  changeLastnameScreen: "ChangeLastnameScreen",
};

const tab: TabScreens = {
  root: "BottomTabRoot",
  chats,
  groups,
  settings,
};

// Exportamos un objeto con todas las pantallas
export const screens = {
  auth,
  global,
  tab,
};