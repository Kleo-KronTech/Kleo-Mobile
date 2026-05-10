import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";

type Category =
  | "hygiene"
  | "pets"
  | "house"
  | "work"
  | "shopping"
  | "health"
  | "fitness"
  | "education"
  | "other";

const categoryIcons: Record<Category, string> = {
  hygiene: "sanitizer",
  pets: "pets",
  house: "home",
  work: "work",
  shopping: "shopping-cart",
  health: "favorite",
  fitness: "fitness-center",
  education: "school",
  other: "category",
};

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/reminders`;

const CreateTask = () => {
  const { taskText } = useLocalSearchParams();

  const [taskName, setTaskName] = useState((taskText as string) || "");
  const [selectedDate, setSelectedDate] = useState(28);
  const [selectedCategory, setSelectedCategory] = useState<Category>("pets");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hours, setHours] = useState("06");
  const [minutes, setMinutes] = useState("28");
  const [seconds, setSeconds] = useState("55");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");

  const today = new Date(2026, 4, 26);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);

  const categories: Category[] = [
    "hygiene",
    "pets",
    "house",
    "work",
    "shopping",
    "health",
    "fitness",
    "education",
    "other",
  ];

  const handleCreateTask = async () => {
    if (!taskName.trim()) return;

    try {
      let hour24 = parseInt(hours, 10);

      if (period === "PM" && hour24 !== 12) {
        hour24 += 12;
      }

      if (period === "AM" && hour24 === 12) {
        hour24 = 0;
      }

      // create FULL datetime
      const reminderDate = new Date(
        2026,
        4,
        selectedDate,
        hour24,
        parseInt(minutes, 10),
        parseInt(seconds, 10),
      );

      console.log("Sending date:", reminderDate);

      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: taskName,
          reminderDate: reminderDate.toISOString(),
          category: selectedCategory,
          repeatDays: [],
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create reminder");
      }

      console.log("Reminder created:", result);

      setTaskName("");
    } catch (error) {
      console.error("Create reminder error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Create new task</Text>
        <TouchableOpacity style={styles.plusButton}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TextInput
          style={styles.taskInput}
          placeholder="Write a task..."
          placeholderTextColor="#999"
          value={taskName}
          onChangeText={setTaskName}
        />
      </View>

      <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      <TimePicker
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        period={period}
        onHoursChange={setHours}
        onMinutesChange={setMinutes}
        onSecondsChange={setSeconds}
        onPeriodChange={setPeriod}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category</Text>

        <TouchableOpacity
          style={[
            styles.dropdownButton,
            dropdownOpen && styles.dropdownButtonOpen,
          ]}
          onPress={() => setDropdownOpen(!dropdownOpen)}
          activeOpacity={0.8}
        >
          <View style={styles.dropdownButtonLeft}>
            <View style={styles.dropdownIconWrapper}>
              <MaterialIcons
                name={categoryIcons[selectedCategory] as any}
                size={18}
                color="#5e54b8"
              />
            </View>
            <Text style={styles.dropdownButtonText}>
              {selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}
            </Text>
          </View>
          <MaterialIcons
            name={dropdownOpen ? "expand-less" : "expand-more"}
            size={22}
            color="#5e54b8"
          />
        </TouchableOpacity>

        {dropdownOpen && (
          <View style={styles.dropdownMenu}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.dropdownItem,
                  selectedCategory === category && styles.dropdownItemSelected,
                  index === categories.length - 1 && styles.dropdownItemLast,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setDropdownOpen(false);
                }}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.dropdownItemIcon,
                    selectedCategory === category &&
                      styles.dropdownItemIconSelected,
                  ]}
                >
                  <MaterialIcons
                    name={categoryIcons[category] as any}
                    size={16}
                    color={selectedCategory === category ? "#5e54b8" : "#999"}
                  />
                </View>
                <Text
                  style={[
                    styles.dropdownItemLabel,
                    selectedCategory === category &&
                      styles.dropdownItemLabelSelected,
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                {selectedCategory === category && (
                  <MaterialIcons name="check" size={18} color="#5e54b8" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
        <Text style={styles.createButtonText}>Create Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#5e54b8",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  taskInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  datePickerContainer: {
    flexDirection: "row",
    gap: 8,
  },
  dateItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#e8e8e8",
  },
  dateItemSelected: {
    backgroundColor: "#5e54b8",
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  dayLabelSelected: {
    color: "#fff",
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  dayNumberSelected: {
    color: "#fff",
  },
  // Time Picker
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    gap: 4,
  },
  timeColumn: {
    alignItems: "center",
    paddingHorizontal: 8,
  },
  timeValueMain: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    paddingVertical: 6,
  },
  timeValueDim: {
    fontSize: 18,
    fontWeight: "400",
    color: "#bbb",
    paddingVertical: 6,
  },
  timeColon: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },

  categoryTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dropdownIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f0eeff",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#5e54b8",
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  dropdownButtonOpen: {
    borderColor: "#5e54b8",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemSelected: {
    backgroundColor: "#f5f3ff",
  },
  dropdownItemIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dropdownItemIconSelected: {
    backgroundColor: "#ebe8ff",
  },
  dropdownItemLabel: {
    fontSize: 15,
    color: "#555",
    flex: 1,
  },
  dropdownItemLabelSelected: {
    color: "#5e54b8",
    fontWeight: "600",
  },

  dropdownCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownCheckboxChecked: {
    backgroundColor: "#f0f0f0",
    borderColor: "#5e54b8",
  },
  createButton: {
    backgroundColor: "#5e54b8",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 40,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default CreateTask;
