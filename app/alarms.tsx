import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CurrentReminderCard from "@/components/CurrentReminderCard";
import UpcomingReminderCard from "@/components/UpcomingReminderCard";

export default function Alarms() {
  const [reminders, setReminders] = useState([
    {
      id: "1",
      title: "feed cactus",
      time: "10:00",
      day: "today",
      enabled: true,
      completed: false,
    },
    {
      id: "2",
      title: "brush teeth",
      time: "10:00",
      day: "Everyday",
      enabled: true,
      completed: false,
    },
    {
      id: "3",
      title: "doctors appointment",
      time: "10:00",
      day: "Tuesday",
      enabled: true,
      completed: false,
    },
    {
      id: "4",
      title: "Sleep",
      time: "10:00",
      day: "Everyday",
      enabled: true,
      completed: false,
    },
  ]);

  const toggleReminder = (id: string) => {
    setReminders((current) =>
      current.map((reminder) =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const toggleCompleted = (id: string) => {
    setReminders((current) =>
      current.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#bcaaf6", "#f5f5f5"]}
        start={{ x: -1, y: 1.2 }}
        end={{ x: 0.2, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Current</Text>

        <CurrentReminderCard
          time="10:00"
          period="PM"
          title="take dogs to the vet"
          onDismiss={() =>
            setReminders((current) => current.slice(1))
          }
        />

        <Text style={[styles.sectionTitle, styles.upcomingTitle]}>
          Upcoming tasks
        </Text>

        <View style={styles.grid}>
          {reminders.map((reminder) => (
            <UpcomingReminderCard
              key={reminder.id}
              title={reminder.title}
              time={reminder.time}
              day={reminder.day}
              enabled={reminder.enabled}
              completed={reminder.completed}
              onToggle={() => toggleReminder(reminder.id)}
              onCompleteToggle={() =>
                toggleCompleted(reminder.id)
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    paddingHorizontal: 18,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: "#0f0f0f",
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 4,
  },

  upcomingTitle: {
    marginTop: 20,
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
    paddingBottom: 24,
  },
});