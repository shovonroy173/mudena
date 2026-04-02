import { useState } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { colors, layout } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";
import { useSureliAuth } from "../hooks/useSureliAuth";
import {
  AuthDecorations,
  PrimaryButton,
  SureliLogo,
} from "./SureliPrimitives";
import { sureliAssets } from "../data/catalog";
import { MobileLandscapeHeaderActions, MobileLandscapeMenu } from "./MobileLandscapeMenu";

const guestNavItems = [
  { label: "Home", route: "SureliHome" },
  { label: "How It Works", route: "SureliHowItWorks" },
  { label: "Categories", route: "SureliCategories" },
  { label: "FAQ", route: "SureliFAQ" },
  { label: "About", route: "SureliAbout" },
];

const authNavItems = [
  { label: "My Games", route: "SureliMyGames" },
  { label: "How It Works", route: "SureliHowItWorks" },
  { label: "Categories", route: "SureliCategories" },
  { label: "FAQ", route: "SureliFAQ" },
  { label: "About", route: "SureliAbout" },
];

export default function SureliLayout({
  children,
  navigation,
  activeRoute,
  showFooter = true,
  footerVariant = "marketing",
  showAuthDecor = false,
  width = layout.contentWidth,
  backgroundColor = colors.page,
  splitBackground = false,
  contentStyle,
  topRightOverride,
  scrollContentStyle,
  hideCenterNav = false,
  headerOverride,
}) {
  const { isAuthenticated, logout } = useSureliAuth();
  const navItems = isAuthenticated ? authNavItems : guestNavItems;
  const { width: viewportWidth, height: viewportHeight } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);
  const showMobileLandscapeMenu = viewportWidth > viewportHeight && viewportWidth <= 950;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {splitBackground ? (
        <View style={styles.splitBackground}>
          <View style={styles.splitLeft} />
          <View style={styles.splitRight} />
        </View>
      ) : null}
      {showAuthDecor ? <AuthDecorations /> : null}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, scrollContentStyle]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, width ? { maxWidth: width } : null]}>
          {headerOverride ? (
            headerOverride
          ) : (
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
                  <>
                    {hideCenterNav ? (
                      <View style={styles.centerNavSpacer} />
                    ) : (
                      <View style={styles.centerNav}>
                        {navItems.map((item) => (
                          <Pressable key={item.route} onPress={() => navigation.navigate(item.route)}>
                            <Text
                              style={[
                                styles.navText,
                                activeRoute === item.route ? styles.navTextActive : null,
                              ]}
                            >
                              {item.label}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}

                    <View style={styles.headerRight}>
                      {topRightOverride ? (
                        topRightOverride
                      ) : isAuthenticated ? (
                        <>
                          <Pressable onPress={() => navigation.navigate("SureliProfile")}>
                            <Image source={sureliAssets.imgProfile} style={styles.headerAvatar} />
                          </Pressable>
                          <Pressable
                            onPress={() => {
                              logout();
                              navigation.navigate("SureliHome");
                            }}
                          >
                            <Text style={styles.navLogin}>Log out</Text>
                          </Pressable>
                          <PrimaryButton
                            label="Start my Game"
                            onPress={() => navigation.navigate("SureliStartGameCategories")}
                            style={styles.headerCta}
                            textStyle={styles.headerCtaText}
                          />
                        </>
                      ) : (
                        <>
                          <Pressable onPress={() => navigation.navigate("SureliLogin")}>
                            <Text style={styles.navLogin}>Log In</Text>
                          </Pressable>
                          <PrimaryButton
                            label="Start a Game"
                            onPress={() => navigation.navigate("SureliStartGameCategories")}
                            style={styles.headerCta}
                            textStyle={styles.headerCtaText}
                          />
                        </>
                      )}
                    </View>
                  </>
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
          )}

          <View style={[styles.content, contentStyle]}>{children}</View>
        </View>

        {showFooter ? <SimpleFooter navigation={navigation} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function SimpleFooter({ navigation }) {
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

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 28 },
  splitBackground: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  splitLeft: { flex: 1, backgroundColor: colors.splitRed },
  splitRight: { flex: 1, backgroundColor: colors.brown },
  container: {
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: rw(28, 1440),
    paddingTop: rf(14, 10, 16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: rf(16, 10, 16),
    flexWrap: "wrap",
  },
  centerNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(28, 12, 28),
    flex: 1,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  centerNavSpacer: { flex: 1 },
  navText: { color: colors.ink, fontSize: rf(13, 11, 13), fontWeight: "700" },
  navTextActive: { color: colors.pink },
  navLogin: { color: colors.ink, fontSize: rf(13, 11, 13), fontWeight: "700" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: rf(14, 10, 14), flexWrap: "wrap" },
  headerCta: { minWidth: rf(110, 98, 110), paddingHorizontal: rf(18, 14, 18), paddingVertical: rf(11, 9, 11), borderRadius: 999 },
  headerCtaText: { fontSize: rf(13, 11, 13) },
  headerAvatar: { width: rf(34, 30, 34), height: rf(34, 30, 34), borderRadius: 999 },
  content: { paddingTop: rf(18, 12, 18) },
  footer: {
    marginTop: 48,
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
    justifyContent: "center",
    gap: rf(34, 18, 34),
    flexWrap: "wrap",
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
});
