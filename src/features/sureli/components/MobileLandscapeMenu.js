import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { rf } from "../../../shared/theme/responsive";

const guestMenuItems = [
  { label: "Home", route: "SureliHome", icon: "⌂" },
  { label: "How It Works", route: "SureliHowItWorks", icon: "✦" },
  { label: "Categories", route: "SureliCategories", icon: "△" },
  { label: "FAQ", route: "SureliFAQ", icon: "?" },
  { label: "About", route: "SureliAbout", icon: "i" },
];

const authMenuItems = [
  { label: "Home", route: "SureliHome", icon: "⌂" },
  { label: "How It Works", route: "SureliHowItWorks", icon: "✦" },
  { label: "My Game", route: "SureliMyGames", icon: "✎" },
  { label: "Categories", route: "SureliCategories", icon: "△" },
  { label: "FAQ", route: "SureliFAQ", icon: "?" },
  { label: "About", route: "SureliAbout", icon: "i" },
];

export function MobileLandscapeMenuButton({ open = false, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.menuButton}>
      <Text style={styles.menuButtonText}>{open ? "✕" : "☰"}</Text>
    </Pressable>
  );
}

export function MobileLandscapeHeaderActions({ navigation, menuOpen = false, onMenuPress }) {
  return (
    <View style={styles.headerActions}>
      <Pressable onPress={() => navigation.navigate("SureliLogin")}>
        <Text style={styles.headerLogin}>Log In</Text>
      </Pressable>
      <MobileLandscapeMenuButton open={menuOpen} onPress={onMenuPress} />
    </View>
  );
}

export function MobileLandscapeMenu({
  navigation,
  isAuthenticated,
  activeRoute,
  onClose,
}) {
  const menuItems = isAuthenticated ? authMenuItems : guestMenuItems;

  return (
    <View style={styles.panel}>
      <View style={styles.menuList}>
        {menuItems.map((item) => {
          const active = activeRoute === item.route || (!activeRoute && item.route === "SureliMyGames");

          return (
            <Pressable
              key={item.route}
              onPress={() => {
                onClose?.();
                navigation.navigate(item.route);
              }}
              style={[styles.menuItem, active ? styles.menuItemActive : null]}
            >
              <View style={styles.menuItemLeft}>
                <Text style={[styles.menuItemIcon, active ? styles.menuItemIconActive : null]}>
                  {item.icon}
                </Text>
                <Text style={[styles.menuItemLabel, active ? styles.menuItemLabelActive : null]}>
                  {item.label}
                </Text>
              </View>
              <Text style={[styles.menuItemArrow, active ? styles.menuItemArrowActive : null]}>›</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => {
          onClose?.();
          navigation.navigate(isAuthenticated ? "SureliProfile" : "SureliLogin");
        }}
        style={styles.profileButton}
      >
        <Text style={styles.profileIcon}>◔</Text>
        <Text style={styles.profileText}>{isAuthenticated ? "PROFILE" : "LOG IN"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    width: rf(32, 28, 32),
    height: rf(32, 28, 32),
    alignItems: "center",
    justifyContent: "center",
  },
  menuButtonText: {
    color: "#4A5872",
    fontSize: rf(20, 18, 20),
    fontWeight: "800",
  },
  panel: {
    marginTop: rf(14, 12, 14),
    borderTopWidth: 1,
    borderTopColor: "#EEF2F6",
    paddingTop: rf(22, 18, 22),
    paddingBottom: rf(18, 14, 18),
    minHeight: rf(520, 420, 520),
    justifyContent: "space-between",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(12, 10, 12),
  },
  headerLogin: {
    color: "#3A4761",
    fontSize: rf(13, 11, 13),
    fontWeight: "700",
  },
  menuList: {
    gap: rf(16, 12, 16),
  },
  menuItem: {
    minHeight: rf(58, 48, 58),
    borderRadius: rf(18, 14, 18),
    backgroundColor: "#F6F7FA",
    paddingHorizontal: rf(18, 14, 18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItemActive: {
    backgroundColor: colors.pink,
    shadowColor: colors.pink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 6,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(14, 10, 14),
  },
  menuItemIcon: {
    color: "#43506A",
    fontSize: rf(18, 15, 18),
    fontWeight: "700",
    width: rf(20, 18, 20),
    textAlign: "center",
  },
  menuItemIconActive: {
    color: "#FFFFFF",
  },
  menuItemLabel: {
    color: "#3A4761",
    fontSize: rf(15, 13, 15),
    fontWeight: "700",
  },
  menuItemLabelActive: {
    color: "#FFFFFF",
  },
  menuItemArrow: {
    color: "#B7C0CF",
    fontSize: rf(22, 18, 22),
    fontWeight: "700",
  },
  menuItemArrowActive: {
    color: "#FFFFFF",
  },
  profileButton: {
    marginTop: rf(28, 20, 28),
    minHeight: rf(56, 46, 56),
    borderRadius: rf(18, 14, 18),
    backgroundColor: "#EFF3F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: rf(10, 8, 10),
  },
  profileIcon: {
    color: "#50607B",
    fontSize: rf(18, 15, 18),
    fontWeight: "700",
  },
  profileText: {
    color: "#50607B",
    fontSize: rf(14, 12, 14),
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});
