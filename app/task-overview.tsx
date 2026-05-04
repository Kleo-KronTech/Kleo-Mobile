import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import DatePicker from "@/components/DatePicker";
import TaskList from "@/components/TaskList";
import AddTaskBar from "@/components/AddTaskBar";

interface Task {
  id: string;
  category: string;
  text: string;
  completed: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: "1", category: "HYGIENE", text: "brush teeth", completed: false },
  { id: "2", category: "HYGIENE", text: "take a shower", completed: false },
  { id: "3", category: "PETS", text: "feed cats", completed: false },
  { id: "4", category: "PETS", text: "take dogs to the vet", completed: false },
  { id: "5", category: "PETS", text: "walk turtle", completed: false },
  { id: "6", category: "HOUSE", text: "water indoor plants", completed: false },
  { id: "7", category: "HOUSE", text: "feed cactus", completed: true },
];

const TaskOverview = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedDate, setSelectedDate] = useState(26);
  const [newTask, setNewTask] = useState("");

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        category: "OTHER",
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      router.push({
        pathname: "/create-task",
        params: { taskText: newTask, taskId: task.id },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Today</Text>
        </View>

        <View style={styles.section}>
          <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </View>

        <TaskList tasks={tasks} onToggle={handleToggleTask} />
      </ScrollView>

      <AddTaskBar value={newTask} onChange={setNewTask} onAdd={handleAddTask} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  section: {
    marginBottom: 32,
  },
});

export default TaskOverview;