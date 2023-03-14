import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store";
const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [surName, setsurName] = useState("");
  const handleSubmit = async () => {
    if (!name || !surName) {
      setError("Please provide all details");
      return;
    }
    try {
      setError("");

      const { data } = await axios.post(
        "api/auth/login",
        {
          name,
          surName,
        }
      );
      console.log({ data });
      if (data?.success) {
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "An Error occured! Try Later");
    }
  };

  if (user) {
    navigate("/");
  }

  return (
    <Center>
      <Box
        p={4}
        textAlign={"center"}
        m="1"
        border="1px"
        sx={{
          width: { sm: "80%", md: "40%" },
          borderRadius: "3px",
          borderColor: "#5A9A9A",
        }}
      >
        <Heading as="h3" size="lg">
          Prisijungti
        </Heading>

        <Flex
          mx="auto"
          sx={{ width: { sm: "80%", md: "60%" } }}
          gap="3"
          flexDirection={"column"}
          justifyContent="center"
          mt="4"
        >
          {error && (
            <Text fontSize="sm" mt="2" color={"tomato"} textAlign="left">
              {error}
            </Text>
          )}
          <Input
            size="md"
            value={name}
            placeholder="Vardas"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            size="md"
            value={surName}
            placeholder="Pavarde"
            onChange={(e) => setsurName(e.target.value)}
          />
          <Text fontSize="sm" color="ActiveCaption">
            Neturi vartotojo ?{" "}
            <Link to={"/register"}>
              <Text as="span" color="blue.500">
                {" "}
                Uzsiregistruok
              </Text>
            </Link>
          </Text>
          <Box>
            <Button colorScheme="teal" variant="outline" onClick={handleSubmit}>
              Prisijungti
            </Button>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};

export default Login;
