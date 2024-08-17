import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TaskListItem from "@/components/TaskListItem";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useCallback, useEffect, useState } from "react";
import { useTask } from "@/hooks/repository/useTask";
import { Task } from "@/models/Task";
import { BSON } from "realm";
import { useQuery, useRealm } from "@realm/react";
import { TaskDTO } from "@/dto/Task";
// export type Task = {
//   description: string;
//   id?: number;
// };
export default function HomeScreen() {
  const [task, setTask] = useState<Task>();
  const [description, setDescription] = useState("");
  //const [tasks, setTasks] = useState<Task[]>([]);
  const { createDBTask, deleteDBTask } = useTask();
  const realm = useRealm();
  const tasks = useQuery(Task);
  useEffect(() => {}, []);
  const _renderItem = useCallback(
    ({ item, index }: { item: Task; index: number }) => (
      <TaskListItem key={item._id.toString()} task={item} onDelete={onDelete} />
    ),
    [tasks, description]
  );
  const createTask = () => {
    if (description == "") return;
    createDBTask({ description, userId: "123" });
    setDescription("");
  };
  const onDelete = (task: Task) => {
    deleteDBTask(task);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={tasks} renderItem={_renderItem} />
      <ThemedTextInput
        onChangeText={setDescription}
        value={description}
        style={styles.input}
      />
      <TouchableOpacity style={styles.buttton} onPress={createTask}>
        <ThemedText>Add</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    padding: 20,
    margin: 10,
  },
  buttton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "green",
    padding: 20,
    margin: 10,
  },
});
