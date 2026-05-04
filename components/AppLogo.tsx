import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface AppLogoProps {
  size?: number;
}

const AppLogo = ({ size = 48 }: AppLogoProps) => {
  return (
    <View style={[styles.container, 
    { width: size, 
    height: size, 
    borderRadius: size/2,
    padding: size*0.15, 
    }]}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ 
            width: "100%", 
            height: "100%"
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});

export default AppLogo;