import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import InfoScreen from "../screens/InfoScreen";
import AuthScreen from "../screens/AuthScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyGamesScreen from "../screens/MyGamesScreen";
import StartGameScreen from "../screens/StartGameScreen";
import GameBoardScreen from "../screens/GameBoardScreen";
import QuestionScreen from "../screens/QuestionScreen";
import RoundResultScreen from "../screens/RoundResultScreen";
import WinnerScreen from "../screens/WinnerScreen";

const Stack = createNativeStackNavigator();

export default function SureliStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="SureliHome" component={HomeScreen} />

      <Stack.Screen
        name="SureliHowItWorks"
        component={InfoScreen}
        initialParams={{ mode: "howItWorks", activeRoute: "SureliHowItWorks" }}
      />
      <Stack.Screen
        name="SureliCategories"
        component={InfoScreen}
        initialParams={{ mode: "categories", activeRoute: "SureliCategories" }}
      />
      <Stack.Screen
        name="SureliFAQ"
        component={InfoScreen}
        initialParams={{ mode: "faq", activeRoute: "SureliFAQ" }}
      />
      <Stack.Screen
        name="SureliAbout"
        component={InfoScreen}
        initialParams={{ mode: "about", activeRoute: "SureliAbout" }}
      />
      <Stack.Screen
        name="SureliPrivacy"
        component={InfoScreen}
        initialParams={{ mode: "privacy", activeRoute: "SureliPrivacy" }}
      />

      <Stack.Screen
        name="SureliLogin"
        component={AuthScreen}
        initialParams={{ variant: "login" }}
      />
      <Stack.Screen
        name="SureliRegister"
        component={AuthScreen}
        initialParams={{ variant: "register" }}
      />
      <Stack.Screen
        name="SureliForgotPassword"
        component={AuthScreen}
        initialParams={{ variant: "forgot" }}
      />
      <Stack.Screen
        name="SureliVerifyOTP"
        component={AuthScreen}
        initialParams={{ variant: "verify" }}
      />
      <Stack.Screen
        name="SureliSetNewPassword"
        component={AuthScreen}
        initialParams={{ variant: "newPassword" }}
      />
      <Stack.Screen
        name="SureliChangePassword"
        component={AuthScreen}
        initialParams={{ variant: "changePassword" }}
      />

      <Stack.Screen name="SureliProfile" component={ProfileScreen} />
      <Stack.Screen name="SureliMyGames" component={MyGamesScreen} />
      <Stack.Screen
        name="SureliStartGame"
        component={StartGameScreen}
        initialParams={{ step: "teams" }}
      />
      <Stack.Screen
        name="SureliStartGameTeams"
        component={StartGameScreen}
        initialParams={{ step: "teams" }}
      />
      <Stack.Screen
        name="SureliStartGameCategories"
        component={StartGameScreen}
        initialParams={{ step: "categories" }}
      />
      <Stack.Screen
        name="SureliStartGameSettings"
        component={StartGameScreen}
        initialParams={{ step: "settings" }}
      />
      <Stack.Screen name="SureliGameBoard" component={GameBoardScreen} />
      <Stack.Screen name="SureliQuestion" component={QuestionScreen} />
      <Stack.Screen name="SureliRoundResult" component={RoundResultScreen} />
      <Stack.Screen name="SureliWinner" component={WinnerScreen} />
    </Stack.Navigator>
  );
}
