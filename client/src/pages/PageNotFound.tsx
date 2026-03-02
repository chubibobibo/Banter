import {
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import image from "../assets/404.svg";
import classes from "../styles/NotFoundImage.module.css";
import { useNavigate } from "@tanstack/react-router";

function PageNotFound() {
  const navigate = useNavigate();

  const handleClickNav = () => {
    navigate({ to: "/" });
  };
  return (
    <>
      <Container className={"md:pt-80 sm:h-screen"}>
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
          <Image
            src={image}
            className={classes.mobileImage}
            alt='Page not found'
          />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text c='dimmed' size='lg'>
              Page you are trying to open does not exist. You may have mistyped
              the address, or the page has been moved to another URL. If you
              think this is an error contact support.
            </Text>

            <Button
              variant='outline'
              size='md'
              mt='xl'
              className={classes.control}
              onClick={handleClickNav}
            >
              Get back to home page
            </Button>
          </div>
          <Image
            src={image}
            className={classes.desktopImage}
            alt='Page not found'
          />
        </SimpleGrid>
      </Container>
    </>
  );
}
export default PageNotFound;
