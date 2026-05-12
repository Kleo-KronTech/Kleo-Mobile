import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CurrentReminderCardProps {
  time: string;
  period: string;
  title: string;
  onDismiss: () => void;
}

const CurrentReminderCard = ({
  time,
  period,
  title,
  onDismiss,
}: CurrentReminderCardProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.timeRow}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.period}>{period}</Text>
          </View>

          <Text style={styles.now}>NOW</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity style={styles.dismissButton} onPress={onDismiss} activeOpacity={0.8}>
        <Text style={styles.dismissText}>DISMISS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 14,
  },
  card: {
    backgroundColor: "#4f40bb",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  time: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.2,
  },
  period: {
    marginTop: 2,
    marginLeft: 2,
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },
  now: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    marginTop: 2,
  },
  dismissButton: {
    height: 38,
    borderRadius: 999,
    backgroundColor: "#e25f4f",
    alignItems: "center",
    justifyContent: "center",
  },
  dismissText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#121212",
    letterSpacing: 0.3,
  },
});

export default CurrentReminderCard;