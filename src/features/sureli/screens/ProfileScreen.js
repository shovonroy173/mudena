import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SureliLayout from "../components/SureliLayout";
import {
  InlineInput,
  PrimaryButton,
  ProfileAvatar,
} from "../components/SureliPrimitives";
import { useSureliAuth } from "../hooks/useSureliAuth";
import { colors } from "../../../shared/theme/colors";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useSureliAuth();
  const [firstName, setFirstName] = useState("Ar");
  const [lastName, setLastName] = useState("Raihan");
  const [mobile, setMobile] = useState("+8847564238472");
  const [profileEmail, setProfileEmail] = useState(user?.email || "arraihan815@gmail.com");
  const [birthDate, setBirthDate] = useState("15/11/2002");

  return (
    <SureliLayout navigation={navigation} activeRoute="SureliHome">
      <View style={styles.pageWrap}>
        <View style={styles.profileTabs}>
          <View style={styles.tabDark}>
            <Text style={styles.tabDarkText}>Profile</Text>
          </View>
          <PrimaryTab
            label="Change password"
            onPress={() => navigation.navigate("SureliChangePassword")}
          />
        </View>

        <View style={styles.profileGrid}>
          <View style={styles.leftForm}>
            <View style={styles.row}>
              <InlineInput label="First Name (Arabic)" value={firstName} onChangeText={setFirstName} style={styles.half} />
              <InlineInput label="Last Name (Arabic)" value={lastName} onChangeText={setLastName} style={styles.half} />
            </View>
            <View style={styles.row}>
              <InlineInput label="Mobile Number" value={mobile} onChangeText={setMobile} style={styles.half} />
              <InlineInput label="Email Address" value={profileEmail} onChangeText={setProfileEmail} style={styles.half} />
            </View>
            <InlineInput label="Date of Birth" value={birthDate} onChangeText={setBirthDate} style={styles.birthInput} />
            <PrimaryButton label="Save changes" style={styles.saveButton} />
          </View>

          <View style={styles.sideProfile}>
            <ProfileAvatar />
            <Text style={styles.profileName}>{user?.name || "Ar Raihan"}</Text>
            <Text style={styles.profileMail}>{user?.email || "arraihan815@gmail.com"}</Text>
            <View style={styles.signOutWrap}>
              <Text style={styles.signOutText} onPress={logout}>
                Sign out
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SureliLayout>
  );
}

function PrimaryTab({ label, onPress }) {
  return (
    <Text style={styles.tabGhostText} onPress={onPress}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  pageWrap: { minHeight: 700, paddingTop: 18 },
  profileTabs: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDE3EC",
    borderRadius: 999,
    padding: 4,
    gap: 24,
  },
  tabDark: {
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: colors.navy,
  },
  tabDarkText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  tabGhostText: { color: colors.ink, fontWeight: "700", fontSize: 16, paddingHorizontal: 16 },
  profileGrid: {
    marginTop: 34,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "wrap",
  },
  leftForm: { flex: 1, minWidth: 560, gap: 16 },
  row: { flexDirection: "row", gap: 18 },
  half: { flex: 1 },
  birthInput: { width: 240 },
  saveButton: { width: 175, marginTop: 22 },
  sideProfile: { width: 280, alignItems: "center", gap: 12, paddingTop: 22 },
  profileName: { color: colors.ink, fontSize: 24, fontWeight: "800" },
  profileMail: { color: colors.textSoft, fontSize: 16 },
  signOutWrap: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#F8B8DA",
    borderRadius: 12,
    paddingHorizontal: 26,
    paddingVertical: 14,
  },
  signOutText: { color: colors.pink, fontWeight: "800", fontSize: 16 },
});
