import { StatusBar } from "expo-status-bar";
import AppProviders from "./src/core/AppProviders";
import AppNavigator from "./src/core/navigation/AppNavigator";

export default function App() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      <AppNavigator />
    </AppProviders>
  );
}
