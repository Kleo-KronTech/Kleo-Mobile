import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AppLogo from "@/components/AppLogo";

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/messages`;

type Message = {
  id: string;
  message: string;
  sentBy: string;
  createdAt: string;
};

const formatTime = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
};

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMessages(data);
    } catch {
      setError("Could not load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Messages</Text>
            <AppLogo size={48} />
          </View>
          <Text style={styles.subtitle}>From your caretaker</Text>
        </View>

        {/* Content */}
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#5e54b8" />
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No messages yet.</Text>
            <Text style={styles.emptySubText}>Your caretaker hasn't sent anything yet.</Text>
          </View>
        ) : (
          <View style={styles.messageList}>
            {messages.map((msg, i) => {
              const showDate =
                i === 0 ||
                formatDate(msg.createdAt) !== formatDate(messages[i - 1].createdAt);

              return (
                <View key={msg.id}>
                  {showDate && (
                    <Text style={styles.dateLabel}>{formatDate(msg.createdAt)}</Text>
                  )}
                  <View style={styles.messageBubble}>
                    <Text style={styles.senderName}>{msg.sentBy}</Text>
                    <Text style={styles.messageText}>{msg.message}</Text>
                    <Text style={styles.timeText}>{formatTime(msg.createdAt)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#e24b4a",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  emptySubText: {
    fontSize: 13,
    color: "#999",
  },
  messageList: {
    gap: 8,
    paddingBottom: 40,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999",
    textAlign: "center",
    marginVertical: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  messageBubble: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#5e54b8",
  },
  senderName: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5e54b8",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  messageText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  timeText: {
    fontSize: 11,
    color: "#bbb",
    marginTop: 6,
    textAlign: "right",
  },
});

export default MessagesPage;