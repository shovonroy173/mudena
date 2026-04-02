import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SureliLayout from "../components/SureliLayout";
import {
  CategoryCard,
  FilterPills,
  GhostButton,
  InlineInput,
  PageHeading,
  PrimaryButton,
  SearchInput,
  SocialRow,
} from "../components/SureliPrimitives";
import {
  categoryCatalog,
  faqItems,
  howItWorksSteps,
  powerUps,
  privacySections,
} from "../data/catalog";
import { colors, layout } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";

export default function InfoScreen({ navigation, route }) {
  const { mode, activeRoute } = route.params;

  return (
    <SureliLayout
      navigation={navigation}
      activeRoute={activeRoute}
      width={mode === "howItWorks" ? null : layout.contentWidth}
    >
      {mode === "howItWorks" ? <HowItWorksContent navigation={navigation} /> : null}
      {mode === "categories" ? <CategoriesContent navigation={navigation} /> : null}
      {mode === "faq" ? <FAQContent /> : null}
      {mode === "about" ? <AboutContent /> : null}
      {mode === "privacy" ? <PrivacyContent /> : null}
    </SureliLayout>
  );
}

function HowItWorksContent({ navigation }) {
  const stepIcons = ["⌘", "≣", "◎", "◔"];
  const helperIcons = ["∷", "◔", "⚡", "◡"];

  return (
    <View style={styles.howItWorksStack}>
      <View style={styles.howItWorksHero}>
        <Text style={styles.howItWorksTitle}>
          How <Text style={styles.howItWorksTitleAccent}>Sureli</Text> Works
        </Text>
        <Text style={styles.howItWorksSubtitle}>
          Get started in minutes. No apps to download, no complicated setup just pure trivia fun.
        </Text>
      </View>

      <View style={styles.stepsWrap}>
        {howItWorksSteps.map((item, index) => (
          <View key={item.step} style={styles.stepRow}>
            <View style={styles.stepIconBox}>
              <Text style={styles.stepIconText}>{stepIcons[index] || "◌"}</Text>
            </View>
            <View style={styles.stepCopy}>
              <View style={styles.stepHeadingRow}>
                <View style={styles.stepCount}>
                  <Text style={styles.stepCountText}>{item.step}</Text>
                </View>
                <Text style={styles.stepTitle}>{item.title}</Text>
              </View>
              <Text style={styles.stepBody}>{item.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionCenter}>
        <Text style={styles.bigSectionTitle}>Power-Ups & Helpers</Text>
        <Text style={styles.sectionBlurb}>
          Each team gets special abilities to use strategically during the game.
        </Text>
      </View>

      <View style={styles.powerRow}>
        {powerUps.map((item, index) => (
          <View key={item.title} style={styles.powerCard}>
            <Text style={styles.powerIcon}>{helperIcons[index] || "◌"}</Text>
            <Text style={styles.powerTitle}>{item.title}</Text>
            <Text style={styles.powerBody}>{item.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonCenter}>
        <PrimaryButton
          label="Start Playing Now →"
          onPress={() => navigation.navigate("SureliStartGameCategories")}
          style={styles.centerButton}
          textStyle={styles.centerButtonText}
        />
      </View>
    </View>
  );
}

function CategoriesContent({ navigation }) {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View style={styles.stack}>
      <PageHeading
        title="Browse"
        accent="Categories"
        subtitle="Explore our collection of trivia categories. Each team picks 3 during the game!"
      />

      <View style={styles.centeredSearch}>
        <SearchInput />
      </View>
      <View style={styles.centeredFilter}>
        <FilterPills
          items={["All", "Entertainment", "Games", "Sports", "TV Shows"]}
          active={activeFilter}
          onPress={setActiveFilter}
        />
      </View>

      <View style={styles.categoryGrid}>
        {categoryCatalog.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            onPress={() => navigation.navigate("SureliStartGameSettings")}
          />
        ))}
      </View>
    </View>
  );
}

function FAQContent() {
  const [openId, setOpenId] = useState(0);

  return (
    <View style={styles.stack}>
      <PageHeading
        title="Frequently Asked"
        accent="Questions"
        subtitle="Everything you need to know about playing Sureli."
      />

      <View style={styles.faqWrap}>
        {faqItems.map((item, index) => {
          const open = index === openId;

          return (
            <Pressable
              key={item.question}
              onPress={() => setOpenId(open ? -1 : index)}
              style={[styles.faqItem, open ? styles.faqItemOpen : null]}
            >
              <View style={styles.faqRow}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={styles.faqChevron}>{open ? "^" : "v"}</Text>
              </View>
              {open ? <Text style={styles.faqAnswer}>{item.answer}</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function AboutContent() {
  return (
    <View style={styles.stack}>
      <PageHeading
        title="About"
        accent="Sureli"
        subtitle="We,re on a mission to make every hangout unforgettable."
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxTitle}>Our Story</Text>
        <Text style={styles.infoBoxBody}>
          Sureli is a platform dedicated to fostering creativity and collaboration. Our mission is to provide tools that empower individuals to bring their ideas to life. We believe that everyone has a unique voice and that technology should be a bridge, not a barrier, to expressing it.
        </Text>
      </View>

      <Text style={styles.formHeading}>Get in Touch</Text>
      <View style={styles.contactCard}>
        <Text style={styles.contactLead}>We'd love to hear from you!</Text>
        <InlineInput placeholder="Enter Your Name" />
        <InlineInput placeholder="Email" />
        <InlineInput placeholder="kuwait(+965)" />
        <InlineInput placeholder="Telephone Number" />
        <View style={styles.messageBox}>
          <Text style={styles.messagePlaceholder}>Your Message</Text>
        </View>
        <View style={styles.buttonCenter}>
          <PrimaryButton label="Send" style={styles.sendButton} />
        </View>
      </View>

      <View style={styles.socialButtonsRow}>
        <GhostButton label="@ Follow on Twitter" />
        <GhostButton label="[] Join Discord" />
      </View>
    </View>
  );
}

function PrivacyContent() {
  return (
    <View style={[styles.stack, styles.privacyStack]}>
      <Text style={styles.privacyHeroTitle}>Privacy Policy</Text>
      <Text style={styles.privacyIntro}>
        At Sureli, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our trivia platform. We are committed to transparency and ensuring that your gaming experience is both fun and secure.
      </Text>

      {privacySections.map((section) => (
        <View key={section.title} style={styles.privacyBlock}>
          <View style={styles.privacyHeadingRow}>
            <View style={styles.privacyIconBox}>
              <Text style={styles.privacyIconText}>o</Text>
            </View>
            <Text style={styles.privacyBlockTitle}>{section.title}</Text>
          </View>
          <Text style={styles.privacyBody}>{section.body}</Text>
          {section.points.map((point) => (
            <Text key={point} style={styles.privacyPoint}>
              {point}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: rf(22, 14, 22), paddingTop: rf(18, 12, 18), paddingBottom: rf(20, 14, 20) },
  howItWorksStack: {
    width: "100%",
    gap: rf(28, 18, 28),
    paddingTop: rf(20, 14, 20),
    paddingBottom: rf(30, 18, 30),
  },
  howItWorksHero: {
    width: "100%",
    maxWidth: 920,
    alignSelf: "center",
    alignItems: "center",
    gap: rf(8, 6, 8),
    paddingHorizontal: rf(16, 10, 16),
  },
  howItWorksTitle: {
    color: colors.ink,
    fontSize: rf(44, 32, 48),
    lineHeight: rf(52, 38, 56),
    fontWeight: "700",
    textAlign: "center",
  },
  howItWorksTitleAccent: {
    color: colors.pink,
    fontWeight: "800",
  },
  howItWorksSubtitle: {
    color: "#B0B4BF",
    fontSize: rf(18, 14, 20),
    lineHeight: rf(26, 20, 28),
    textAlign: "center",
    maxWidth: 860,
  },
  stepsWrap: {
    width: "100%",
    gap: rf(28, 18, 30),
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(18, 12, 20),
  },
  stepIconBox: {
    width: rf(64, 52, 70),
    height: rf(64, 52, 70),
    borderRadius: rf(16, 12, 18),
    backgroundColor: "#F0F3F8",
    alignItems: "center",
    justifyContent: "center",
  },
  stepIconText: { color: "#5D6779", fontSize: rf(28, 22, 30), fontWeight: "700" },
  stepHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(10, 6, 12),
  },
  stepCount: {
    width: rf(28, 22, 30),
    height: rf(28, 22, 30),
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D7DCE5",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCountText: { color: "#7F8796", fontSize: rf(13, 11, 14), fontWeight: "700" },
  stepCopy: { flex: 1, gap: rf(8, 5, 10) },
  stepTitle: { color: colors.ink, fontSize: rf(26, 18, 28), fontWeight: "700" },
  stepBody: { color: "#9AA0AD", fontSize: rf(16, 12, 18), lineHeight: rf(24, 18, 26) },
  sectionCenter: { alignItems: "center", gap: rf(10, 6, 12), marginTop: rf(42, 28, 46) },
  bigSectionTitle: { color: colors.ink, fontSize: rf(34, 24, 38), fontWeight: "700", textAlign: "center" },
  sectionBlurb: {
    color: "#B0B4BF",
    textAlign: "center",
    fontSize: rf(16, 12, 18),
    lineHeight: rf(24, 18, 26),
    maxWidth: 760,
  },
  powerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    gap: rf(18, 12, 18),
  },
  powerCard: {
    flexBasis: rw(220, 1440),
    minWidth: rf(130, 120, 150),
    maxWidth: 260,
    flexGrow: 1,
    alignItems: "center",
    gap: rf(7, 5, 7),
    paddingHorizontal: rf(8, 6, 10),
  },
  powerIcon: { color: "#404A5E", fontSize: rf(24, 20, 24), fontWeight: "700" },
  powerTitle: { color: colors.ink, fontSize: rf(18, 14, 20), fontWeight: "700", textAlign: "center" },
  powerBody: {
    color: "#9AA0AD",
    textAlign: "center",
    lineHeight: rf(20, 15, 22),
    fontSize: rf(13, 11, 14),
  },
  buttonCenter: {
    alignItems: "center",
    marginTop: rf(18, 12, 18),
  },
  centerButton: {
    minWidth: rf(146, 134, 146),
    borderRadius: 999,
    paddingHorizontal: rf(16, 14, 16),
    paddingVertical: rf(10, 8, 10),
  },
  centerButtonText: {
    fontSize: rf(15, 12, 16),
    fontWeight: "700",
  },
  centeredSearch: { alignItems: "center" },
  centeredFilter: { alignItems: "center" },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: rf(20, 12, 20), justifyContent: "center" },
  faqWrap: { width: "100%", maxWidth: 920, alignSelf: "center", gap: rf(12, 8, 12), marginTop: rf(10, 6, 10) },
  faqItem: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: rf(14, 10, 14),
    paddingHorizontal: rf(18, 12, 18),
    paddingVertical: rf(16, 12, 16),
    backgroundColor: "#FFFFFF",
  },
  faqItemOpen: { borderColor: colors.lineStrong, borderWidth: 2 },
  faqRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 16 },
  faqQuestion: { color: colors.ink, fontSize: rf(16, 13, 16), fontWeight: "800", flex: 1 },
  faqChevron: { color: colors.textSoft, fontWeight: "800" },
  faqAnswer: { color: colors.textSoft, lineHeight: rf(22, 18, 22), marginTop: rf(14, 10, 14), fontSize: rf(14, 12, 14) },
  infoBox: {
    width: "100%",
    maxWidth: 940,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: rf(16, 12, 16),
    padding: rf(26, 16, 26),
    gap: rf(12, 8, 12),
    backgroundColor: "#FFFFFF",
  },
  infoBoxTitle: { color: colors.ink, fontSize: rf(30, 20, 30), fontWeight: "800" },
  infoBoxBody: { color: colors.textSoft, lineHeight: rf(27, 20, 27), fontSize: rf(16, 12, 16) },
  formHeading: { color: colors.ink, fontSize: rf(42, 24, 42), fontWeight: "800", maxWidth: 940, alignSelf: "center", width: "100%" },
  contactCard: {
    width: "100%",
    maxWidth: 940,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: rf(16, 12, 16),
    padding: rf(24, 16, 24),
    gap: rf(14, 10, 14),
    backgroundColor: "#FFFFFF",
  },
  contactLead: { color: colors.ink, fontSize: rf(22, 16, 22), fontWeight: "800" },
  messageBox: {
    height: rf(170, 120, 170),
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: rf(12, 10, 12),
    padding: rf(16, 12, 16),
    backgroundColor: "#FFFFFF",
  },
  messagePlaceholder: { color: colors.textSoft, fontSize: rf(14, 12, 14) },
  socialButtonsRow: {
    width: "100%",
    maxWidth: 940,
    alignSelf: "center",
    flexDirection: "row",
    gap: rf(16, 10, 16),
    flexWrap: "wrap",
  },
  sendButton: { minWidth: rf(300, 200, 300), borderRadius: rf(8, 6, 8) },
  privacyStack: { maxWidth: 980, alignSelf: "center", width: "100%" },
  privacyHeroTitle: { color: colors.ink, fontSize: rf(44, 26, 44), fontWeight: "800", textAlign: "center" },
  privacyIntro: { color: colors.textSoft, lineHeight: rf(28, 20, 28), fontSize: rf(16, 12, 16) },
  privacyBlock: { gap: rf(14, 10, 14), marginTop: rf(18, 12, 18) },
  privacyHeadingRow: { flexDirection: "row", alignItems: "center", gap: rf(12, 8, 12) },
  privacyIconBox: {
    width: rf(28, 22, 28),
    height: rf(28, 22, 28),
    borderRadius: rf(8, 6, 8),
    backgroundColor: colors.pinkSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  privacyIconText: { color: colors.pink, fontWeight: "800" },
  privacyBlockTitle: { color: colors.ink, fontSize: rf(22, 16, 22), fontWeight: "800" },
  privacyBody: { color: colors.textSoft, lineHeight: rf(27, 20, 27), fontSize: rf(16, 12, 16) },
  privacyPoint: { color: colors.textSoft, lineHeight: rf(26, 20, 26), fontSize: rf(16, 12, 16), paddingLeft: rf(16, 10, 16) },
});
