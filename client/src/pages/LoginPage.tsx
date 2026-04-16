import { TextInput, Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import PasswordFieldInput from "../components/PasswordFieldInput";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate({ from: "/login" });
  // e: typed as a submit event from an HTML form element
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //create new form using entries on all inputs
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const loggedUser = await axios.post("/api/auth/login", data);
      toast.success("User Successfully logged in");
      // console.log(loggedUser);
      navigate({ to: "/dashboard/home" });
      return loggedUser;
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(
          Array.isArray(err?.response?.data?.message)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message,
        );
      }
    }
  };

  const landingImg = "../src/assets/landing-img.png";
  return (
    <>
      <div className='flex flex-col h-screen md:grid md:grid-cols-2 md:h-screen'>
        <section className='hidden md:flex flex-col bg-amber-400 items-center'>
          <header className='flex justify-center w-screen text-5xl font-roboto pt-80 text-gray-600'>
            WELCOME TO BANTER
          </header>
          <form
            method='POST'
            className='flex flex-col w-4/12 gap-4 pb-3 pt-6'
            onSubmit={handleSubmit}
          >
            <span>
              <TextInput
                label='Username'
                placeholder='Input Username'
                name='username'
                required
              />
            </span>
            <span>
              {PasswordFieldInput({ name: "password", label: "Password" })}
            </span>
            <section>
              <Button type='submit' justify='center'>
                Login
              </Button>
            </section>
          </form>
          <p className='pt-2'>
            Don't have an account?{" "}
            <Link
              to='/register'
              className='text-blue-800 font-semibold text-lg'
            >
              Register
            </Link>
          </p>
        </section>
        {/** Logo side */}
        <section className='flex items-center pt-15 bg-blue-400 '>
          <img src={landingImg} className='w-screen -mt-20' />
        </section>

        {/* MOBILE */}
        {/** login form */}
        <form
          method='POST'
          autoComplete='on'
          className='md:hidden h-screen flex flex-col pt-8 bg-amber-400'
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
              {PasswordFieldInput({ name: "password", label: "Password" })}
            </span>
            <span className='pt-3 flex flex-col items-center'>
              <Button fullWidth type='submit'>
                Login
              </Button>
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
