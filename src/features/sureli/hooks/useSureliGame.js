import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  awardQuestion,
  clearSelectedQuestion,
  configureTeams,
  resetGame,
  selectQuestion,
  setSelectedCategories,
  setTeamRole,
  setTimePerQuestion,
  startMatch,
} from "../../../redux/slices/sureli/sureliSlice";

export function useSureliGame() {
  const dispatch = useDispatch();
  const sureli = useSelector((state) => state.sureli);

  const leader = useMemo(() => {
    return [...sureli.teams].sort((left, right) => right.score - left.score)[0] || null;
  }, [sureli.teams]);

  return {
    ...sureli,
    leader,
    configureTeams: (payload) => dispatch(configureTeams(payload)),
    setSelectedCategories: (payload) => dispatch(setSelectedCategories(payload)),
    setTimePerQuestion: (payload) => dispatch(setTimePerQuestion(payload)),
    setTeamRole: (payload) => dispatch(setTeamRole(payload)),
    startMatch: () => dispatch(startMatch()),
    selectQuestion: (payload) => dispatch(selectQuestion(payload)),
    awardQuestion: (teamId) => dispatch(awardQuestion(teamId)),
    clearSelectedQuestion: () => dispatch(clearSelectedQuestion()),
    resetGame: () => dispatch(resetGame()),
  };
}
