import {
  Button,
  Container,
  Paper,
  TextInput,
  FileInput,
  Title,
} from "@mantine/core";
import classes from "../styles/AuthenticationTitle.module.css";
import PasswordFieldInput from "../components/PasswordFieldInput";
import { IconAt } from "@tabler/icons-react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

import { useUserData } from "../hooks/useUserData";

function UpdateUserPage() {
  const { data } = useUserData();
  const userData = data.data.loggedUser;
  const icon = <IconAt size={16} />;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await axios.patch("/api/auth/updateUser", formData);
      navigate({ to: "/dashboard/home" });
      toast.success("Successfully updated profile");
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        toast.error(
          Array.isArray(err)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message,
        );
      }
    }
  };
  return (
    <>
      <Container size={420} my={40}>
        <Title ta='center' className={classes.title}>
          Update Profile
        </Title>

        <Paper withBorder shadow='sm' p={22} mt={30} radius='md'>
          <form
            method='PATCH'
            //   autoComplete='on'
            className='md:hidden flex flex-col pt-8 bg-amber-400'
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <header className='text-[1.5rem] font-roboto font-semibold self-center'>
              Welcome to Banter!
            </header>
            <main className='flex flex-col py-10 px-10 gap-3'>
              {/* <span> */}
              <FileInput
                label='Input label'
                description='Input description'
                placeholder='Upload avatar'
                name='avatarUrl'
              />
              <TextInput
                label='Username'
                placeholder='Input Username'
                name='username'
                defaultValue={userData.username}
                required
              />
              {/* </span> */}
              {/* <span> */}
              <TextInput
                label='First name'
                placeholder='Input First name'
                name='firstName'
                defaultValue={userData.firstName}
                required
              />
              {/* </span> */}
              {/* <span> */}
              <TextInput
                label='Last name'
                placeholder='Input Last name'
                name='lastName'
                defaultValue={userData.lastName}
                required
              />
              {/* </span> */}
              {/* <span> */}
              <TextInput
                rightSectionPointerEvents='none'
                rightSection={icon}
                label='Your email'
                placeholder='Your email'
                name='email'
                defaultValue={userData.email}
                required
              />
              {/* </span> */}
              <PasswordFieldInput
                name='password1'
                label='Password'
                isRequired={false}
              />
              <PasswordFieldInput
                name='password2'
                label='Re-enter Password'
                isRequired={false}
              />

              <section className='pt-3 flex flex-col items-center'>
                <Button fullWidth type='submit'>
                  Update Profile
                </Button>
              </section>
            </main>
          </form>
        </Paper>
      </Container>
    </>
  );
}
export default UpdateUserPage;
