import { TextInput, Button } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

import PasswordFieldInput from "../components/PasswordFieldInput";

function RegisterPage() {
  const navigate = useNavigate({ from: "/register" });
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    //check all password match
    if (data.password1 !== data.password2) {
      toast.error("Passwords do not match");
    } else {
      // create a new key for pwd to sent to API
      data.password = data.password1;
      try {
        await axios.post("/api/auth/registerUser", data);
        toast.success("User registered successfully");
        navigate({ to: "/login" });
        return null;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err?.response?.data?.message[0]);
          console.log(err?.response?.data?.message);
        } else {
          return err;
        }
      }
    }
  };

  const landingImg = "../src/assets/landing-img.png";
  const icon = <IconAt size={16} />;

  return (
    <>
      <div className='flex flex-col h-screen md:grid md:grid-cols-2 md:h-screen'>
        <section className='hidden md:flex md:flex-col md:items-center md:gap-5 bg-amber-400 '>
          <header className='flex justify-center w-screen text-5xl font-roboto pt-40 text-gray-700'>
            Welcome to Banter
          </header>
          {/* <section> */}
          <form
            className='flex flex-col w-6/12 gap-4'
            method='POST'
            onSubmit={handleSubmit}
          >
            <TextInput
              label='Username'
              placeholder='Input Username'
              name='username'
              required
            />
            <TextInput
              label='First name'
              placeholder='Input First name'
              name='firstName'
              required
            />
            <TextInput
              label='Last name'
              placeholder='Input Last name'
              name='lastName'
              required
            />
            <TextInput
              label='Email'
              placeholder='Input Email'
              name='email'
              required
            />
            {<PasswordFieldInput name='password1' />}
            {<PasswordFieldInput name='password2' />}
            <section className='flex justify-start'>
              <Button type='submit' justify='center'>
                Register
              </Button>
            </section>
          </form>
        </section>
        {/* </section> */}
        {/** Logo side */}
        <section className='flex items-center pt-15 bg-blue-400 '>
          <img src={landingImg} className='w-screen -mt-20' />
        </section>
        {/** login form */}
        {/** MOBILE */}
        <form
          method='post'
          //   autoComplete='on'
          className='md:hidden h-screen flex flex-col pt-8'
          onSubmit={handleSubmit}
        >
          <header className='text-[1.5rem] font-roboto font-semibold self-center'>
            Welcome to Banter!
          </header>
          <main className='flex flex-col py-10 px-10 gap-3'>
            <span>
              <TextInput
                label='Username'
                placeholder='Input Username'
                name='username'
                required
              />
            </span>
            <span>
              <TextInput
                label='First name'
                placeholder='Input First name'
                name='firstName'
                required
              />
            </span>
            <span>
              <TextInput
                label='Last name'
                placeholder='Input Last name'
                name='lastName'
                required
              />
            </span>
            <span>
              <TextInput
                rightSectionPointerEvents='none'
                rightSection={icon}
                label='Your email'
                placeholder='Your email'
                name='email'
                required
              />
            </span>
            <span>{PasswordFieldInput({ name: "password1" })}</span>
            <span>{PasswordFieldInput({ name: "password2" })}</span>
            <span className='pt-3 flex flex-col items-center'>
              <Button fullWidth type='submit'>
                Register
              </Button>
              <p className='pt-2'>
                Already have an account?{" "}
                <Link to='/login' className='text-blue-800 font-semibold'>
                  Login
                </Link>
              </p>
            </span>
          </main>
        </form>
      </div>
    </>
  );
}
export default RegisterPage;
