import { createSlice } from "@reduxjs/toolkit";
import { boardCategoryPool, categoryCatalog, sureliAssets } from "../../../features/sureli/data/catalog";

const buildBoard = (categories) =>
  categories.map((category, categoryIndex) => ({
    id: category.id,
    title: category.title,
    image: category.image,
    questions: [200, 400, 600].map((points, questionIndex) => ({
      id: `${category.id}-${points}`,
      categoryId: category.id,
      points,
      slot: `${categoryIndex}-${questionIndex}`,
      claimedBy: null,
      prompt:
        "What is the car ( Car name and company)",
      answer: "Sports",
      image: sureliAssets.imgLogoAlt,
    })),
  }));

const defaultTeams = [
  {
    id: "team-a",
    name: "Hasan",
    score: 0,
    members: 2,
    aids: ["50/50", "switch", "call", "hint"],
  },
  {
    id: "team-b",
    name: "Fahad",
    score: 0,
    members: 2,
    aids: ["50/50", "switch", "call", "hint"],
  },
];

const initialState = {
  gameName: "New Game",
  teamRole: "Mahmud",
  categories: categoryCatalog,
  selectedCategoryIds: ["pop-culture", "video-games", "music-legends"],
  board: buildBoard(boardCategoryPool),
  teams: defaultTeams,
  timePerQuestion: 15,
  selectedQuestion: null,
  lastAward: null,
};

const sureliSlice = createSlice({
  name: "sureli",
  initialState,
  reducers: {
    configureTeams(state, action) {
      const { gameName, teams } = action.payload;

      if (gameName) {
        state.gameName = gameName;
      }

      if (Array.isArray(teams) && teams.length === 2) {
        state.teams = teams.map((team, index) => ({
          id: index === 0 ? "team-a" : "team-b",
          name: team.name || defaultTeams[index].name,
          score: Number(team.score ?? 0),
          members: Number(team.members ?? 2),
          aids: defaultTeams[index].aids,
        }));
      }
    },
    setSelectedCategories(state, action) {
      const ids = Array.isArray(action.payload) ? action.payload.slice(0, 3) : [];
      state.selectedCategoryIds = ids.length ? ids : initialState.selectedCategoryIds;
    },
    setTimePerQuestion(state, action) {
      state.timePerQuestion = Number(action.payload || 15);
    },
    setTeamRole(state, action) {
      state.teamRole = action.payload || state.teamRole;
    },
    startMatch(state) {
      const selected = categoryCatalog.filter((item) =>
        state.selectedCategoryIds.includes(item.id),
      );
      const fallback = boardCategoryPool.filter(
        (item) => !selected.some((selectedItem) => selectedItem.id === item.id),
      );
      const mergedBoard = [...selected, ...fallback].slice(0, 6).map((item, index) => ({
        id: item.id,
        title: item.title.toUpperCase(),
        image: item.image,
        questions: [200, 400, 600].map((points, questionIndex) => ({
          id: `${item.id}-${points}`,
          categoryId: item.id,
          points,
          slot: `${index}-${questionIndex}`,
          claimedBy: null,
          prompt:
            "What is the car ( Car name and company)",
          answer: "Sports",
          image: sureliAssets.imgLogoAlt,
        })),
      }));

      state.board = mergedBoard;
      state.selectedQuestion = null;
      state.lastAward = null;
    },
    selectQuestion(state, action) {
      const { categoryId, questionId } = action.payload;
      const category = state.board.find((entry) => entry.id === categoryId);
      const question = category?.questions.find((item) => item.id === questionId);

      if (question && !question.claimedBy) {
        state.selectedQuestion = {
          ...question,
          categoryTitle: category.title,
        };
      }
    },
    awardQuestion(state, action) {
      const teamId = action.payload;

      if (!state.selectedQuestion) {
        return;
      }

      if (teamId !== "no-one") {
        state.teams = state.teams.map((team) =>
          team.id === teamId
            ? { ...team, score: team.score + state.selectedQuestion.points }
            : team,
        );
      }

      state.board = state.board.map((category) => ({
        ...category,
        questions: category.questions.map((question) =>
          question.id === state.selectedQuestion.id
            ? { ...question, claimedBy: teamId }
            : question,
        ),
      }));

      state.lastAward = {
        teamId,
        points: state.selectedQuestion.points,
        categoryTitle: state.selectedQuestion.categoryTitle,
      };
      state.selectedQuestion = null;
    },
    clearSelectedQuestion(state) {
      state.selectedQuestion = null;
    },
    resetGame(state) {
      state.gameName = initialState.gameName;
      state.teamRole = initialState.teamRole;
      state.categories = categoryCatalog;
      state.selectedCategoryIds = initialState.selectedCategoryIds;
      state.board = buildBoard(boardCategoryPool);
      state.teams = defaultTeams;
      state.timePerQuestion = 15;
      state.selectedQuestion = null;
      state.lastAward = null;
    },
  },
});

export const {
  awardQuestion,
  clearSelectedQuestion,
  configureTeams,
  resetGame,
  selectQuestion,
  setSelectedCategories,
  setTeamRole,
  setTimePerQuestion,
  startMatch,
} = sureliSlice.actions;

export default sureliSlice.reducer;
