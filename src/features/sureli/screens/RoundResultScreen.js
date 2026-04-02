import { Pressable, StyleSheet, Text, View } from "react-native";
import SureliLayout from "../components/SureliLayout";
import { GameFlowFooter, GameFlowHeader, GameSidePanel } from "../components/GameFlowChrome";
import { PrimaryButton } from "../components/SureliPrimitives";
import { useSureliGame } from "../hooks/useSureliGame";
import { colors } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";

export default function RoundResultScreen({ navigation }) {
  const { teams, awardQuestion } = useSureliGame();

  return (
    <SureliLayout
      navigation={navigation}
      activeRoute=""
      showFooter={false}
      headerOverride={<GameFlowHeader navigation={navigation} />}
      contentStyle={styles.layoutContent}
    >
      <View style={styles.page}>
        <Pressable style={styles.returnButton} onPress={() => navigation.goBack()}>
          <Text style={styles.returnButtonText}>← Return to the answer</Text>
        </Pressable>

        <View style={styles.bodyRow}>
          <View style={styles.resultCard}>
            <Text style={styles.title}>Which team answered correctly?</Text>
            <Text style={styles.subtitle}>Select the winning team for this round</Text>

            <View style={styles.ctaRow}>
              {teams.map((team) => (
                <PrimaryButton
                  key={team.id}
                  label={team.name}
                  onPress={() => {
                    awardQuestion(team.id);
                    navigation.replace("SureliWinner");
                  }}
                  style={styles.teamButton}
                />
              ))}
            </View>

            <PrimaryButton
              label="No one"
              onPress={() => {
                // awardQuestion("no-one");
                navigation.navigate("SureliWinner");
              }}
              style={styles.noOneButton}
              textStyle={styles.noOneButtonText}
            />
            {/* <Text onPress={()=> navigation.navigate('SureliWinner')} >
              No One
            </Text> */}
          </View>

          <View style={styles.scoreboardColumn}>
            <Text style={styles.scoreboardTitle}>Scoreboard</Text>
            <GameSidePanel team={teams[0]} accent="pink" />
            <GameSidePanel team={teams[1]} accent="purple" />
            <View style={styles.logoBlock}>
              <Text style={styles.logoBlockText}>SURELI</Text>
            </View>
          </View>
        </View>

        <GameFlowFooter />
      </View>
    </SureliLayout>
  );
}

const styles = StyleSheet.create({
  layoutContent: { paddingTop: rf(6, 4, 6) },
  page: { width: "100%" },
  returnButton: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF3F8",
    borderRadius: rf(10, 8, 10),
    paddingHorizontal: rf(16, 12, 16),
    paddingVertical: rf(12, 9, 12),
    marginTop: rf(12, 8, 12),
  },
  returnButtonText: {
    color: "#627086",
    fontSize: rf(13, 11, 13),
    fontWeight: "700",
  },
  bodyRow: {
    marginTop: rf(18, 12, 18),
    flexDirection: "row",
    gap: rf(22, 12, 22),
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  resultCard: {
    flex: 1,
    minWidth: rw(540, 1440),
    borderWidth: 4,
    borderColor: colors.pink,
    borderRadius: rf(28, 18, 28),
    backgroundColor: "#FFFFFF",
    paddingHorizontal: rf(28, 16, 28),
    paddingVertical: rf(44, 24, 44),
    alignItems: "center",
  },
  title: {
    color: colors.ink,
    fontSize: rf(22, 17, 22),
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#9BA6B7",
    fontSize: rf(14, 12, 14),
    marginTop: rf(12, 8, 12),
    textAlign: "center",
  },
  ctaRow: {
    marginTop: rf(44, 24, 44),
    flexDirection: "row",
    gap: rf(14, 10, 14),
    flexWrap: "wrap",
    justifyContent: "center",
  },
  teamButton: {
    minWidth: rf(160, 120, 160),
    borderRadius: rf(10, 8, 10),
  },
  noOneButton: {
    marginTop: rf(26, 16, 26),
    minWidth: rf(300, 220, 300),
    backgroundColor: "#DCE3EC",
    borderRadius: rf(10, 8, 10),
  },
  noOneButtonText: {
    color: "#505E73",
    fontWeight: "800",
  },
  scoreboardColumn: {
    width: rw(320, 1440),
    gap: rf(14, 10, 14),
  },
  scoreboardTitle: {
    color: colors.ink,
    fontSize: rf(18, 15, 18),
    fontWeight: "800",
  },
  logoBlock: {
    alignSelf: "center",
    marginTop: rf(4, 2, 4),
    backgroundColor: colors.pink,
    paddingHorizontal: rf(14, 10, 14),
    paddingVertical: rf(10, 7, 10),
  },
  logoBlockText: {
    color: "#FFFFFF",
    fontSize: rf(28, 20, 28),
    fontWeight: "900",
  },
});
