import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { useUserData } from "../hooks/useUserData";
import UserProfileComponent from "./UserProfileComponent";

type AvatarType = {
  imgUrl: string;
  isAvatar: boolean;
  bgId: number;
};

interface BgColorType {
  [key: number]: string;
}

// Displays random bg color to the avatar using a random number as key
const bgColor: BgColorType = {
  1: "bg-red-500",
  2: "bg-yellow-500",
  3: "bg-green-500",
};

function AvatarIcon({ imgUrl, isAvatar, bgId }: AvatarType) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useUserData();
  const userData = data.data.loggedUser;
  return (
    <main className='flex'>
      {/* Modal for profilePage */}
      <Drawer
        opened={opened}
        onClose={close}
        // title={userData?.username}
        position='right'
        offset={20}
        radius='md'
        overlayProps={{ backgroundOpacity: 0.5, blur: 5 }}
      >
        {/* Drawer content */}
        {
          <UserProfileComponent
            image={userData.avatarUrl}
            loggedUser={userData.username}
            loggedUserEmail={userData.email}
          />
        }
      </Drawer>
      {isAvatar ? (
        <img
          src={imgUrl}
          alt='avatar picture'
          className='w-10 h-10 rounded-3xl'
          onClick={open}
        />
      ) : (
        <div
          className={`${bgColor[bgId]} w-10 h-10 rounded-3xl flex justify-center items-center font-bold`}
          onClick={open}
        >
          {imgUrl.toUpperCase()}
        </div>
      )}
    </main>
  );
}
export default AvatarIcon;
