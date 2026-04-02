import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";
import SureliLayout from "../components/SureliLayout";
import { PrimaryButton } from "../components/SureliPrimitives";
import { myGamesGrid, sureliAssets, tileLabels } from "../data/catalog";
import { colors } from "../../../shared/theme/colors";

const gameTileImages = [
  sureliAssets.imgMusic,
  sureliAssets.imgGame,
  sureliAssets.imgGeo,
  sureliAssets.imgSports,
  sureliAssets.imgScience,
  sureliAssets.imgLogoAlt,
];

export default function MyGamesScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [categorySearch, setCategorySearch] = useState("h by category");
  const [nameSearch, setNameSearch] = useState("search by nam");
  const visibleGames = myGamesGrid.slice(0, 6);
  const compact = width < 860;
  const narrow = width < 700;

  return (
    <SureliLayout
      navigation={navigation}
      activeRoute=""
      showFooter={false}
      contentStyle={styles.content}
      headerOverride={
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable onPress={() => navigation.navigate("SureliHome")}>
              <View style={styles.logoBox}>
                <Text style={styles.logoText}>SUR{"\n"}ELI</Text>
              </View>
            </Pressable>
            <PrimaryButton
              label="Buy a new game +"
              style={styles.headerBuyButton}
              textStyle={styles.headerBuyText}
            />
          </View>

          <PrimaryButton
            label="START A GAME"
            onPress={() => navigation.navigate("SureliStartGameCategories")}
            style={styles.headerStartButton}
            textStyle={styles.headerStartText}
          />
        </View>
      }
    >
      <View style={styles.page}>
        <View style={styles.heroTag}>
          <Text style={styles.heroTagText}>THE ULTIMATE SOCIAL TRIVIA GAME</Text>
        </View>

        <Text style={[styles.heroTitle, compact ? styles.heroTitleCompact : null]}>
          An interactive group that tests{" "}
          <Text style={styles.heroAccent}>your{"\n"}knowledge and culture</Text>
        </Text>

        <Text style={[styles.heroSubtitle, compact ? styles.heroSubtitleCompact : null]}>
          New game To create a new game,press{"\n"}my games To retrieve previous games, press
        </Text>

        <View style={[styles.toggleRow, narrow ? styles.toggleRowNarrow : null]}>
          <Pressable style={styles.newGameButton} onPress={() => navigation.navigate("SureliStartGameCategories")}>
            <Text style={styles.newGameText}>New Game</Text>
            <Text style={styles.toggleArrowDark}>→</Text>
          </Pressable>

          <View style={styles.myGameButton}>
            <Text style={styles.myGameText}>My Game</Text>
            <Text style={styles.toggleArrowLight}>→</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, compact ? styles.sectionTitleCompact : null]}>My games</Text>

        <View style={[styles.toolbar, compact ? styles.toolbarCompact : null]}>
          <SearchBox value={categorySearch} onChangeText={setCategorySearch} />
          <PrimaryButton label="Buy a new game" style={styles.buyButton} textStyle={styles.buyButtonText} />
          <SearchBox value={nameSearch} onChangeText={setNameSearch} />
        </View>

        <View style={[styles.grid, compact ? styles.gridCompact : null]}>
          {visibleGames.map((name, index) => (
            <View key={name} style={[styles.card, compact ? styles.cardCompact : null, narrow ? styles.cardFull : null]}>
              <View style={styles.playersBadge}>
                <Text style={styles.playersBadgeText}>4 Number of plays</Text>
              </View>

              <View style={styles.cardTop}>
                <Text style={[styles.cardTitle, compact ? styles.cardTitleCompact : null]}>{name}</Text>
                <Pressable style={styles.playButton} onPress={() => navigation.navigate("SureliGameBoard")}>
                  <Text style={[styles.playButtonText, compact ? styles.playButtonTextCompact : null]}>Play</Text>
                </Pressable>
              </View>

              <View style={styles.tileGrid}>
                {tileLabels.map((label, tileIndex) => (
                  <View key={`${name}-${label}-${tileIndex}`} style={styles.tileCell}>
                    <Image source={gameTileImages[(index + tileIndex) % gameTileImages.length]} style={styles.tileImage} />
                    <View style={styles.tileBar}>
                      <Text style={styles.tileBarText}>{label}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.pagination, compact ? styles.paginationCompact : null]}>
          <Text style={styles.paginationGhost}>Next</Text>
          <View style={styles.paginationActive}>
            <Text style={styles.paginationActiveText}>1</Text>
          </View>
          {[2, 3, 4].map((page) => (
            <View key={page} style={styles.paginationCircle}>
              <Text style={styles.paginationCircleText}>{page}</Text>
            </View>
          ))}
          <Text style={styles.paginationGhost}>Prev</Text>
        </View>
      </View>

      <View style={styles.footerBlock}>
        <Text style={styles.footerBrand}>Sureli</Text>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Privacy Policy</Text>
          <Text style={styles.footerLink}>Terms of Service</Text>
          <Text style={styles.footerLink}>Support</Text>
        </View>
        <Text style={styles.footerCopy}>© 2024 Sureli Trivia. Elevate your knowledge.</Text>
      </View>
    </SureliLayout>
  );
}

function SearchBox({ value, onChangeText }) {
  return (
    <View style={styles.searchOuter}>
      <View style={styles.searchBadge}>
        <Text style={styles.searchBadgeText}>Q</Text>
      </View>
      <View style={styles.searchInner}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.searchInput}
          placeholder={value}
          placeholderTextColor="#9CA8BC"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 8 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logoBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 7,
    lineHeight: 7,
    fontWeight: "900",
    textAlign: "center",
  },
  headerBuyButton: {
    minWidth: 98,
    height: 24,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 999,
  },
  headerBuyText: {
    fontSize: 8,
    fontWeight: "800",
  },
  headerStartButton: {
    minWidth: 92,
    height: 24,
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 999,
  },
  headerStartText: {
    fontSize: 8,
    fontWeight: "800",
  },
  page: {
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 22,
  },
  heroTag: {
    backgroundColor: "#F4F6FA",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  heroTagText: {
    color: "#8E9AB0",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.45,
  },
  heroTitle: {
    marginTop: 18,
    color: colors.ink,
    fontSize: 30,
    lineHeight: 42,
    fontWeight: "400",
    textAlign: "center",
  },
  heroTitleCompact: {
    fontSize: 34,
    lineHeight: 46,
  },
  heroAccent: {
    color: colors.pink,
    fontWeight: "400",
  },
  heroSubtitle: {
    marginTop: 12,
    color: "#A2ADBF",
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
  },
  heroSubtitleCompact: {
    fontSize: 11,
    lineHeight: 17,
  },
  toggleRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toggleRowNarrow: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
  newGameButton: {
    width: 126,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  newGameText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  toggleArrowDark: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  myGameButton: {
    width: 126,
    height: 30,
    borderRadius: 999,
    backgroundColor: colors.pink,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  myGameText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  toggleArrowLight: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  sectionTitle: {
    marginTop: 22,
    color: colors.ink,
    fontSize: 22,
    fontWeight: "500",
  },
  sectionTitleCompact: {
    fontSize: 26,
  },
  toolbar: {
    width: "100%",
    maxWidth: 900,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  toolbarCompact: {
    flexWrap: "wrap",
  },
  searchOuter: {
    width: 224,
    position: "relative",
  },
  searchBadge: {
    position: "absolute",
    left: -10,
    top: 6,
    zIndex: 3,
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  searchInner: {
    height: 36,
    borderWidth: 1,
    borderColor: "#DDE4EE",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    justifyContent: "center",
  },
  searchInput: {
    color: "#9CA8BC",
    fontSize: 11,
    paddingVertical: 0,
  },
  buyButton: {
    minWidth: 158,
    height: 36,
    paddingVertical: 0,
    borderRadius: 10,
  },
  buyButtonText: {
    fontSize: 12,
    fontWeight: "800",
  },
  grid: {
    width: "100%",
    maxWidth: 900,
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },
  gridCompact: {
    maxWidth: 760,
    justifyContent: "center",
    columnGap: 16,
  },
  card: {
    width: "48.9%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7ECF3",
  },
  cardCompact: {
    width: 360,
    maxWidth: "100%",
  },
  cardFull: {
    width: "100%",
  },
  playersBadge: {
    position: "absolute",
    top: 6,
    right: 8,
    zIndex: 3,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#16D26A",
  },
  playersBadgeText: {
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "800",
  },
  cardTop: {
    backgroundColor: colors.pink,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 12,
    gap: 9,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },
  cardTitleCompact: {
    fontSize: 21,
  },
  playButton: {
    minWidth: 66,
    height: 32,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonText: {
    color: "#45536B",
    fontSize: 10,
    fontWeight: "700",
  },
  playButtonTextCompact: {
    fontSize: 11,
  },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tileCell: {
    width: "33.3333%",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F0F3F8",
  },
  tileImage: {
    width: "100%",
    height: 60,
  },
  tileBar: {
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  tileBarText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "800",
  },
  pagination: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  paginationCompact: {
    marginTop: 20,
  },
  paginationGhost: {
    color: "#D7DCE4",
    fontSize: 8,
    fontWeight: "700",
  },
  paginationActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationActiveText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  paginationCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#AEB7C5",
    alignItems: "center",
    justifyContent: "center",
  },
  paginationCircleText: {
    color: "#54617A",
    fontSize: 9,
    fontWeight: "700",
  },
  footerBlock: {
    marginTop: 18,
    marginHorizontal: -28,
    paddingTop: 48,
    paddingBottom: 50,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    gap: 18,
  },
  footerBrand: {
    color: colors.pink,
    fontSize: 28,
    fontWeight: "800",
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 34,
    flexWrap: "wrap",
  },
  footerLink: {
    color: "#939CAB",
    fontSize: 13,
    fontWeight: "500",
  },
  footerCopy: {
    color: "#939393",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  },
});
