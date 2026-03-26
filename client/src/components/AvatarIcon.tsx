import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";

function AvatarIcon() {
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

      <img
        src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png'
        alt=''
        className='w-10 h-10 rounded-3xl'
        onClick={open}
      />
    </main>
  );
}
export default AvatarIcon;
