import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface DatePickerProps {
  selectedDate: number;
  onSelectDate: (date: number) => void;
}

const today = new Date(2026, 4, 26);
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay() + 1);

const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(startOfWeek);
  date.setDate(startOfWeek.getDate() + i);
  return date;
});

const dayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const DatePicker = ({ selectedDate, onSelectDate }: DatePickerProps) => {
  return (
    <View style={styles.datePickerContainer}>
      {dates.map((date, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectDate(date.getDate())}
          style={[
            styles.dateItem,
            selectedDate === date.getDate() && styles.dateItemSelected,
          ]}
        >
          <Text style={[styles.dayLabel, selectedDate === date.getDate() && styles.dayLabelSelected]}>
            {dayLabels[index]}
          </Text>
          <Text style={[styles.dayNumber, selectedDate === date.getDate() && styles.dayNumberSelected]}>
            {date.getDate()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});

export default DatePicker;