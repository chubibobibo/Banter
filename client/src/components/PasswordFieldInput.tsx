import { TextInput } from "@mantine/core";
import { IconEyeFilled, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

interface PropsType {
  name: string;
  label: string;
}

function PasswordFieldInput({ name, label }: PropsType) {
  const [isVisible, setIsVisible] = useState(true);

  const handlePwdClick = () => {
    setIsVisible(!isVisible);
  };

  // components as variables to dynamically render depending on the state (isVisible)
  const eyefilled = <IconEyeFilled size={16} onClick={handlePwdClick} />;
  const eyeclosed = <IconEyeOff size={16} onClick={handlePwdClick} />;

  return (
    <>
      <TextInput
        label={label}
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
