import { useState } from "react";
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../styles/NavbarSimpleColored.module.css";

import AvatarIcon from "./AvatarIcon";
import { useUserData } from "../hooks/useUserData";

const data = [
  { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];
// const randomColorNum = () => {
//   return Math.floor(Math.random() * (4 - 1) + 1);
// };

const bgColorId = Math.floor(Math.random() * (4 - 1) + 1);
function Navbar() {
  // console.log(bgColorId);

  const [active, setActive] = useState("Billing");
  const { data: userData } = useUserData();
  const userFirstName = userData?.data?.loggedUser?.firstName[0];
  const userLastName = userData?.data?.loggedUser?.lastName[0];

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));
  return (
    <>
      {/* desktop */}
      <div className='hidden md:flex '>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify='space-between'>
              {/* <MantineLogo size={28} inverted style={{ color: "white" }} /> */}
              <Code fw={700} className={classes.version}>
                v1.0.0
              </Code>
            </Group>
            {links}
          </div>

          <div className={classes.footer}>
            <a
              href='#'
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Change account</span>
            </a>

            <a
              href='#'
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </div>
        </nav>
      </div>

      {/* mobile */}
      <div className='flex justify-between items-center h-1/13 md:hidden bg-blue-400'>
        Banter
        <section className='pr-2'>
          {userData?.data?.loggedUser?.avatarUrl ? (
            <AvatarIcon
              imgUrl={
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
              }
              isAvatar={true}
              bgId={bgColorId}
            />
          ) : (
            <AvatarIcon
              imgUrl={userFirstName + userLastName}
              isAvatar={false}
              bgId={bgColorId}
            />
          )}
        </section>
      </div>
    </>
  );
}
export default Navbar;
