import { Box, Button, Center, Flex, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [surName, setsurName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    setError("");
    if (!name || !surName || !email) {
      setError("Please provide all details");
      return;
    }
    try {
      const { data } = await axios.post(
        "api/auth/register",
        {
          name,
          surName,
          email,
        }
      );
      console.log({ data });
      if (data?.success) {
        navigate("/login");
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
      marginX="auto"
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
        Register
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
        <Input
          size="md"
          value={email}
          placeholder="El. Pastas"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Text fontSize="sm" color="ActiveCaption">
          Jau turi vartotoja ?{" "}
          <Link to={"/login"}>
            <Text as="span" color="blue.500">
              {" "}
              Prisijunk
            </Text>
          </Link>
        </Text>
        <Box>
          <Button colorScheme="teal" variant="outline" onClick={handleSubmit}>
            Registruotis
          </Button>
        </Box>
      </Flex>
    </Box>
    </Center>

  );
};

export default Register;
