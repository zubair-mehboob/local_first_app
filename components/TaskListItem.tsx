import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Task } from "@/app/(tabs)/(home)";
import { Link } from "expo-router";

interface TaskListItemProps {
  task: Task;
  onDelete: (task: Task) => void;
}

const TaskListItem = ({ task, onDelete }: TaskListItemProps) => {
  const color = useThemeColor({ light: "", dark: "" }, "text");
  return (
    <Link href={`/(home)/${task._id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <ThemedText>{task.description}</ThemedText>
        <TouchableOpacity onPress={() => onDelete(task)}>
          <Entypo name="cross" size={20} color={color} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    margin: 10,
  },
});
