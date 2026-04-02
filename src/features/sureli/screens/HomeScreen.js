import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import SureliLayout from "../components/SureliLayout";
import {
  FooterColumn,
  PageHeading,
  PrimaryButton,
  SocialRow,
  SureliLogo,
} from "../components/SureliPrimitives";
import { homeAbilities, homeRules, homeWhyPlay, sureliAssets } from "../data/catalog";
import { colors, layout } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";
import { useSureliAuth } from "../hooks/useSureliAuth";

const FREE_GAME_PROMPT_KEY = "sureli.freeGamePromptSeen";

export default function HomeScreen({ navigation }) {
  const { isAuthenticated } = useSureliAuth();
  const [freeGamePromptVisible, setFreeGamePromptVisible] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadPromptState = async () => {
      try {
        const seen = await AsyncStorage.getItem(FREE_GAME_PROMPT_KEY);

        if (mounted && !seen && !isAuthenticated) {
          setFreeGamePromptVisible(true);
        }
      } catch {
        if (mounted && !isAuthenticated) {
          setFreeGamePromptVisible(true);
        }
      }
    };

    loadPromptState();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const dismissFreeGamePrompt = async () => {
    setFreeGamePromptVisible(false);

    try {
      await AsyncStorage.setItem(FREE_GAME_PROMPT_KEY, "true");
    } catch {
      // Keep the UI responsive even if persistence fails.
    }
  };

  const claimFreeGame = async () => {
    await dismissFreeGamePrompt();
    navigation.navigate("SureliStartGameCategories");
  };

  return (
    <>
      <SureliLayout navigation={navigation} activeRoute="SureliHome">
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>THE ULTIMATE SOCIAL TRIVIA GAME</Text>
        </View>

        <PageHeading
          title="Challenge Your Friends."
          accent="Prove your Knowledge."
          subtitle="Sureli is the fast paced trivia game that turns any hangout into an epic battle of wits. Perfect for college parties and family game nights."
        />

        <View style={styles.heroCtaWrap}>
          <PrimaryButton label="Start a Game Now" onPress={() => navigation.navigate("SureliStartGameCategories")} style={styles.heroCta} />
        </View>

        <SectionHeader title="Why Play Sureli?" subtitle="Fast, fun, and surprisingly competitive." />
        <View style={styles.threeGrid}>
          {homeWhyPlay.map((item) => (
            <View key={item.title} style={styles.softCard}>
              <View style={styles.softCardIcon}>
                <Text style={styles.softCardIconText}>o</Text>
              </View>
              <Text style={styles.softCardTitle}>{item.title}</Text>
              <Text style={styles.softCardBody}>{item.body}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Game Rules" subtitle="Fast, fun, and surprisingly competitive." />
        <View style={styles.rulesGrid}>
          {homeRules.map((item, index) => (
            <View key={`${item.title}-${index}`} style={styles.ruleRow}>
              <Image source={item.image} style={styles.ruleThumb} />
              <View style={styles.ruleCopy}>
                <Text style={styles.ruleTitle}>{item.title}</Text>
                <Text style={styles.ruleBody}>{item.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <SectionHeader title="Game Abilities" subtitle="Choose your help wisely and make every move count." />
        <View style={styles.abilityGrid}>
          {homeAbilities.map((item) => (
            <View key={item.title} style={styles.softCard}>
              <Image source={sureliAssets.imgProfile} style={styles.abilityImage} />
              <Text style={styles.softCardTitle}>{item.title}</Text>
              <Text style={styles.softCardBody}>{item.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.readyBand}>
          <Text style={styles.readyTitle}>Ready to Play?</Text>
          <Text style={styles.readySubtitle}>
            Gather your friends, pick a category, and let the battle of knowledge begin!
          </Text>
          <PrimaryButton label="START A NEW GAME NOW" onPress={() => navigation.navigate("SureliStartGameCategories")} style={styles.readyButton} />
        </View>
      </SureliLayout>

      <Modal
        animationType="fade"
        transparent
        visible={freeGamePromptVisible}
        presentationStyle="fullScreen"
        supportedOrientations={["landscape-left", "landscape-right"]}
        onRequestClose={dismissFreeGamePrompt}
      >
        <View style={styles.promptBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={dismissFreeGamePrompt} />
          <View style={styles.promptCard}>
            <Pressable style={styles.promptClose} onPress={dismissFreeGamePrompt}>
              <Text style={styles.promptCloseText}>×</Text>
            </Pressable>
            <View style={styles.promptBadge}>
              <Text style={styles.promptBadgeText}>NEW PLAYER BONUS</Text>
            </View>
            <Text style={styles.promptTitle}>Your first game is free</Text>
            <Text style={styles.promptBody}>
              Welcome to Sureli. Start your first trivia battle on us and see how the game feels before buying more packs.
            </Text>
            <PrimaryButton
              label="Claim Free Game"
              onPress={claimFreeGame}
              style={styles.promptPrimaryButton}
              textStyle={styles.promptPrimaryButtonText}
            />
            <Pressable onPress={dismissFreeGamePrompt}>
              <Text style={styles.promptSecondaryText}>Maybe later</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroBadge: {
    alignSelf: "center",
    backgroundColor: "#F3F6FA",
    borderRadius: 999,
    paddingHorizontal: rf(16, 10, 16),
    paddingVertical: rf(8, 5, 8),
    marginTop: rf(12, 8, 12),
  },
  heroBadgeText: { color: colors.textSoft, fontWeight: "800", fontSize: rf(11, 9, 11) },
  heroCtaWrap: { alignItems: "center", marginTop: rf(18, 12, 18) },
  heroCta: { minWidth: rf(260, 180, 260), borderRadius: 999 },
  sectionHeader: { alignItems: "center", marginTop: rf(46, 26, 46), marginBottom: rf(22, 14, 22), gap: rf(6, 4, 6) },
  sectionTitle: { color: colors.ink, fontSize: rf(42, 24, 42), fontWeight: "800", textAlign: "center" },
  sectionSubtitle: { color: colors.textSoft, fontSize: rf(15, 12, 15), textAlign: "center" },
  threeGrid: { flexDirection: "row", gap: rf(22, 12, 22), flexWrap: "wrap", justifyContent: "center" },
  softCard: {
    flexBasis: rw(320, 1440),
    maxWidth: rw(350, 1440),
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FFEAF7",
    borderRadius: rf(16, 12, 16),
    paddingHorizontal: rf(26, 16, 26),
    paddingVertical: rf(22, 16, 22),
    gap: rf(12, 8, 12),
  },
  softCardIcon: {
    width: rf(38, 30, 38),
    height: rf(38, 30, 38),
    borderRadius: 19,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  softCardIconText: { color: "#FFFFFF", fontWeight: "900" },
  softCardTitle: { color: colors.ink, fontSize: rf(18, 14, 18), fontWeight: "800" },
  softCardBody: { color: colors.textSoft, textAlign: "center", lineHeight: rf(22, 18, 22), fontSize: rf(14, 12, 14) },
  rulesGrid: { flexDirection: "row", flexWrap: "wrap", gap: rf(20, 12, 20) },
  ruleRow: { flexBasis: rw(360, 1440), flexGrow: 1, flexDirection: "row", gap: rf(14, 10, 14), alignItems: "flex-start" },
  ruleThumb: { width: rf(68, 52, 68), height: rf(68, 52, 68), borderRadius: rf(14, 10, 14) },
  ruleCopy: { flex: 1, gap: 6 },
  ruleTitle: { color: colors.ink, fontSize: rf(16, 13, 16), fontWeight: "800" },
  ruleBody: { color: colors.textSoft, lineHeight: rf(21, 17, 21), fontSize: rf(14, 12, 14) },
  storeBand: {
    marginTop: rf(34, 20, 34),
    backgroundColor: "#FFEAF7",
    borderRadius: rf(16, 12, 16),
    paddingHorizontal: rf(24, 16, 24),
    paddingVertical: rf(20, 14, 20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: rf(20, 12, 20),
    flexWrap: "wrap",
  },
  storeLeft: { flexDirection: "row", alignItems: "center", gap: rf(18, 12, 18) },
  starRow: { color: colors.orange, fontSize: rf(24, 18, 24), letterSpacing: 2 },
  storeText: { color: colors.ink, fontSize: rf(20, 14, 20), fontWeight: "700" },
  storeButtons: { flexDirection: "row", gap: rf(16, 10, 16), flexWrap: "wrap" },
  storeButtonBlack: {
    backgroundColor: "#111111",
    borderRadius: rf(10, 8, 10),
    paddingHorizontal: rf(18, 12, 18),
    paddingVertical: rf(12, 8, 12),
    minWidth: rf(170, 130, 170),
  },
  storeButtonSmall: { color: "#FFFFFF", fontSize: rf(11, 9, 11) },
  storeButtonBig: { color: "#FFFFFF", fontSize: rf(24, 17, 24), fontWeight: "800" },
  abilityGrid: { flexDirection: "row", gap: rf(18, 10, 18), flexWrap: "wrap", justifyContent: "center" },
  abilityImage: { width: rf(56, 42, 56), height: rf(56, 42, 56), borderRadius: 999 },
  readyBand: {
    marginTop: rf(50, 28, 50),
    marginHorizontal: -28,
    paddingHorizontal: rw(28, 1440),
    paddingVertical: rf(54, 32, 54),
    backgroundColor: "#DDE6F2",
    alignItems: "center",
    gap: rf(10, 6, 10),
  },
  readyTitle: { color: colors.ink, fontSize: rf(38, 24, 38), fontWeight: "800" },
  readySubtitle: { color: colors.textSoft, textAlign: "center", fontSize: rf(14, 12, 14) },
  readyButton: { minWidth: rf(240, 180, 240), borderRadius: 999, marginTop: rf(10, 6, 10) },
  promptBackdrop: {
    flex: 1,
    backgroundColor: "rgba(23, 27, 35, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  promptCard: {
    width: "100%",
    maxWidth: 460,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 24,
    alignItems: "center",
    shadowColor: "#251427",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  promptClose: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F7EFF5",
    alignItems: "center",
    justifyContent: "center",
  },
  promptCloseText: {
    color: "#6B546A",
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "700",
  },
  promptBadge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#FFE6F5",
  },
  promptBadgeText: {
    color: colors.pink,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  promptTitle: {
    marginTop: 18,
    color: colors.ink,
    fontSize: rf(28, 22, 30),
    fontWeight: "800",
    textAlign: "center",
  },
  promptBody: {
    marginTop: 10,
    color: colors.textSoft,
    fontSize: rf(15, 13, 16),
    lineHeight: rf(24, 20, 25),
    textAlign: "center",
  },
  promptPrimaryButton: {
    minWidth: 230,
    borderRadius: 999,
    marginTop: 24,
  },
  promptPrimaryButtonText: {
    fontSize: rf(16, 14, 17),
    fontWeight: "800",
  },
  promptSecondaryText: {
    marginTop: 16,
    color: colors.textSoft,
    fontSize: rf(14, 12, 15),
    fontWeight: "700",
  },
});
