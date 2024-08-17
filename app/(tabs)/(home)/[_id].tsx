import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useTask } from "@/hooks/repository/useTask";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Task } from "@/models/Task";
import { Ionicons } from "@expo/vector-icons";
import { useObject } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { BSON } from "realm";

interface DetailsProps {}

const Details = (props: DetailsProps) => {
  const { _id } = useLocalSearchParams();
  const { updateDBTask } = useTask();
  const task = useObject<Task>(Task, new BSON.ObjectID(_id as string));
  const [description, setDescription] = React.useState(task?.description);
  const color = useThemeColor({}, "icon");
  if (!task) {
    return <ThemedText>No task detail found!</ThemedText>;
  }

  const onSave = () => {
    updateDBTask(task, description);
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedTextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSave}>
        <Ionicons name="save" color={color} size={20} />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    width: 200,
    borderWidth: 1,
  },
});
