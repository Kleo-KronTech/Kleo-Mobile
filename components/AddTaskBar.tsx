import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

interface AddTaskBarProps {
  value: string;
  onChange: (text: string) => void;
  onAdd: () => void;
}

const AddTaskBar = ({ value, onChange, onAdd }: AddTaskBarProps) => {
  return (
    <View style={styles.addTaskContainer}>
      <TextInput
        style={styles.taskInput}
        placeholder="Write a task..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskContainer: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    paddingBottom: 45,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  taskInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#5e54b8",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddTaskBar;