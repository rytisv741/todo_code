import { Box, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import AddTodo from "../components/AddTodo";
import UpdateTodo from "../components/UpdateTodo";

const Home = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => axios.get("api/todo/"),
  });
  if (isLoading) {
    return <h1>Kraunasi..</h1>;
  }

  return (
    <Box m="2" p="5">
      <AddTodo />
      <Flex
        justifyContent={"space-around"}
        p="5"
        m="3"
        alignItems={"center"}
        flexWrap={"wrap"}
        gap="4"
      >
        {data?.data?.todos[0] ? (
          data.data.todos.map((todo) => {
            todo.endDate = todo.endDate.split("T")[0];
            return (
              <UpdateTodo   key={todo._id}todo={todo}>
                <Box
                  _hover={{ backgroundColor: "#c7e0e0", cursor: "pointer" }}
                
                  p="5"
                  border={"1px"}
                  borderColor="#5A9A9A"
                  borderRadius={"4px"}
                >
                  <Text as={"h3"} m="2">
                    Type: {todo.type}{" "}
                  </Text>
                  <Text as={"h3"} m="2">
                    Content: {todo.content}{" "}
                  </Text>

                  <Text as={"h3"} m="2">
                    EndDate {new Date(todo.endDate).toLocaleDateString()}{" "}
                  </Text>
                </Box>
              </UpdateTodo>
            );
          })
        ) : (
          <h1>Nera Todo's</h1>
        )}
      </Flex>
    </Box>
  );
};

export default Home;
