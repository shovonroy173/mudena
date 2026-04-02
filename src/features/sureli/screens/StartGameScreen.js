import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";
import SureliLayout from "../components/SureliLayout";
import {
  CategoryCard,
  FilterPills,
  GhostButton,
  PrimaryButton,
  SearchInput,
} from "../components/SureliPrimitives";
import { GameFlowFooter, GameFlowHeader } from "../components/GameFlowChrome";
import { categoryCatalog } from "../data/catalog";
import { useSureliGame } from "../hooks/useSureliGame";
import { colors } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";

const progressItems = [
  { step: "1", label: "Categories" },
  { step: "2", label: "Team" },
  { step: "3", label: "Play Game" },
];

export default function StartGameScreen({ navigation, route }) {
  const { width: viewportWidth } = useWindowDimensions();
  const { step = "teams" } = route.params || {};
  const {
    gameName,
    selectedCategoryIds,
    teams,
    timePerQuestion,
    configureTeams,
    setSelectedCategories,
    setTimePerQuestion,
    startMatch,
  } = useSureliGame();
  const [localGameName, setLocalGameName] = useState(gameName);
  const [teamA, setTeamA] = useState(teams[0]?.name || "Hasan");
  const [teamB, setTeamB] = useState(teams[1]?.name || "Fahad");
  const [membersA, setMembersA] = useState(teams[0]?.members || 2);
  const [membersB, setMembersB] = useState(teams[1]?.members || 2);
  const [activeFilter, setActiveFilter] = useState("All");

  const saveTeams = () => {
    configureTeams({
      gameName: localGameName,
      teams: [
        { name: teamA, members: membersA },
        { name: teamB, members: membersB },
      ],
    });
  };

  const toggleCategory = (id) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategories(selectedCategoryIds.filter((item) => item !== id));
      return;
    }

    if (selectedCategoryIds.length < 3) {
      setSelectedCategories([...selectedCategoryIds, id]);
    }
  };

  const launchMatch = () => {
    saveTeams();
    startMatch();
    navigation.navigate("SureliGameBoard");
  };

  return (
    <SureliLayout
      navigation={navigation}
      activeRoute=""
      showFooter={false}
      headerOverride={<GameFlowHeader navigation={navigation} />}
      contentStyle={styles.layoutContent}
    >
      <View style={styles.page}>
        <Text style={styles.pageTitle}>Start a New Game</Text>
        <ProgressLine
          activeStep={step === "categories" ? 1 : step === "settings" ? 2 : 2}
          // viewportWidth={viewportWidth}
        />

        {step === "teams" ? (
          <TeamsContent
            gameName={localGameName}
            setGameName={setLocalGameName}
            teamA={teamA}
            setTeamA={setTeamA}
            teamB={teamB}
            setTeamB={setTeamB}
            membersA={membersA}
            setMembersA={setMembersA}
            membersB={membersB}
            setMembersB={setMembersB}
            onNext={() => {
              saveTeams();
              navigation.navigate("SureliStartGameCategories");
            }}
          />
        ) : null}

        {step === "categories" ? (
          <CategoriesContent
            navigation={navigation}
            activeFilter={activeFilter}
            onFilter={setActiveFilter}
            selectedCategoryIds={selectedCategoryIds}
            onToggleCategory={toggleCategory}
          />
        ) : null}

        {step === "settings" ? (
          <SettingsContent
            navigation={navigation}
            gameName={localGameName}
            setGameName={setLocalGameName}
            teamA={teamA}
            setTeamA={setTeamA}
            teamB={teamB}
            setTeamB={setTeamB}
            membersA={membersA}
            setMembersA={setMembersA}
            membersB={membersB}
            setMembersB={setMembersB}
            timePerQuestion={timePerQuestion}
            onSetTime={setTimePerQuestion}
            onStart={launchMatch}
          />
        ) : null}

        <GameFlowFooter />
      </View>
    </SureliLayout>
  );
}

function ProgressLine({ activeStep, viewportWidth }) {
  return (
    <View style={[styles.progressRow, { width: viewportWidth }]}>
      {progressItems.map((item, index) => {
        const stepNumber = index + 1;
        const complete = stepNumber < activeStep;
        const active = stepNumber === activeStep;
        return (
          <View key={item.step} style={styles.progressItem}>
            <View style={styles.progressStep}>
              <View style={[styles.progressDot, complete || active ? styles.progressDotActive : null]}>
                <Text style={[styles.progressDotText, complete || active ? styles.progressDotTextActive : null]}>
                  {complete ? "✓" : item.step}
                </Text>
              </View>
              <Text style={[styles.progressLabel, active ? styles.progressLabelActive : null]}>{item.label}</Text>
            </View>
            {index < progressItems.length - 1 ? <View style={[styles.progressLine, complete ? styles.progressLineActive : null]} /> : null}
          </View>
        );
      })}
    </View>
  );
}

function TeamsContent({
  gameName,
  setGameName,
  teamA,
  setTeamA,
  teamB,
  setTeamB,
  membersA,
  setMembersA,
  membersB,
  setMembersB,
  onNext,
}) {
  return (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>Team Setup</Text>
      <Text style={styles.sectionSubtitle}>Create your game and add both teams.</Text>
      <TeamSettingsForm
        gameName={gameName}
        setGameName={setGameName}
        teamA={teamA}
        setTeamA={setTeamA}
        teamB={teamB}
        setTeamB={setTeamB}
        membersA={membersA}
        setMembersA={setMembersA}
        membersB={membersB}
        setMembersB={setMembersB}
      />
      <View style={styles.actionsRowEnd}>
        <PrimaryButton label="Next Step →" onPress={onNext} style={styles.nextButton} />
      </View>
    </View>
  );
}

function CategoriesContent({ navigation, activeFilter, onFilter, selectedCategoryIds, onToggleCategory }) {
  return (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>Choose Categories</Text>
      <Text style={styles.sectionSubtitle}>Each team picks 3 categories.</Text>

      <View style={styles.searchWrap}>
        <SearchInput />
      </View>
      <View style={styles.filtersWrap}>
        <FilterPills
          items={["All", "Entertainment", "Games", "Sports", "TV Shows"]}
          active={activeFilter}
          onPress={onFilter}
        />
      </View>

      <View style={styles.categoryGrid}>
        {categoryCatalog.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            selected={selectedCategoryIds.includes(category.id)}
            onPress={() => onToggleCategory(category.id)}
          />
        ))}
      </View>

      <View style={styles.actionsRow}>
        <GhostButton label="← Back" onPress={() => navigation.navigate("SureliStartGameTeams")} style={styles.backButton} />
        <PrimaryButton label="Next Step →" onPress={() => navigation.navigate("SureliStartGameSettings")} style={styles.nextButton} />
      </View>
    </View>
  );
}

function SettingsContent({
  navigation,
  gameName,
  setGameName,
  teamA,
  setTeamA,
  teamB,
  setTeamB,
  membersA,
  setMembersA,
  membersB,
  setMembersB,
  timePerQuestion,
  onSetTime,
  onStart,
}) {
  return (
    <View style={styles.sectionWrap}>
      <Text style={styles.sectionTitle}>Game Settings</Text>

      <View style={styles.settingsBlock}>
        <Text style={styles.settingsLabel}>Time per Question</Text>
        <View style={styles.timeRow}>
          {[10, 15, 20, 30].map((item) => (
            <Pressable
              key={item}
              onPress={() => onSetTime(item)}
              style={[styles.timePill, timePerQuestion === item ? styles.timePillActive : null]}
            >
              <Text style={[styles.timePillText, timePerQuestion === item ? styles.timePillTextActive : null]}>
                {item}s
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <TeamSettingsForm
        gameName={gameName}
        setGameName={setGameName}
        teamA={teamA}
        setTeamA={setTeamA}
        teamB={teamB}
        setTeamB={setTeamB}
        membersA={membersA}
        setMembersA={setMembersA}
        membersB={membersB}
        setMembersB={setMembersB}
      />

      <View style={styles.settingsBlock}>
        <Text style={styles.settingsLabel}>Each team chooses 3 aids</Text>
        <View style={styles.aidsRow}>
          <AidColumn name={teamA} />
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <AidColumn name={teamB} />
        </View>
      </View>

      <View style={styles.actionsRow}>
        <GhostButton label="← Back" onPress={() => navigation.navigate("SureliStartGameCategories")} style={styles.backButton} />
        <PrimaryButton label="Start Match →" onPress={onStart} style={styles.nextButton} />
      </View>
    </View>
  );
}

function TeamSettingsForm({
  gameName,
  setGameName,
  teamA,
  setTeamA,
  teamB,
  setTeamB,
  membersA,
  setMembersA,
  membersB,
  setMembersB,
}) {
  return (
    <View style={styles.formStack}>
      <Text style={styles.fieldLabelCenter}>Game Name</Text>
      <TextInput
        value={gameName}
        onChangeText={setGameName}
        placeholder="Specific game name"
        placeholderTextColor="#98A5BA"
        style={styles.fullInput}
      />

      <View style={styles.teamRow}>
        <View style={styles.teamColumn}>
          <Text style={styles.fieldLabelCenter}>Team A</Text>
          <TextInput
            value={teamA}
            onChangeText={setTeamA}
            placeholder="Team name"
            placeholderTextColor="#98A5BA"
            style={styles.teamInput}
          />
        </View>
        <View style={styles.teamColumn}>
          <Text style={styles.fieldLabelCenter}>Team B</Text>
          <TextInput
            value={teamB}
            onChangeText={setTeamB}
            placeholder="Team name"
            placeholderTextColor="#98A5BA"
            style={styles.teamInput}
          />
        </View>
      </View>

      <View style={styles.teamRow}>
        <MemberCounter label="Team Member" value={membersA} onMinus={() => setMembersA(Math.max(1, membersA - 1))} onPlus={() => setMembersA(membersA + 1)} />
        <MemberCounter label="Team Member" value={membersB} onMinus={() => setMembersB(Math.max(1, membersB - 1))} onPlus={() => setMembersB(membersB + 1)} />
      </View>
    </View>
  );
}

function MemberCounter({ label, value, onMinus, onPlus }) {
  return (
    <View style={styles.teamColumn}>
      <Text style={styles.fieldLabelCenter}>{label}</Text>
      <View style={styles.counterWrap}>
        <Text style={styles.counterButton} onPress={onMinus}>−</Text>
        <Text style={styles.counterValue}>{value}</Text>
        <Text style={styles.counterButton} onPress={onPlus}>＋</Text>
      </View>
    </View>
  );
}

function AidColumn({ name }) {
  return (
    <View style={styles.aidColumn}>
      <View style={styles.aidNameRow}>
        <View style={styles.aidAvatar} />
        <Text style={styles.aidName}>{name}</Text>
      </View>
      <View style={styles.aidIconsRow}>
        {["🤘", "⇅", "📞", "🤞"].map((item) => (
          <View key={`${name}-${item}`} style={styles.aidBox}>
            <Text style={styles.aidBoxText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutContent: {
    paddingTop: rf(6, 4, 6),
  },
  page: {
    width: "100%",
    alignSelf: "center",
  },
  pageTitle: {
    color: colors.ink,
    fontSize: rf(28, 20, 28),
    fontWeight: "500",
    textAlign: "center",
    marginTop: rf(24, 16, 24),
  },
  progressRow: {
    flex:1,
    alignSelf: "center",
    marginTop: rf(24, 16, 24),
    paddingHorizontal: rw(28, 1440),
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
    borderRadius: 999,
    backgroundColor: "#EEF2F7",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  progressDotActive: {
    backgroundColor: "#32C95D",
  },
  progressDotText: {
    color: "#B9C2D2",
    fontSize: rf(10, 8, 10),
    fontWeight: "800",
  },
  progressDotTextActive: {
    color: "#FFFFFF",
  },
  progressLabel: {
    marginLeft: rf(8, 6, 8),
    color: "#9CA7B8",
    fontSize: rf(12, 10, 12),
    fontWeight: "700",
    flexShrink: 0,
  },
  progressLabelActive: {
    color: colors.ink,
  },
  progressLine: {
    flex: 1,
    minWidth: 0,
    height: 2,
    backgroundColor: "#E3E8F0",
    marginHorizontal: rf(8, 6, 8),
  },
  progressLineActive: {
    backgroundColor: "#32C95D",
  },
  sectionWrap: {
    paddingTop: rf(28, 18, 28),
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: rf(24, 18, 24),
    fontWeight: "600",
    textAlign: "center",
  },
  sectionSubtitle: {
    color: "#9BA6B7",
    fontSize: rf(14, 11, 14),
    textAlign: "center",
    marginTop: rf(8, 6, 8),
  },
  searchWrap: {
    marginTop: rf(22, 14, 22),
    alignItems: "center",
  },
  filtersWrap: {
    marginTop: rf(12, 8, 12),
    alignItems: "center",
  },
  categoryGrid: {
    marginTop: rf(18, 12, 18),
    flexDirection: "row",
    flexWrap: "wrap",
    gap: rf(16, 10, 16),
    justifyContent: "center",
  },
  actionsRow: {
    marginTop: rf(26, 18, 26),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: rf(14, 10, 14),
    flexWrap: "wrap",
  },
  actionsRowEnd: {
    marginTop: rf(26, 18, 26),
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backButton: {
    minWidth: rf(120, 100, 120),
    borderRadius: rf(10, 8, 10),
  },
  nextButton: {
    minWidth: rf(150, 120, 150),
    borderRadius: rf(10, 8, 10),
  },
  settingsBlock: {
    marginTop: rf(18, 12, 18),
    gap: rf(12, 8, 12),
  },
  settingsLabel: {
    color: "#374257",
    fontSize: rf(16, 12, 16),
    fontWeight: "700",
  },
  timeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#EEF3F9",
    borderRadius: rf(12, 8, 12),
    padding: 4,
  },
  timePill: {
    flex: 1,
    minWidth: rw(90, 1440),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: rf(14, 10, 14),
    borderRadius: rf(10, 8, 10),
  },
  timePillActive: {
    backgroundColor: colors.navy,
  },
  timePillText: {
    color: "#95A1B5",
    fontSize: rf(13, 11, 13),
    fontWeight: "800",
  },
  timePillTextActive: {
    color: "#FFFFFF",
  },
  formStack: {
    marginTop: rf(18, 12, 18),
    gap: rf(14, 10, 14),
  },
  fieldLabelCenter: {
    color: "#3C455A",
    fontSize: rf(14, 12, 14),
    fontWeight: "700",
    textAlign: "center",
  },
  fullInput: {
    height: rf(48, 42, 48),
    borderWidth: 1,
    borderColor: "#BFC9D7",
    borderRadius: rf(8, 6, 8),
    paddingHorizontal: rf(14, 10, 14),
    color: colors.ink,
    fontSize: rf(14, 12, 14),
    backgroundColor: "#FFFFFF",
  },
  teamRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: rf(18, 10, 18),
  },
  teamColumn: {
    flex: 1,
    minWidth: rw(240, 1440),
    gap: rf(8, 6, 8),
  },
  teamInput: {
    height: rf(48, 42, 48),
    borderWidth: 1,
    borderColor: "#BFC9D7",
    borderRadius: rf(8, 6, 8),
    paddingHorizontal: rf(14, 10, 14),
    color: colors.ink,
    fontSize: rf(14, 12, 14),
    backgroundColor: "#FFFFFF",
  },
  counterWrap: {
    height: rf(44, 40, 44),
    borderRadius: rf(8, 6, 8),
    backgroundColor: "#F6F8FC",
    borderWidth: 1,
    borderColor: "#E4EAF2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: rf(10, 8, 10),
  },
  counterButton: {
    color: "#AAB4C4",
    fontSize: rf(24, 18, 24),
    fontWeight: "700",
  },
  counterValue: {
    color: colors.ink,
    fontSize: rf(18, 14, 18),
    fontWeight: "800",
  },
  aidsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: rf(18, 10, 18),
    flexWrap: "wrap",
  },
  aidColumn: {
    flex: 1,
    minWidth: rw(260, 1440),
    gap: rf(12, 8, 12),
  },
  aidNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(8, 6, 8),
  },
  aidAvatar: {
    width: rf(22, 18, 22),
    height: rf(22, 18, 22),
    borderRadius: 999,
    backgroundColor: "#E0E6F1",
  },
  aidName: {
    color: colors.ink,
    fontSize: rf(15, 12, 15),
    fontWeight: "700",
  },
  aidIconsRow: {
    flexDirection: "row",
    gap: rf(12, 8, 12),
    flexWrap: "wrap",
  },
  aidBox: {
    width: rf(46, 38, 46),
    height: rf(46, 38, 46),
    borderRadius: rf(10, 8, 10),
    borderWidth: 2,
    borderColor: colors.pink,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  aidBoxText: {
    fontSize: rf(16, 13, 16),
  },
  vsCircle: {
    width: rf(42, 34, 42),
    height: rf(42, 34, 42),
    borderRadius: 999,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  vsText: {
    color: "#FFFFFF",
    fontSize: rf(13, 11, 13),
    fontWeight: "800",
  },
});
