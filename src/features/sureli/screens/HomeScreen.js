import { Image, StyleSheet, Text, View } from "react-native";
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

export default function HomeScreen({ navigation }) {
  return (
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

      {/* <View style={styles.storeBand}>
        <View style={styles.storeLeft}>
          <SureliLogo />
          <View>
            <Text style={styles.starRow}>★★★★★</Text>
            <Text style={styles.storeText}>Rating: 5 - 33 Review</Text>
          </View>
        </View>
        <View style={styles.storeButtons}>
          <View style={styles.storeButtonBlack}>
            <Text style={styles.storeButtonSmall}>Download on the</Text>
            <Text style={styles.storeButtonBig}>App Store</Text>
          </View>
          <View style={styles.storeButtonBlack}>
            <Text style={styles.storeButtonSmall}>GET IT ON</Text>
            <Text style={styles.storeButtonBig}>Google Play</Text>
          </View>
        </View>
      </View> */}

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
});
