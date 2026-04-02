import { Pressable, StyleSheet, Text, View } from "react-native";
import SureliLayout from "../components/SureliLayout";
import { GameFlowFooter, GameFlowHeader } from "../components/GameFlowChrome";
import { useSureliGame } from "../hooks/useSureliGame";
import { colors } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";

const confettiPalette = ["#FFDBE8", "#E6E1A8", "#D8EEF7", "#F2E9D9", "#E9D5DC", "#D8E0A9"];

export default function WinnerScreen({ navigation }) {
  const { leader, teams, resetGame } = useSureliGame();

  return (
    <SureliLayout
      navigation={navigation}
      activeRoute=""
      showFooter={false}
      headerOverride={<GameFlowHeader navigation={navigation} />}
      contentStyle={styles.layoutContent}
    >
      <View style={styles.page}>
        {Array.from({ length: 56 }).map((_, index) => {
          const x = (index * 13) % 100;
          const y = (index * 17) % 100;
          const isEdgeBand = y < 18 || y > 74;

          return (
            <View
              key={index}
              style={[
                styles.confettiDot,
                {
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity: isEdgeBand ? 0.85 : 0.28,
                  backgroundColor: confettiPalette[index % confettiPalette.length],
                },
              ]}
            />
          );
        })}

        <View style={styles.hero}>
          <Text style={styles.title}>Congratulations on the win</Text>
          <Text style={styles.winnerName}>{leader?.name || "Hasan"}</Text>

          <View style={styles.scoresRow}>
            {teams.map((team, index) => (
              <View key={team.id} style={styles.scoreCard}>
                <View style={styles.scoreCardTop}>
                  <Text style={styles.scoreCardName}>{team.name}</Text>
                </View>
                <View
                  style={[
                    styles.scoreCardBottom,
                    index === 0 ? styles.leadingScoreCard : styles.trailingScoreCard,
                  ]}
                >
                  <Text style={styles.scoreCardValue}>{team.score}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => {
              resetGame();
              navigation.navigate("SureliStartGameTeams");
            }}
            style={styles.playAgainButton}
          >
            <View style={styles.playAgainIcon}>
              <Text style={styles.playAgainIconText}>‹</Text>
            </View>
            <Text style={styles.playAgainText}>Play again</Text>
          </Pressable>
        </View>

        <GameFlowFooter />
      </View>
    </SureliLayout>
  );
}

const styles = StyleSheet.create({
  layoutContent: { paddingTop: rf(6, 4, 6) },
  page: {
    width: "100%",
    minHeight: rf(780, 640, 780),
    overflow: "hidden",
    justifyContent: "space-between",
  },
  confettiDot: {
    position: "absolute",
    width: rf(14, 8, 14),
    height: rf(22, 12, 22),
    borderRadius: 999,
  },
  hero: {
    minHeight: rf(560, 420, 560),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: rf(82, 40, 82),
    paddingBottom: rf(84, 40, 84),
    paddingHorizontal: rf(18, 12, 18),
  },
  title: {
    color: "#36435C",
    fontSize: rf(34, 22, 34),
    lineHeight: rf(42, 28, 42),
    fontWeight: "800",
    textAlign: "center",
  },
  winnerName: {
    color: colors.pink,
    fontSize: rf(96, 50, 96),
    lineHeight: rf(104, 56, 104),
    fontWeight: "900",
    marginTop: rf(26, 14, 26),
    textAlign: "center",
  },
  scoresRow: {
    marginTop: rf(34, 18, 34),
    flexDirection: "row",
    justifyContent: "center",
    gap: rf(22, 12, 22),
    flexWrap: "wrap",
  },
  scoreCard: {
    width: rw(154, 1440),
    minWidth: rf(124, 124, 154),
    borderRadius: rf(12, 8, 12),
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#D7DCE5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 5,
  },
  scoreCardTop: {
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: rf(8, 6, 8),
    minHeight: rf(28, 24, 28),
  },
  scoreCardName: {
    color: "#FFFFFF",
    fontSize: rf(12, 10, 12),
    fontWeight: "800",
  },
  scoreCardBottom: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: rf(18, 14, 18),
  },
  leadingScoreCard: {
    backgroundColor: colors.green,
  },
  trailingScoreCard: {
    backgroundColor: colors.red,
  },
  scoreCardValue: {
    color: "#FFFFFF",
    fontSize: rf(28, 22, 28),
    lineHeight: rf(34, 26, 34),
    fontWeight: "900",
  },
  playAgainButton: {
    marginTop: rf(28, 18, 28),
    minWidth: rf(138, 132, 138),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: rf(8, 6, 8),
    backgroundColor: colors.pink,
    paddingHorizontal: rf(20, 16, 20),
    paddingVertical: rf(11, 9, 11),
    borderRadius: 999,
  },
  playAgainIcon: {
    width: rf(20, 18, 20),
    height: rf(20, 18, 20),
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  playAgainIconText: {
    color: colors.pink,
    fontSize: rf(16, 13, 16),
    lineHeight: rf(16, 13, 16),
    fontWeight: "900",
    marginTop: -1,
  },
  playAgainText: {
    color: "#FFFFFF",
    fontSize: rf(16, 13, 16),
    fontWeight: "800",
  },
});
