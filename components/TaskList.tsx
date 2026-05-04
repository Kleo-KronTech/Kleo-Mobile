import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  category: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

const CATEGORIES = ["HYGIENE", "PETS", "HOUSE"];

const TaskList = ({ tasks, onToggle }: TaskListProps) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <View>
      {CATEGORIES.map((category) =>
        groupedTasks[category]?.length > 0 ? (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryLabel}>{category}</Text>
            {groupedTasks[category].map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} />
            ))}
          </View>
        ) : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categorySection: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5e54b8",
    marginBottom: 12,
    letterSpacing: 1,
  },
});

export default TaskList;