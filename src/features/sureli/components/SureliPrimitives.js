import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, layout } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";
import { sureliAssets } from "../data/catalog";

export function SureliLogo() {
  return (
    <View style={styles.logoBox}>
      <Text style={styles.logoText}>SUR{"\n"}ELI</Text>
    </View>
  );
}

export function PrimaryButton({ label, onPress, style, textStyle, dark = false }) {
  return (
    <Pressable onPress={onPress} style={[styles.primaryButton, dark ? styles.darkButton : null, style]}>
      <Text style={[styles.primaryButtonText, dark ? styles.darkButtonText : null, textStyle]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function GhostButton({ label, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.ghostButton, style]}>
      <Text style={styles.ghostButtonText}>{label}</Text>
    </Pressable>
  );
}

export function PageHeading({ title, accent, subtitle, centered = true }) {
  return (
    <View style={[styles.pageHeading, centered ? styles.pageHeadingCentered : null]}>
      <Text style={styles.pageHeadingTitle}>
        {title}
        {accent ? <Text style={styles.pageHeadingAccent}> {accent}</Text> : null}
      </Text>
      {subtitle ? <Text style={styles.pageHeadingSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function FooterColumn({ title, items }) {
  return (
    <View style={styles.footerColumn}>
      <Text style={styles.footerColumnTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.footerColumnText}>
          {item}
        </Text>
      ))}
    </View>
  );
}

export function SocialRow() {
  return (
    <View style={styles.socialRow}>
      <View style={[styles.socialPill, styles.instagram]}>
        <Text style={styles.socialText}>IG</Text>
      </View>
      <View style={styles.socialPill}>
        <Text style={styles.socialText}>X</Text>
      </View>
      <View style={[styles.socialPill, styles.youtube]}>
        <Text style={styles.socialText}>YT</Text>
      </View>
    </View>
  );
}

export function SearchInput({
  placeholder = "Search categories...",
  value,
  onChangeText,
}) {
  return (
    <View style={styles.searchWrap}>
      <Text style={styles.searchIcon}>Q</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        style={styles.searchInput}
      />
    </View>
  );
}

export function FilterPills({ items, active, onPress }) {
  return (
    <View style={styles.filterRow}>
      {items.map((item) => {
        const activeItem = active === item;
        return (
          <Pressable
            key={item}
            onPress={() => onPress?.(item)}
            style={[styles.filterPill, activeItem ? styles.filterPillActive : null]}
          >
            <Text style={[styles.filterPillText, activeItem ? styles.filterPillTextActive : null]}>
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function CategoryCard({ title, image, selected = false, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.categoryCard, selected ? styles.categoryCardSelected : null]}>
      <Image source={image} style={styles.categoryImage} resizeMode="cover" />
      {selected ? (
        <View style={styles.selectedBadge}>
          <Text style={styles.selectedBadgeText}>SELECTED</Text>
        </View>
      ) : null}
      <View style={styles.categoryFooter}>
        <Text style={styles.categoryTitle}>{title}</Text>
        {selected ? <Text style={styles.categoryTick}>o</Text> : null}
      </View>
    </Pressable>
  );
}

export function FooterBrandBlock() {
  return (
    <View style={styles.footerBrandWrap}>
      <SureliLogo />
      <Text style={styles.footerBrandText}>
        The ultimate social trivia game for friends and family. Challenge your knowledge!
      </Text>
    </View>
  );
}

export function InlineInput({ label, placeholder, value, onChangeText, secureTextEntry = false, style }) {
  return (
    <View style={[styles.inputGroup, style]}>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        secureTextEntry={secureTextEntry}
        style={styles.inputField}
      />
    </View>
  );
}

export function TabSwitch({ items, active, onPress }) {
  return (
    <View style={styles.tabSwitch}>
      {items.map((item) => {
        const isActive = active === item.value;
        return (
          <Pressable
            key={item.value}
            onPress={() => onPress(item.value)}
            style={[styles.tabSwitchItem, isActive ? styles.tabSwitchItemActive : null]}
          >
            <Text style={[styles.tabSwitchText, isActive ? styles.tabSwitchTextActive : null]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ProgressSteps({ items, activeIndex }) {
  return (
    <View style={styles.progressRow}>
      {items.map((item, index) => {
        const done = index < activeIndex;
        const active = index === activeIndex;

        return (
          <View key={item.label} style={styles.progressItem}>
            <View style={styles.progressStep}>
              <View
                style={[
                  styles.progressDot,
                  done || active ? styles.progressDotActive : null,
                ]}
              >
                <Text style={[styles.progressDotText, done || active ? styles.progressDotTextActive : null]}>
                  {done ? "o" : item.step}
                </Text>
              </View>
              <Text style={[styles.progressLabel, active ? styles.progressLabelActive : null]}>
                {item.label}
              </Text>
            </View>
            {index < items.length - 1 ? <View style={styles.progressLine} /> : null}
          </View>
        );
      })}
    </View>
  );
}

export function ProfileAvatar({ size = 124 }) {
  return (
    <View style={[styles.avatarWrap, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image source={sureliAssets.imgProfile} style={styles.avatarImage} resizeMode="cover" />
      <View style={styles.avatarBadge}>
        <Text style={styles.avatarBadgeText}>cam</Text>
      </View>
    </View>
  );
}

export function AuthDecorations() {
  return (
    <>
      <Text style={[styles.decorMark, styles.decorLeft]}>idea</Text>
      <Text style={[styles.decorMark, styles.decorRightTop]}>mind</Text>
      <Text style={[styles.decorMark, styles.decorRightBottom]}>cup</Text>
      <Text style={[styles.decorMark, styles.decorLeftBottom]}>?</Text>
    </>
  );
}

const styles = StyleSheet.create({
  logoBox: {
    width: rf(40, 32, 40),
    height: rf(40, 32, 40),
    borderRadius: rf(6, 4, 6),
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: rf(10, 8, 10),
    lineHeight: rf(10, 8, 10),
    fontWeight: "900",
    textAlign: "center",
  },
  primaryButton: {
    minWidth: rf(180, 132, 180),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: rf(24, 16, 24),
    paddingVertical: rf(14, 10, 14),
    borderRadius: rf(10, 8, 10),
    backgroundColor: colors.pink,
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: rf(16, 13, 16), fontWeight: "800" },
  darkButton: { backgroundColor: colors.navy },
  darkButtonText: { color: "#FFFFFF" },
  ghostButton: {
    minWidth: rf(150, 120, 150),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: rf(18, 14, 18),
    paddingVertical: rf(12, 10, 12),
    borderRadius: rf(10, 8, 10),
    backgroundColor: "#EFF3F9",
  },
  ghostButtonText: { color: colors.ink, fontWeight: "700" },
  pageHeading: { gap: rf(10, 6, 10) },
  pageHeadingCentered: { alignItems: "center" },
  pageHeadingTitle: { color: colors.ink, fontSize: rf(58, 28, 58), fontWeight: "300", textAlign: "center" },
  pageHeadingAccent: { color: colors.pink, fontWeight: "400" },
  pageHeadingSubtitle: {
    color: colors.textSoft,
    fontSize: rf(20, 13, 20),
    lineHeight: rf(30, 20, 30),
    textAlign: "center",
    maxWidth: rw(760, 1440),
  },
  footerBrandWrap: { maxWidth: rw(220, 1440), gap: rf(16, 10, 16) },
  footerBrandText: { color: colors.textSoft, lineHeight: rf(24, 18, 24), fontSize: rf(15, 12, 15) },
  footerColumn: { gap: rf(14, 10, 14), minWidth: rf(140, 110, 140) },
  footerColumnTitle: { color: colors.ink, fontSize: rf(16, 14, 16), fontWeight: "800" },
  footerColumnText: { color: colors.textSoft, fontSize: rf(14, 12, 14), fontWeight: "600" },
  socialRow: { flexDirection: "row", alignItems: "center", gap: rf(12, 8, 12) },
  socialPill: {
    width: rf(28, 24, 28),
    height: rf(28, 24, 28),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  instagram: { borderColor: "#F587C6" },
  youtube: { borderColor: "#FF4C4C" },
  socialText: { fontSize: rf(11, 9, 11), fontWeight: "800", color: colors.ink },
  searchWrap: {
    width: "100%",
    maxWidth: rw(700, 1440),
    height: rf(54, 42, 54),
    borderRadius: rf(14, 10, 14),
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: rf(16, 12, 16),
    flexDirection: "row",
    alignItems: "center",
    gap: rf(10, 6, 10),
  },
  searchIcon: { color: colors.textSoft, fontWeight: "700" },
  searchInput: {
    flex: 1,
    color: colors.ink,
    fontSize: rf(15, 12, 15),
    paddingVertical: 0,
  },
  filterRow: { flexDirection: "row", flexWrap: "wrap", gap: rf(12, 8, 12) },
  filterPill: {
    backgroundColor: "#EEF2F8",
    paddingHorizontal: rf(18, 12, 18),
    paddingVertical: rf(10, 8, 10),
    borderRadius: 999,
  },
  filterPillActive: { backgroundColor: colors.pink },
  filterPillText: { color: colors.ink, fontSize: rf(13, 11, 13), fontWeight: "700" },
  filterPillTextActive: { color: "#FFFFFF" },
  categoryCard: {
    flexBasis: rw(320, 1440),
    flexGrow: 1,
    maxWidth: rw(360, 1440),
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: rf(16, 12, 16),
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  categoryCardSelected: { borderColor: colors.pink, borderWidth: 3 },
  categoryImage: { width: "100%", height: rf(170, 120, 170), backgroundColor: "#111111" },
  categoryFooter: {
    paddingHorizontal: rf(16, 12, 16),
    paddingVertical: rf(14, 10, 14),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: { color: colors.ink, fontSize: rf(17, 13, 17), fontWeight: "800" },
  categoryTick: { color: colors.pink, fontWeight: "900" },
  selectedBadge: {
    position: "absolute",
    top: rf(10, 6, 10),
    right: rf(10, 6, 10),
    backgroundColor: colors.pink,
    paddingHorizontal: rf(10, 8, 10),
    paddingVertical: rf(4, 3, 4),
    borderRadius: 999,
  },
  selectedBadgeText: { color: "#FFFFFF", fontSize: rf(10, 8, 10), fontWeight: "900" },
  inputGroup: { gap: rf(8, 6, 8) },
  inputLabel: { color: colors.ink, fontSize: rf(15, 12, 15), fontWeight: "700" },
  inputField: {
    height: rf(56, 44, 56),
    borderRadius: rf(12, 10, 12),
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: rf(16, 12, 16),
    color: colors.ink,
    fontSize: rf(16, 13, 16),
  },
  tabSwitch: {
    flexDirection: "row",
    backgroundColor: "#DDE3EC",
    borderRadius: 999,
    padding: rf(4, 3, 4),
    alignSelf: "center",
  },
  tabSwitchItem: {
    minWidth: rf(160, 120, 160),
    paddingVertical: rf(12, 9, 12),
    paddingHorizontal: rf(20, 14, 20),
    borderRadius: 999,
    alignItems: "center",
  },
  tabSwitchItemActive: { backgroundColor: colors.navy },
  tabSwitchText: { color: colors.ink, fontWeight: "700", fontSize: rf(16, 13, 16) },
  tabSwitchTextActive: { color: "#FFFFFF" },
  progressRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
  },
  progressDot: {
    width: rf(24, 20, 24),
    height: rf(24, 20, 24),
    borderRadius: 12,
    backgroundColor: "#E8EEF6",
    alignItems: "center",
    justifyContent: "center",
  },
  progressDotActive: { backgroundColor: "#2DC75C" },
  progressDotText: { color: colors.textSoft, fontWeight: "700", fontSize: rf(11, 9, 11) },
  progressDotTextActive: { color: "#FFFFFF" },
  progressLabel: {
    marginLeft: rf(8, 6, 8),
    color: colors.textSoft,
    fontWeight: "700",
    fontSize: rf(13, 11, 13),
    flexShrink: 0,
  },
  progressLabelActive: { color: colors.ink },
  progressLine: {
    flex: 1,
    width: "100%",
    minWidth: 0,
    height: 2,
    backgroundColor: "#DDE4EE",
    marginHorizontal: rf(12, 8, 12),
  },
  avatarWrap: {
    overflow: "visible",
    borderWidth: rf(5, 3, 5),
    borderColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: rf(16, 10, 16),
    shadowOffset: { width: 0, height: 8 },
  },
  avatarImage: { width: "100%", height: "100%", borderRadius: 999 },
  avatarBadge: {
    position: "absolute",
    right: -2,
    bottom: rf(6, 4, 6),
    backgroundColor: colors.pink,
    borderRadius: 999,
    paddingHorizontal: rf(10, 8, 10),
    paddingVertical: rf(8, 6, 8),
  },
  avatarBadgeText: { color: "#FFFFFF", fontWeight: "800", fontSize: rf(10, 8, 10) },
  decorMark: {
    position: "absolute",
    color: "#EDEEF2",
    fontWeight: "800",
    opacity: 0.8,
  },
  decorLeft: { left: rw(22, 1440), top: rf(140, 100, 140), fontSize: rf(66, 42, 66), transform: [{ rotate: "-14deg" }] },
  decorRightTop: { right: rw(34, 1440), top: rf(360, 220, 360), fontSize: rf(48, 30, 48), transform: [{ rotate: "-10deg" }] },
  decorRightBottom: { right: rw(70, 1440), bottom: rf(120, 70, 120), fontSize: rf(76, 48, 76), transform: [{ rotate: "18deg" }] },
  decorLeftBottom: { left: rw(70, 1440), bottom: rf(170, 100, 170), fontSize: rf(76, 48, 76) },
});
