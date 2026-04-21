import { Avatar, Button, Paper, Text } from "@mantine/core";
import { logoutHandler } from "../utils/logoutHandler";

function UserProfileComponent({
  image,
  loggedUser,
  loggedUserEmail,
}: {
  image: string;
  loggedUser: string;
  loggedUserEmail: string;
}) {
  //   console.log(userName);
  return (
    <>
      <Paper radius='md' withBorder p='lg' bg='var(--mantine-color-body)'>
        {image ? (
          <Avatar
            src={image}
            size={120}
            radius={120}
            mx='auto'
            alt='profile picture'
          />
        ) : (
          <Avatar
            src={image}
            size={120}
            radius={120}
            mx='auto'
            alt='profile picture'
          />
        )}

        <Text ta='center' fz='lg' fw={500} mt='md'>
          {loggedUser.toUpperCase()}
        </Text>
        <Text ta='center' c='dimmed' fz='sm'>
          {loggedUserEmail}
        </Text>
        <Button variant='default' fullWidth mt='md'>
          Edit Profile
        </Button>
        <Button
          variant='filled'
          color='red'
          fullWidth
          mt='md'
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </Paper>
    </>
  );
}
export default UserProfileComponent;
