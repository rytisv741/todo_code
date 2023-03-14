import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
const getMinDate = () => {
  const today = new Date();
  // Get the year, month and day from the date object
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // add leading zero for months < 10
  const day = String(today.getDate()).padStart(2, "0"); // add leading zero for days < 10

  // Format the date to 'yy-mm-dd' format
  return `${year}-${month}-${day}`;
};
function UpdateTodo({ todo, children }) {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

  const [type, setType] = useState(todo.type || "");
  const [content, setContent] = useState(todo.content || "");
  const [date, setDate] = useState(todo.endDate);

  const updateMutation = useMutation({
    mutationFn: (newTodo) => {
      onClose();
      setError("");
      return axios.post(
        "api/todo/update/" + todo._id,
        newTodo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => {
      onClose();
      setError("");
      return axios.delete("api/todo/delete/"+todo._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleDelete = () => {
    deleteMutation.mutate()
  };
  const handleSubmit = () => {
    setError("");
    if (
      type === todo.type &&
      content === todo.content &&
      date === todo.endDate
    ) {
      setError("Please make some changes before updating the Todo");
      return;
    }
    const fields = {
      ...(type !== todo.type ? { type } : null),
      ...(content !== todo.content ? { content } : null),
      ...(date !== todo.endDate ? { endDate: date } : null),
    };
    console.log({ fields });
    updateMutation.mutate({ type, content, endDate: date });
  };
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setError("");
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sukurti Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {error && (
              <Text fontSize="sm" mt="2" color={"tomato"} textAlign="left">
                {error}
              </Text>
            )}
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Input
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Type"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Date</FormLabel>

              <Input
                type={"date"}
                value={date}
                min={getMinDate()}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
          
            <Button onClick={handleDelete} colorScheme="red" mr={3}>
              Istrinti
            </Button>
            <Button onClick={handleSubmit} colorScheme="teal" mr={3}>
              Atnaujinti
            </Button>
            <Button
              onClick={() => {
                setError("");
                onClose();
              }}
            >
              Atsaukti
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateTodo;
