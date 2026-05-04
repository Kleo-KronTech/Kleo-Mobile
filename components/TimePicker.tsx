import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TimePickerProps {
  hours: string;
  minutes: string;
  seconds: string;
  period: "AM" | "PM";
  onHoursChange: (val: string) => void;
  onMinutesChange: (val: string) => void;
  onSecondsChange: (val: string) => void;
  onPeriodChange: (val: "AM" | "PM") => void;
}

const incrementValue = (value: string, max: number) => {
  const num = parseInt(value, 10) + 1;
  return (num > max ? 0 : num).toString().padStart(2, "0");
};

const decrementValue = (value: string, max: number) => {
  const num = parseInt(value, 10) - 1;
  return (num < 0 ? max : num).toString().padStart(2, "0");
};

const TimePicker = ({
  hours, minutes, seconds, period,
  onHoursChange, onMinutesChange, onSecondsChange, onPeriodChange,
}: TimePickerProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Choose hour</Text>
      <View style={styles.timePicker}>

       
        <View style={styles.timeColumn}>
          <TouchableOpacity onPress={() => onHoursChange(incrementValue(hours, 23))}>
            <Text style={styles.timeValueDim}>{incrementValue(hours, 23)}</Text>
          </TouchableOpacity>
          <Text style={styles.timeValueMain}>{hours}</Text>
          <TouchableOpacity onPress={() => onHoursChange(decrementValue(hours, 23))}>
            <Text style={styles.timeValueDim}>{decrementValue(hours, 23)}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.timeColon}>:</Text>

      
        <View style={styles.timeColumn}>
          <TouchableOpacity onPress={() => onMinutesChange(incrementValue(minutes, 59))}>
            <Text style={styles.timeValueDim}>{incrementValue(minutes, 59)}</Text>
          </TouchableOpacity>
          <Text style={styles.timeValueMain}>{minutes}</Text>
          <TouchableOpacity onPress={() => onMinutesChange(decrementValue(minutes, 59))}>
            <Text style={styles.timeValueDim}>{decrementValue(minutes, 59)}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.timeColon}>:</Text>

        
        <View style={styles.timeColumn}>
          <TouchableOpacity onPress={() => onSecondsChange(incrementValue(seconds, 59))}>
            <Text style={styles.timeValueDim}>{incrementValue(seconds, 59)}</Text>
          </TouchableOpacity>
          <Text style={styles.timeValueMain}>{seconds}</Text>
          <TouchableOpacity onPress={() => onSecondsChange(decrementValue(seconds, 59))}>
            <Text style={styles.timeValueDim}>{decrementValue(seconds, 59)}</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.periodColumn}>
          <TouchableOpacity
            onPress={() => onPeriodChange("AM")}
            style={[styles.periodButton, period === "AM" && styles.periodButtonSelected]}
          >
            <Text style={[styles.periodText, period === "AM" && styles.periodTextSelected]}>AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPeriodChange("PM")}
            style={[styles.periodButton, period === "PM" && styles.periodButtonSelected]}
          >
            <Text style={[styles.periodText, period === "PM" && styles.periodTextSelected]}>PM</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
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
  periodColumn: {
    alignItems: "center",
    marginLeft: 12,
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  periodButtonSelected: {
    backgroundColor: "#5e54b8",
  },
  periodText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#999",
  },
  periodTextSelected: {
    color: "#fff",
  },
});

export default TimePicker;