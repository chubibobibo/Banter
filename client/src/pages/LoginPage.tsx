import { TextInput, Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";

import PasswordFieldInput from "../components/PasswordFieldInput";

function LoginPage() {
  const landingImg = "../src/assets/landing-img.png";
  return (
    <>
      <div className='flex flex-col h-screen md:grid md:grid-cols-2 md:h-screen'>
        <section className='hidden md:flex bg-amber-400'>
          <header className='flex justify-center w-screen'>
            Login to Banter
          </header>
        </section>
        {/** Logo side */}
        <section className='flex items-center pt-15 bg-blue-400 '>
          <img src={landingImg} className='w-screen -mt-20' />
        </section>
        {/** login form */}

        <form
          method='POST'
          autoComplete='on'
          className='md:hidden h-screen flex flex-col pt-8'
        >
          <header className='text-[1.5rem] font-roboto font-semibold self-center'>
            Welcome to Banter!
          </header>
          <main className='flex flex-col py-10 px-10 gap-3'>
            <span>
              <TextInput label='Username' placeholder='Input Username' />
            </span>
            {/* <span>
              <TextInput label='Password' placeholder='Input Password' />
            </span> */}
            <span>{PasswordFieldInput({ name: "password1" })}</span>
            <span>{PasswordFieldInput({ name: "password2" })}</span>
            <span className='pt-3 flex flex-col items-center'>
              <Button fullWidth>Register</Button>
              <p className='pt-2'>
                Don't have an account?{" "}
                <Link to='/register' className='text-blue-800 font-semibold'>
                  Register
                </Link>
              </p>
            </span>
          </main>
        </form>
      </div>
    </>
  );
}
export default LoginPage;
