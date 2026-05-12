import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface UpcomingReminderCardProps {
  title: string;
  time: string;
  day: string;
  enabled: boolean;
  completed?: boolean;
  onToggle: () => void;
  onCompleteToggle?: () => void;
  style?: StyleProp<ViewStyle>;
}

const UpcomingReminderCard = ({
  title,
  time,
  day,
  enabled,
  completed = false,
  onToggle,
  onCompleteToggle,
  style,
}: UpcomingReminderCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onCompleteToggle}
      style={[
        styles.card,
        style,
        !enabled && styles.cardDisabled,
        completed && styles.cardCompleted,
      ]}
    >
      <Text
        style={[
          styles.title,
          completed && styles.titleCompleted,
          !enabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>

      <View style={styles.timeRow}>
        <Text
          style={[
            styles.time,
            completed && styles.timeCompleted,
            !enabled && styles.textDisabled,
          ]}
        >
          {time}
        </Text>

        <Text
          style={[
            styles.period,
            completed && styles.timeCompleted,
            !enabled && styles.textDisabled,
          ]}
        >
          PM
        </Text>
      </View>

      <Text
        style={[
          styles.day,
          completed && styles.titleCompleted,
          !enabled && styles.textDisabled,
        ]}
      >
        {day}
      </Text>

      <TouchableOpacity
        style={[styles.toggleTrack, enabled && styles.toggleTrackOn]}
        onPress={(e) => {
          e.stopPropagation?.();
          onToggle();
        }}
        activeOpacity={0.85}
        accessibilityRole="switch"
        accessibilityState={{ checked: enabled }}
      >
        <View
          style={[
            styles.toggleKnob,
            enabled && styles.toggleKnobOn,
          ]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minHeight: 120,
    backgroundColor: "#3c3637",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    justifyContent: "space-between",
  },

  cardDisabled: {
    opacity: 1,
  },

  cardCompleted: {
    backgroundColor: "#2c2a2a",
  },

  title: {
    fontSize: 12,
    lineHeight: 14,
    color: "#e7e1df",
  },

  titleCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.8,
  },

  textDisabled: {
    color: "#8f8b89",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 2,
  },

  time: {
    fontSize: 25,
    lineHeight: 29,
    fontWeight: "400",
    color: "#fff",
  },

  timeCompleted: {
    opacity: 0.7,
  },

  period: {
    marginTop: 4,
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },

  day: {
    fontSize: 12,
    color: "#b8b0ad",
    marginTop: -2,
  },

  toggleTrack: {
    alignSelf: "flex-end",
    width: 36,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#6d6d6d",
    padding: 2,
    justifyContent: "center",
  },

  toggleTrackOn: {
    backgroundColor: "#a9ab86",
  },

  toggleKnob: {
    width: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: "#f5efe9",
    alignSelf: "flex-start",
  },

  toggleKnobOn: {
    alignSelf: "flex-end",
  },
});

export default UpcomingReminderCard;