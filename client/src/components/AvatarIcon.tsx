import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";

type AvatarType = {
  imgUrl: string;
  isAvatar: boolean;
  bgId: number;
};

interface BgColorType {
  [key: number]: string;
}

const bgColor: BgColorType = {
  1: "bg-red-500",
  2: "bg-yellow-500",
  3: "bg-green-500",
};

function AvatarIcon({ imgUrl, isAvatar, bgId }: AvatarType) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <main className='flex'>
      <Drawer
        opened={opened}
        onClose={close}
        title='Profile'
        position='right'
        offset={20}
        radius='md'
        overlayProps={{ backgroundOpacity: 0.5, blur: 5 }}
      >
        {/* Drawer content */}
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
        >
          {imgUrl.toUpperCase()}
        </div>
      )}
    </main>
  );
}
export default AvatarIcon;
