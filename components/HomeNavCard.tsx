import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface HomeNavCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  accentColor?: string;
  style?: ViewStyle;
}

const HomeNavCard = ({
  title,
  subtitle,
  icon,
  onPress,
  accentColor = "#5e54b8",
  style,
}: HomeNavCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { borderLeftColor: accentColor },
        pressed && styles.cardPressed,
        style,
      ]}
    >
      <View style={styles.iconWrap}>
        <MaterialIcons name={icon} size={22} color={accentColor} />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#b6b6b6" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderLeftWidth: 4,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#f5f3ff",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f1f1f",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: "#777",
  },
});

export default HomeNavCard;