import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../shared/theme/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("SureliHome");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>SUR{"\n"}ELI</Text>
        </View>
        <Text style={styles.brand}>Sureli</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoBox: {
    width: 132,
    height: 132,
    borderRadius: 24,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 34,
    fontWeight: "900",
    textAlign: "center",
  },
  brand: {
    marginTop: 20,
    color: colors.ink,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
