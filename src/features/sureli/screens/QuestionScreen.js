import { Image, StyleSheet, Text, View } from "react-native";
import SureliLayout from "../components/SureliLayout";
import { GameFlowFooter, GameFlowHeader, QuestionSideRail } from "../components/GameFlowChrome";
import { PrimaryButton } from "../components/SureliPrimitives";
import { useSureliGame } from "../hooks/useSureliGame";
import { colors } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";

const questionReference = require("../../../../assets/images/question-reference.png");

export default function QuestionScreen({ navigation }) {
  const { selectedQuestion, teams } = useSureliGame();

  if (!selectedQuestion) {
    navigation.replace("SureliGameBoard");
    return null;
  }

  return (
    <SureliLayout
      navigation={navigation}
      activeRoute=""
      showFooter={false}
      headerOverride={<GameFlowHeader navigation={navigation} />}
      contentStyle={styles.layoutContent}
    >
      <View style={styles.page}>
        <View style={styles.timerBar}>
          <Text style={styles.timerIcon}>▮▮</Text>
          <Text style={styles.timerText}>00:06</Text>
          <Text style={styles.timerIcon}>↻</Text>
        </View>

        <View style={styles.bodyRow}>
          <QuestionSideRail team={teams[0]} />

          <View style={styles.questionWrap}>
            <View style={styles.badgeRow}>
              <View style={styles.varBadge}>
                <Text style={styles.varBadgeText}>VAR</Text>
              </View>
              <View style={styles.pointsBadge}>
                <Text style={styles.pointsBadgeText}>points:400</Text>
              </View>
            </View>

            <View style={styles.questionCard}>
              <Text style={styles.questionText}>
                {selectedQuestion.prompt || "What is the car ( Car name and company)"}
              </Text>
              <Image source={selectedQuestion.image || questionReference} style={styles.questionImage} />

              <View style={styles.bottomActions}>
                <PrimaryButton
                  label="Answer"
                  onPress={() => navigation.navigate("SureliRoundResult")}
                  style={styles.answerButton}
                  textStyle={styles.answerButtonText}
                />
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{selectedQuestion.answer?.toUpperCase() || "SPORTS"}</Text>
                </View>
              </View>
            </View>
          </View>

          <QuestionSideRail team={teams[1]} />
        </View>

        <GameFlowFooter />
      </View>
    </SureliLayout>
  );
}

const styles = StyleSheet.create({
  layoutContent: { paddingTop: rf(6, 4, 6) },
  page: { width: "100%" },
  timerBar: {
    marginTop: rf(12, 8, 12),
    backgroundColor: "#242433",
    borderRadius: rf(20, 14, 20),
    height: rf(64, 48, 64),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rf(34, 20, 34),
  },
  timerIcon: {
    color: "#FFFFFF",
    fontSize: rf(20, 14, 20),
    fontWeight: "800",
  },
  timerText: {
    color: "#FFFFFF",
    fontSize: rf(30, 20, 30),
    fontWeight: "900",
    letterSpacing: 3,
  },
  bodyRow: {
    marginTop: rf(24, 14, 24),
    flexDirection: "row",
    gap: rf(22, 12, 22),
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  questionWrap: {
    flex: 1,
    minWidth: rw(480, 1440),
    // maxWidth: rw(560, 1440),
  },
  badgeRow: {
    zIndex: 3,
    marginBottom: -rf(10, 6, 10),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: rf(18, 10, 18),
  },
  varBadge: {
    backgroundColor: "#A5B2C6",
    paddingHorizontal: rf(8, 6, 8),
    paddingVertical: rf(3, 2, 3),
    borderRadius: rf(4, 3, 4),
  },
  varBadgeText: {
    color: "#FFFFFF",
    fontSize: rf(10, 8, 10),
    fontWeight: "800",
  },
  pointsBadge: {
    backgroundColor: "#111111",
    paddingHorizontal: rf(10, 7, 10),
    paddingVertical: rf(6, 4, 6),
    borderRadius: rf(10, 8, 10),
  },
  pointsBadgeText: {
    color: "#FFFFFF",
    fontSize: rf(10, 8, 10),
    fontWeight: "800",
  },
  questionCard: {
    borderWidth: 3,
    borderColor: colors.pink,
    borderRadius: rf(34, 20, 34),
    paddingHorizontal: rf(28, 18, 28),
    paddingTop: rf(22, 16, 22),
    paddingBottom: rf(24, 18, 24),
    backgroundColor: "#FFFFFF",
  },
  questionText: {
    color: colors.ink,
    fontSize: rf(22, 17, 22),
    fontWeight: "800",
    textAlign: "center",
    lineHeight: rf(31, 24, 31),
  },
  questionImage: {
    width: "100%",
    height: rf(238, 182, 238),
    borderRadius: rf(12, 10, 12),
    marginTop: rf(18, 14, 18),
  },
  bottomActions: {
    marginTop: rf(22, 14, 22),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: rf(12, 8, 12),
    flexWrap: "wrap",
  },
  answerButton: {
    minWidth: rf(118, 98, 118),
    backgroundColor: "#1E6D2A",
    borderRadius: rf(10, 8, 10),
  },
  answerButtonText: {
    fontSize: rf(14, 12, 14),
    fontWeight: "800",
  },
  tag: {
    minWidth: rf(124, 100, 124),
    backgroundColor: colors.pink,
    borderRadius: rf(10, 8, 10),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: rf(12, 9, 12),
    paddingHorizontal: rf(16, 12, 16),
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: rf(14, 12, 14),
    fontWeight: "800",
  },
});
