import { Avatar, Button, Paper, Text } from "@mantine/core";
import { logoutHandler } from "../utils/logoutHandler";
import { useNavigate } from "@tanstack/react-router";

function UserProfileComponent({
  image,
  loggedUser,
  loggedUserEmail,
  modalClose,
}: {
  image: string;
  loggedUser: string;
  loggedUserEmail: string;
  modalClose: MouseEventHandler<HTMLButtonElement>;
}) {
  //   console.log(userName);
  const navigate = useNavigate();
  //   const router = useRouter();
  const navigateToProfile = () => {
    navigate({ to: "/dashboard/updateUser" });
  };
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
        {/* event bubbling to navigate to updateProfile page then close the modal */}
        {/* an event on the edit profile btn activates it's onClick then bubbles up to the parent element which is the div with an onClick to close the modal*/}
        <div onClick={modalClose}>
          <Button
            variant='default'
            fullWidth
            mt='md'
            onClick={navigateToProfile}
          >
            Edit Profile
          </Button>
        </div>
        <Button
          variant='filled'
          color='red'
          fullWidth
          mt='md'
          // Passing the useNavigate hook as props to use outside of a function component
          onClick={() => logoutHandler({ navigate: navigate })}
        >
          Logout
        </Button>
      </Paper>
    </>
  );
}
export default UserProfileComponent;
