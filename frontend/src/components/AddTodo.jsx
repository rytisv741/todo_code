import {
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
  // Gauti metus, menesi ir diena from the date object
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // add leading zero for months < 10
  const day = String(today.getDate()).padStart(2, "0"); // add leading zero for days < 10

  // Format the date to 'yy-mm-dd' format
  return `${year}-${month}-${day}`;
};
function AddTodo() {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState();
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      onClose();
      return axios.post("api/todo/add", newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleSubmit = async () => {
    setError("");
    if (!type || !content || !date) {
      setError("Please provide all details");
      return;
    }
    mutation.mutate({ type, content, endDate: date });
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Prideti Todo
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
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
            <Button onClick={handleSubmit} colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTodo;
