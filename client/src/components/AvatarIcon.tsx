import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";

type AvatarType = {
  imgUrl: string;
  isAvatar: boolean;
};

function AvatarIcon({ imgUrl, isAvatar }: AvatarType) {
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
        <div className='w-10 h-10 rounded-3xl bg-white flex justify-center items-center font-bold'>
          {imgUrl.toUpperCase()}
        </div>
      )}
    </main>
  );
}
export default AvatarIcon;

// 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png'
