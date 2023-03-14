import { Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useAuth } from "../store";

const Navbar = () => {
  const { user ,setUser} = useAuth();
  const handleLogout= async()=>{
    try {
      const {data} = await axios.post("http://localhost:5000/api/auth/logout")
      if(data){
        setUser(null)
        navigator("/login")
      }
    } catch (error) {
      
    }
  }
  return (
    <Flex mt="3" justifyContent={"space-around"} align="center">
      {user ? (
        <>
        <Text p="2" color="crimson" size="lg" textTransform={"uppercase"}>
          {user.name + " " + user.surName}
        </Text>
        <Button variant={"outline"} onClick={handleLogout}>
        Atsijungti
        </Button>
        </>
      ) : (
        ""
      )}
    </Flex>
  );
};

export default Navbar;
