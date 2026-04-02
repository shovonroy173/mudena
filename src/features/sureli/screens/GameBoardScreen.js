import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SureliLayout from "../components/SureliLayout";
import { GameFlowFooter, GameFlowHeader } from "../components/GameFlowChrome";
import { useSureliGame } from "../hooks/useSureliGame";
import { colors } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";

export default function GameBoardScreen({ navigation }) {
  const { board, teams, selectQuestion, teamRole } = useSureliGame();
  const displayBoard = [...board.slice(0, 3), ...board.slice(0, 3), ...board.slice(3, 6)];

  return (
    <SureliLayout
      navigation={navigation}
      activeRoute=""
      showFooter={false}
      headerOverride={<GameFlowHeader navigation={navigation} />}
      contentStyle={styles.layoutContent}
    >
      <View style={styles.page}>
        <View style={styles.rolePill}>
          <Text style={styles.rolePillText}>Team role: {teamRole}</Text>
        </View>

        <View style={styles.boardGrid}>
          {displayBoard.map((category, categoryIndex) => (
            <View key={`${category.id}-${categoryIndex}`} style={styles.categoryColumn}>
              <View style={styles.categoryCard}>
                <Image source={category.image} style={styles.categoryImage} resizeMode="cover" />
                <View style={styles.categoryFooter}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>
              </View>

              <View style={styles.pointsGrid}>
                {category.questions.map((question) => (
                  <View key={question.id} style={styles.pointRow}>
                    {[0, 1].map((copyIndex) => (
                      <Pressable
                        key={`${question.id}-${copyIndex}`}
                        style={[
                          styles.pointChip,
                          question.claimedBy ? styles.pointChipClaimed : null,
                        ]}
                        onPress={() => {
                          if (question.claimedBy) {
                            return;
                          }

                          selectQuestion({ categoryId: category.id, questionId: question.id });
                          navigation.navigate("SureliQuestion");
                        }}
                      >
                        <Text style={styles.pointChipText}>{question.points}</Text>
                      </Pressable>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.scoreboardRow}>
          <TeamScoreCard
            team={teams[0]}
            accentColor={colors.pink}
            scoreColor={colors.pink}
            initialBackground="#E698C3"
            controls={[
              { label: "🔥", accent: "#FEEB6F" },
              { label: "t", accent: "#FFD7EF" },
              { label: "◷", accent: "#F7D7EA" },
            ]}
          />
          <TeamScoreCard
            team={teams[1]}
            accentColor="#5963CE"
            scoreColor="#5963CE"
            initialBackground="#AAB1E5"
            controls={[
              { label: "🔥", accent: "#FEEB6F" },
              { label: "t", accent: "#FFD7EF" },
              { label: "◷", accent: "#F7D7EA" },
            ]}
          />
        </View>

        <GameFlowFooter />
      </View>
    </SureliLayout>
  );
}

function TeamScoreCard({ team, accentColor, scoreColor, initialBackground, controls }) {
  const initial = team?.name?.charAt(0)?.toUpperCase() || "T";

  return (
    <View style={styles.teamCard}>
      <View style={styles.teamCardHeader}>
        <View style={styles.teamIdentity}>
          <View style={[styles.teamInitial, { backgroundColor: initialBackground }]}>
            <Text style={styles.teamInitialText}>{initial}</Text>
          </View>
          <Text style={styles.teamName}>{team?.name || "Team"}</Text>
        </View>

        <View style={styles.teamControls}>
          {controls.map((control) => (
            <View key={`${team?.id}-${control.label}`} style={styles.controlOuter}>
              <View style={[styles.controlInner, { borderColor: accentColor }]}>
                <Text style={[styles.controlText, { color: accentColor }]}>{control.label}</Text>
              </View>
              <View style={[styles.controlBadge, { backgroundColor: control.accent }]} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.scoreBody}>
        <Text style={[styles.scoreValue, { color: scoreColor }]}>
          {String(team?.score ?? 0).padStart(2, "0")}
        </Text>
        <Text style={styles.scoreLabel}>CURRENT POINTS</Text>
      </View>

      <View style={styles.scoreActions}>
        <Pressable style={[styles.scoreActionButton, styles.scoreActionButtonSoft]}>
          <Text style={[styles.scoreActionText, { color: accentColor }]}>−</Text>
        </Pressable>
        <Pressable style={[styles.scoreActionButton, { backgroundColor: accentColor }]}>
          <Text style={styles.scoreActionTextFilled}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutContent: { paddingTop: rf(6, 4, 6) },
  page: {
    width: "100%",
  },
  rolePill: {
    alignSelf: "center",
    marginTop: rf(10, 8, 10),
    backgroundColor: colors.pink,
    paddingHorizontal: rf(18, 14, 18),
    paddingVertical: rf(7, 6, 7),
    borderRadius: 999,
  },
  rolePillText: {
    color: "#FFFFFF",
    fontSize: rf(10, 9, 10),
    fontWeight: "800",
  },
  boardGrid: {
    marginTop: rf(24, 16, 24),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: rf(16, 9, 16),
    rowGap: rf(22, 12, 22),
  },
  categoryColumn: {
    width: "30.5%",
    alignItems: "center",
  },
  categoryCard: {
    width: "100%",
    borderRadius: rf(12, 8, 12),
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  categoryImage: {
    width: "100%",
    height: rf(126, 68, 126),
  },
  categoryFooter: {
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: rf(8, 6, 8),
  },
  categoryTitle: {
    color: "#FFFFFF",
    fontSize: rf(11, 9, 11),
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  pointsGrid: {
    width: "100%",
    marginTop: rf(10, 7, 10),
    gap: rf(7, 5, 7),
  },
  pointRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: rf(7, 5, 7),
  },
  pointChip: {
    flex: 1,
    minHeight: rf(32, 22, 32),
    borderRadius: rf(7, 5, 7),
    backgroundColor: "#FFE6F4",
    alignItems: "center",
    justifyContent: "center",
  },
  pointChipClaimed: {
    opacity: 0.35,
  },
  pointChipText: {
    color: colors.pink,
    fontSize: rf(15, 10, 15),
    fontWeight: "900",
  },
  scoreboardRow: {
    marginTop: rf(22, 16, 22),
    marginBottom: rf(16, 12, 16),
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: rf(12, 8, 12),
    justifyContent: "space-between",
  },
  teamCard: {
    flex: 1,
    borderRadius: rf(16, 10, 16),
    backgroundColor: "#FFF0F8",
    paddingHorizontal: rf(8, 6, 8),
    paddingTop: rf(8, 6, 8),
    paddingBottom: rf(10, 8, 10),
  },
  teamCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: rf(8, 6, 8),
  },
  teamIdentity: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(6, 5, 6),
    flex: 1,
  },
  teamInitial: {
    width: rf(18, 16, 18),
    height: rf(18, 16, 18),
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  teamInitialText: {
    color: "#FFFFFF",
    fontSize: rf(9, 8, 9),
    fontWeight: "800",
  },
  teamName: {
    color: "#36435C",
    fontSize: rf(12, 10, 12),
    fontWeight: "800",
  },
  teamControls: {
    flexDirection: "row",
    gap: rf(6, 5, 6),
  },
  controlOuter: {
    width: rf(22, 18, 22),
    height: rf(22, 18, 22),
    position: "relative",
  },
  controlInner: {
    width: "100%",
    height: "100%",
    borderRadius: rf(7, 6, 7),
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  controlText: {
    fontSize: rf(9, 8, 9),
    fontWeight: "800",
  },
  controlBadge: {
    position: "absolute",
    width: rf(7, 6, 7),
    height: rf(7, 6, 7),
    borderRadius: 999,
    top: -2,
    right: -2,
  },
  scoreBody: {
    marginTop: rf(8, 7, 8),
    backgroundColor: "#FFFFFF",
    borderRadius: rf(12, 8, 12),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: rf(16, 12, 16),
  },
  scoreValue: {
    fontSize: rf(44, 26, 44),
    lineHeight: rf(46, 28, 46),
    fontWeight: "900",
  },
  scoreLabel: {
    color: "#D1C9D0",
    fontSize: rf(7, 6, 7),
    fontWeight: "800",
    letterSpacing: 0.7,
    marginTop: rf(3, 2, 3),
  },
  scoreActions: {
    marginTop: rf(10, 8, 10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreActionButton: {
    width: rf(28, 22, 28),
    height: rf(28, 22, 28),
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreActionButtonSoft: {
    backgroundColor: "#FAD7EB",
  },
  scoreActionText: {
    fontSize: rf(18, 14, 18),
    fontWeight: "700",
    marginTop: -1,
  },
  scoreActionTextFilled: {
    color: "#FFFFFF",
    fontSize: rf(18, 14, 18),
    fontWeight: "700",
    marginTop: -1,
  },
});
