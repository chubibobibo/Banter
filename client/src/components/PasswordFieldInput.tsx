import { TextInput } from "@mantine/core";
import { IconEyeFilled, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

interface PropsType {
  name: string;
}

function PasswordFieldInput({ name }: PropsType) {
  const [isVisible, setIsVisible] = useState(true);
  //   const [isVisible, setIsVisible] = useState(true);

  const handlePwdClick = () => {
    setIsVisible(!isVisible);
  };

  const eyefilled = <IconEyeFilled size={16} onClick={handlePwdClick} />;
  const eyeclosed = <IconEyeOff size={16} onClick={handlePwdClick} />;

  return (
    <>
      <TextInput
        label='Password'
        placeholder='Input Password'
        type={isVisible ? "password" : "text"}
        rightSection={isVisible ? eyefilled : eyeclosed}
        name={name}
        required
        className='cursor-pointer'
      />
    </>
  );
}

export default PasswordFieldInput;
