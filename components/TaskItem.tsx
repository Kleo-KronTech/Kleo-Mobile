import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Task {
  id: string;
  category: string;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={[styles.checkbox, task.completed && styles.checkboxChecked]}
      >
        {task.completed && (
          <MaterialIcons name="check" size={16} color="#5e54b8" />
        )}
      </TouchableOpacity>
      <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
        {task.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#f5f5f5",
    borderColor: "#5e54b8",
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});

export default TaskItem;