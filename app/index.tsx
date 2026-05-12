import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AppLogo from "@/components/AppLogo";
import HomeNavCard from "@/components/HomeNavCard";

const HOME_ROUTES = [
  {
    title: "Task Overview",
    subtitle: "See today's tasks, mark them complete, and add new ones.",
    icon: "task-alt" as const,
    route: "/task-overview",
    accentColor: "#5e54b8",
  },
  {
    title: "Messages",
    subtitle: "Read messages from your caretaker in one place.",
    icon: "chat" as const,
    route: "/messages",
    accentColor: "#68a0df",
  },
  {
    title: "Alarms",
    subtitle: "Open your alarms page to manage reminders and alerts.",
    icon: "alarm" as const,
    route: "/alarms",
    accentColor: "#64b6cd",
  },
] as const satisfies Array<{
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: "/task-overview" | "/messages" | "/alarms";
  accentColor: string;
}>;

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.kicker}>Kleo</Text>
              <Text style={styles.title}>Welcome home</Text>
            </View>
            <AppLogo size={54} />
          </View>

          <Text style={styles.subtitle}>
            Jump into tasks, messages, or alarms from one simple screen.
          </Text>
        </View>

        <View style={styles.quickStatRow}>
          <View style={styles.quickStatCard}>
            <MaterialIcons name="check-circle" size={20} color="#5e54b8" />
            <Text style={styles.quickStatValue}>Today</Text>
            <Text style={styles.quickStatLabel}>task overview</Text>
          </View>
          <View style={styles.quickStatCard}>
            <MaterialIcons name="message" size={20} color="#4a90e2" />
            <Text style={styles.quickStatValue}>New</Text>
            <Text style={styles.quickStatLabel}>messages</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigate</Text>

          <View style={styles.cardList}>
            {HOME_ROUTES.map((item) => (
              <HomeNavCard
                key={item.route}
                title={item.title}
                subtitle={item.subtitle}
                icon={item.icon}
                accentColor={item.accentColor}
                onPress={() => router.push(item.route)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  hero: {
    marginTop: 20,
    marginBottom: 28,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: "#5e54b8",
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#808080",
    maxWidth: 320,
  },
  quickStatRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f1f1f",
    marginTop: 2,
  },
  quickStatLabel: {
    fontSize: 12,
    color: "#8a8a8a",
    textTransform: "capitalize",
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5e54b8",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  cardList: {
    gap: 12,
  },
});
