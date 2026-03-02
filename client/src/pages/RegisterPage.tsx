import { TextInput, Button } from "@mantine/core";
import { IconAt, IconEyeFilled, IconEyeOff } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

function RegisterPage() {
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);

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
      // const api = await axios.create({ baseURL: "http://localhost:3001/" });
      try {
        await axios.post("/api/auth/registerUser", data);
        toast.success("User registered successfully");
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

  const handlePwdClick1 = () => setIsVisible1(!isVisible1);
  const handlePwdClick2 = () => setIsVisible2(!isVisible2);

  const landingImg = "../src/assets/landing-img.png";
  const icon = <IconAt size={16} onClick={handlePwdClick1} />;
  const eyefilled1 = <IconEyeFilled size={16} onClick={handlePwdClick1} />;
  const eyefilled2 = <IconEyeFilled size={16} onClick={handlePwdClick2} />;
  const eyeclosed1 = <IconEyeOff size={16} onClick={handlePwdClick1} />;
  const eyeclosed2 = <IconEyeOff size={16} onClick={handlePwdClick2} />;

  return (
    <>
      <div className='flex flex-col h-screen md:grid md:grid-cols-2 md:h-screen'>
        <section className='hidden md:flex bg-amber-400'>
          <header className='flex justify-center w-screen'>
            Welcome to Banter
          </header>
        </section>
        {/** Logo side */}
        <section className='flex items-center pt-15 bg-blue-400 '>
          <img src={landingImg} className='w-screen -mt-20' />
        </section>
        {/** login form */}

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
                // value={regData.username}
                // onChange={handleChange}
              />
            </span>
            <span>
              <TextInput
                label='First name'
                placeholder='Input First name'
                name='firstName'
                required
                // value={regData.firstName}
                // onChange={handleChange}
              />
            </span>
            <span>
              <TextInput
                label='Last name'
                placeholder='Input Last name'
                name='lastName'
                required
                // value={regData.lastName}
                // onChange={handleChange}
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
                // value={regData.email}
                // onChange={handleChange}
              />
            </span>
            <span>
              <TextInput
                label='Password'
                placeholder='Input Password'
                type={isVisible1 ? "password" : "text"}
                rightSection={isVisible1 ? eyefilled1 : eyeclosed1}
                name='password1'
                required
                // value={regData.password1}
                // onChange={handleChange}
              />
            </span>
            <span>
              <TextInput
                label='Re-Password'
                placeholder='Re-Password'
                rightSection={isVisible2 ? eyefilled2 : eyeclosed2}
                type={isVisible2 ? "password" : "text"}
                name='password2'
                required
                // value={regData.password2}
                // onChange={handleChange}
              />
            </span>
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
