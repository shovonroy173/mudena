import { useState } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { PrimaryButton, SureliLogo } from "./SureliPrimitives";
import { colors } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";
import { useSureliAuth } from "../hooks/useSureliAuth";
import { MobileLandscapeHeaderActions, MobileLandscapeMenu } from "./MobileLandscapeMenu";

export function GameFlowHeader({ navigation, activeRoute = "" }) {
  const { width: viewportWidth, height: viewportHeight } = useWindowDimensions();
  const { isAuthenticated } = useSureliAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const showMobileLandscapeMenu = viewportWidth > viewportHeight && viewportWidth <= 950;

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            setMenuOpen(false);
            navigation.navigate("SureliHome");
          }}
        >
          <SureliLogo />
        </Pressable>

        {showMobileLandscapeMenu ? (
          <MobileLandscapeHeaderActions
            navigation={navigation}
            menuOpen={menuOpen}
            onMenuPress={() => setMenuOpen((current) => !current)}
          />
        ) : (
          <View style={styles.headerRight}>
            <Pressable onPress={() => navigation.navigate("SureliLogin")}>
              <Text style={styles.loginText}>Log In</Text>
            </Pressable>
            <PrimaryButton
              label="Start a Game"
              onPress={() => navigation.navigate("SureliStartGameCategories")}
              style={styles.headerButton}
              textStyle={styles.headerButtonText}
            />
            <Text style={styles.menuIcon}>☰</Text>
          </View>
        )}
      </View>
      {showMobileLandscapeMenu && menuOpen ? (
        <MobileLandscapeMenu
          navigation={navigation}
          isAuthenticated={isAuthenticated}
          activeRoute={activeRoute}
          onClose={() => setMenuOpen(false)}
        />
      ) : null}
    </>
  );
}

export function GameFlowFooter({ navigation }) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerBrand}>Sureli</Text>
      <View style={styles.footerLinks}>
        <Pressable onPress={() => navigation.navigate("SureliPrivacy")}>
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </Pressable>
        <Text style={styles.footerLink}>Terms of Service</Text>
        <Text style={styles.footerLink}>Support</Text>
      </View>
      <Text style={styles.footerCopy}>© 2024 Sureli Trivia. Elevate your knowledge.</Text>
    </View>
  );
}

export function GameSidePanel({ team, accent = "pink" }) {
  const initial = team?.name?.charAt(0)?.toUpperCase() || "T";
  return (
    <View style={styles.sidePanel}>
      <View style={styles.sideAvatar}>
        <Text style={styles.sideAvatarText}>{initial}</Text>
      </View>
      <Text style={styles.sideName}>{team?.name || "Team"}</Text>
      <View style={styles.sideScoreCard}>
        <Text style={[styles.sideScoreValue, accent === "purple" ? styles.sideScorePurple : null]}>
          {String(team?.score ?? 0).padStart(2, "0")}
        </Text>
        <Text style={styles.sideScoreLabel}>CURRENT POINTS</Text>
      </View>
      <View style={styles.sideAidRow}>
        {["🤘", "⇅", "📞"].map((item) => (
          <View key={`${team?.id}-${item}`} style={styles.sideAidBox}>
            <Text style={styles.sideAidText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function QuestionSideRail({ team }) {
  return (
    <View style={styles.questionRail}>
      <Text style={styles.questionRailLabel}>TEAM ALPHA</Text>
      <Text style={styles.questionRailName}>{team?.name?.toUpperCase() || "TEAM"}</Text>
      <Text style={styles.questionRailScore}>{team?.score ?? 0}</Text>
      <View style={styles.questionRailIcons}>
        {["↔", "◔", "★"].map((item) => (
          <View key={`${team?.id}-${item}`} style={styles.questionRailCircle}>
            <Text style={styles.questionRailCircleText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(14, 8, 14),
  },
  loginText: {
    color: colors.ink,
    fontSize: rf(14, 12, 14),
    fontWeight: "700",
  },
  headerButton: {
    minWidth: rf(114, 92, 114),
    paddingHorizontal: rf(16, 12, 16),
    paddingVertical: rf(10, 8, 10),
    borderRadius: 999,
  },
  headerButtonText: {
    fontSize: rf(12, 10, 12),
    fontWeight: "800",
  },
  menuIcon: {
    color: "#64748B",
    fontSize: rf(18, 15, 18),
    fontWeight: "800",
  },
  footer: {
    marginHorizontal: -rw(28, 1440),
    marginTop: rf(28, 18, 28),
    paddingTop: rf(48, 30, 48),
    paddingBottom: rf(50, 32, 50),
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    gap: rf(18, 12, 18),
  },
  footerBrand: {
    color: colors.pink,
    fontSize: rf(28, 22, 28),
    fontWeight: "800",
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(34, 18, 34),
    flexWrap: "wrap",
    justifyContent: "center",
  },
  footerLink: {
    color: "#939CAB",
    fontSize: rf(13, 10, 13),
    fontWeight: "500",
  },
  footerCopy: {
    color: "#939393",
    fontSize: rf(12, 10, 12),
    fontWeight: "400",
    textAlign: "center",
  },
  sidePanel: {
    flex: 1,
    minWidth: rw(250, 1440),
    borderRadius: rf(18, 12, 18),
    backgroundColor: "#FFEAF5",
    padding: rf(16, 12, 16),
    gap: rf(12, 8, 12),
  },
  sideAvatar: {
    width: rf(26, 22, 26),
    height: rf(26, 22, 26),
    borderRadius: 999,
    backgroundColor: "#D67AC2",
    alignItems: "center",
    justifyContent: "center",
  },
  sideAvatarText: {
    color: "#FFFFFF",
    fontSize: rf(12, 10, 12),
    fontWeight: "800",
  },
  sideName: {
    color: colors.ink,
    fontSize: rf(20, 16, 20),
    fontWeight: "800",
  },
  sideScoreCard: {
    borderRadius: rf(16, 10, 16),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: rf(16, 12, 16),
  },
  sideScoreValue: {
    color: colors.pink,
    fontSize: rf(34, 26, 34),
    fontWeight: "900",
    lineHeight: rf(36, 28, 36),
  },
  sideScorePurple: {
    color: "#5963CE",
  },
  sideScoreLabel: {
    color: "#D4C3CB",
    fontSize: rf(10, 8, 10),
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  sideAidRow: {
    flexDirection: "row",
    gap: rf(12, 8, 12),
  },
  sideAidBox: {
    width: rf(44, 34, 44),
    height: rf(44, 34, 44),
    borderRadius: rf(12, 8, 12),
    borderWidth: 2,
    borderColor: colors.pink,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  sideAidText: {
    fontSize: rf(17, 13, 17),
  },
  questionRail: {
    width: rw(250, 1440),
    minHeight: rf(278, 208, 278),
    borderRadius: rf(18, 14, 18),
    backgroundColor: "#FAD9EB",
    paddingVertical: rf(30, 22, 30),
    paddingHorizontal: rf(22, 16, 22),
    alignItems: "center",
    justifyContent: "center",
    gap: rf(12, 8, 12),
  },
  questionRailLabel: {
    color: "#7A6674",
    fontSize: rf(11, 9, 11),
    fontWeight: "700",
    letterSpacing: 1.1,
  },
  questionRailName: {
    color: "#B90077",
    fontSize: rf(26, 19, 26),
    fontWeight: "900",
    textAlign: "center",
    lineHeight: rf(32, 24, 32),
  },
  questionRailScore: {
    color: "#D6AFC7",
    fontSize: rf(38, 28, 38),
    fontWeight: "900",
    marginVertical: rf(10, 7, 10),
  },
  questionRailIcons: {
    marginTop: rf(6, 3, 6),
    gap: rf(14, 10, 14),
  },
  questionRailCircle: {
    width: rf(48, 38, 48),
    height: rf(48, 38, 48),
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  questionRailCircleText: {
    color: "#C10A7A",
    fontSize: rf(20, 15, 20),
    fontWeight: "800",
  },
});
