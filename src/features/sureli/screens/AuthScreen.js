import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import SureliLayout from "../components/SureliLayout";
import { PrimaryButton } from "../components/SureliPrimitives";
import { sureliAssets } from "../data/catalog";
import { useSureliAuth } from "../hooks/useSureliAuth";
import { colors, layout } from "../../../shared/theme/colors";
import { rf, rw } from "../../../shared/theme/responsive";

export default function AuthScreen({ navigation, route }) {
  const { variant } = route.params;
  const { login } = useSureliAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("name@company.com");
  const [password, setPassword] = useState("••••••••");
  const [forgotEmail, setForgotEmail] = useState("name@company.com");
  const [otp, setOtp] = useState(["8", "0", "-", "-"]);
  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••");

  const submit = () => {
    if (variant === "login" || variant === "register") {
      login(name || "Ar Raihan", email);
      navigation.replace("SureliMyGames");
      return;
    }

    if (variant === "forgot") {
      navigation.navigate("SureliVerifyOTP");
      return;
    }

    if (variant === "verify") {
      navigation.navigate("SureliSetNewPassword");
      return;
    }

    if (variant === "newPassword") {
      navigation.replace("SureliLogin");
      return;
    }

    navigation.goBack();
  };

  return (
    <SureliLayout
      navigation={navigation}
      activeRoute=""
      footerVariant="auth"
      showAuthDecor
      hideCenterNav
      backgroundColor="#F8FAFD"
      width={layout.contentWidth}
      contentStyle={styles.content}
      topRightOverride={
        <View style={styles.headerActions}>
          <Pressable onPress={() => navigation.navigate("SureliLogin")}>
            <Text style={styles.headerLogin}>Log In</Text>
          </Pressable>
          <PrimaryButton
            label="Start a Game"
            onPress={() => navigation.navigate("SureliStartGameCategories")}
            style={styles.headerButton}
            textStyle={styles.headerButtonText}
          />
          <Pressable style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>
        </View>
      }
    >
      {variant === "login" ? (
        <View style={styles.authCenterWrap}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>[?]</Text>
          </View>
          <Text style={styles.heroTitle}>Welcome Back</Text>
          <Text style={styles.heroSubtitle}>Log in to continue your trivia journey</Text>

          <View style={styles.authCard}>
            <AuthField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="name@company.com"
              leading="✉"
            />

            <View style={styles.passwordHeadingRow}>
              <Text style={styles.fieldLabel}>Password</Text>
              <Pressable onPress={() => navigation.navigate("SureliForgotPassword")}>
                <Text style={styles.inlineLink}>Forgot Password?</Text>
              </Pressable>
            </View>

            <AuthField
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              leading="🔒"
              trailing="◉"
              secureTextEntry
            />

            <View style={styles.rememberRow}>
              <View style={styles.checkbox} />
              <Text style={styles.rememberText}>Remember for 30 days</Text>
            </View>

            <PrimaryButton label="Sign In" onPress={submit} style={styles.fullButton} />

            <DividerLabel label="Or continue with" />

            <GoogleButton label="Google" onPress={submit} />

            <Text style={styles.bottomPrompt}>
              Don't have an account?{" "}
              <Text
                style={styles.bottomPromptAccent}
                onPress={() => navigation.navigate("SureliRegister")}
              >
                Sign up for free
              </Text>
            </Text>
          </View>
        </View>
      ) : null}

      {variant === "register" ? (
        <View style={styles.authCenterWrap}>
          <View style={[styles.authCard, styles.registerCard]}>
            <Text style={styles.cardTitle}>Create your account</Text>
            <Text style={styles.cardSubtitle}>
              Join Sureli today and start your trivia journey.
            </Text>

            <AuthField
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="enter your full name"
              leading="◔"
            />
            <AuthField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="name@company.com"
              leading="✉"
            />
            <AuthField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              leading="🔒"
              trailing="◉"
              secureTextEntry
            />

            <View style={styles.rememberRow}>
              <View style={styles.checkbox} />
              <Text style={styles.rememberText}>Remember for 30 days</Text>
            </View>

            <PrimaryButton label="Sign Up" onPress={submit} style={styles.fullButton} />

            <DividerLabel label="Or continue with" />

            {/* <GoogleButton label="Google" onPress={submit} /> */}

            <Text style={styles.bottomPrompt}>
              Already have an account?{" "}
              <Text 
                onPress={() => navigation.navigate("SureliLogin")}
              
              style={styles.bottomPromptAccent}>Sign in</Text>
            </Text>
          </View>
        </View>
      ) : null}

      {variant === "forgot" ? (
        <AuthPanel
          title="Forget password"
          body="Enter your email address to ger a verification code for resetting your password."
        >
          <AuthField
            label="Email Address"
            value={forgotEmail}
            onChangeText={setForgotEmail}
            placeholder="name@company.com"
            leading="✉"
          />
          <Text style={styles.errorText}>Email is Required</Text>
          <PrimaryButton label="Send Code" onPress={submit} style={styles.fullButton} />
        </AuthPanel>
      ) : null}

      {variant === "verify" ? (
        <AuthPanel
          title="Verify OTP"
          body="Please check your email. We have sent a code to contact@gmail.com"
        >
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={`${index}`}
                value={digit}
                onChangeText={(value) =>
                  setOtp((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? value.slice(-1) || "-" : item,
                    ),
                  )
                }
                style={styles.otpInput}
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn’t receive code?</Text>
            <Text style={styles.resendLink}>Resend</Text>
          </View>
          <PrimaryButton label="Send Code" onPress={submit} style={styles.fullButton} />
        </AuthPanel>
      ) : null}

      {variant === "newPassword" ? (
        <AuthPanel
          title="Verify OTP"
          body="Please check your email. We have sent a code to contact@gmail.com"
        >
          <AuthField
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="••••••••"
            trailing="◉"
            secureTextEntry
          />
          <AuthField
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="••••••••"
            trailing="◉"
            secureTextEntry
          />
          <AuthField
            label="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
            trailing="◉"
            secureTextEntry
          />
          <PrimaryButton label="Send Code" onPress={submit} style={styles.fullButton} />
        </AuthPanel>
      ) : null}

      {variant === "changePassword" ? (
        <View style={styles.changePasswordWrap}>
          <View style={styles.profileTabs}>
            <Pressable style={styles.tabGhost} onPress={() => navigation.navigate("SureliProfile")}>
              <Text style={styles.tabGhostText}>Profile</Text>
            </Pressable>
            <View style={styles.tabDark}>
              <Text style={styles.tabDarkText}>Change password</Text>
            </View>
          </View>

          <View style={styles.changePasswordForm}>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.profileInput}
              placeholder="Current password"
              secureTextEntry
            />
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.profileInput}
              placeholder="New Password"
              secureTextEntry
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.profileInput}
              placeholder="Confirm password"
              secureTextEntry
            />
            <PrimaryButton label="change password" onPress={submit} style={styles.changeButton} />
          </View>
        </View>
      ) : null}
    </SureliLayout>
  );
}

function AuthPanel({ title, body, children }) {
  return (
    <View style={styles.panelWrap}>
      <View style={styles.panelCard}>
        <Text style={styles.panelTitle}>{title}</Text>
        <Text style={styles.panelBody}>{body}</Text>
        <View style={styles.panelStack}>{children}</View>
      </View>
    </View>
  );
}

function DividerLabel({ label }) {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{label}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

function GoogleButton({ label, onPress }) {
  return (
    <Pressable style={styles.googleButton} onPress={onPress}>
      <Image source={sureliAssets.imgGoogle} style={styles.googleIcon} />
      <Text style={styles.googleText}>{label}</Text>
    </Pressable>
  );
}

function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  leading,
  trailing,
  secureTextEntry = false,
}) {
  return (
    <View style={styles.fieldGroup}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <View style={styles.fieldShell}>
        {leading ? <Text style={styles.leadingIcon}>{leading}</Text> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A8B5CA"
          secureTextEntry={secureTextEntry}
          style={styles.fieldInput}
        />
        {trailing ? <Text style={styles.trailingIcon}>{trailing}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: rf(12, 8, 12),
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(16, 10, 16),
  },
  headerLogin: {
    color: colors.ink,
    fontSize: rf(15, 12, 15),
    fontWeight: "700",
  },
  headerButton: {
    minWidth: rf(126, 100, 126),
    paddingHorizontal: rf(18, 14, 18),
    paddingVertical: rf(11, 9, 11),
    borderRadius: 999,
  },
  headerButtonText: {
    fontSize: rf(13, 11, 13),
  },
  menuButton: {
    width: rf(26, 20, 26),
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    color: "#607089",
    fontSize: rf(22, 18, 22),
    fontWeight: "700",
  },
  authCenterWrap: {
    minHeight: rf(630, 500, 630),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: rf(18, 12, 18),
    paddingBottom: rf(10, 6, 10),
  },
  heroIcon: {
    width: rf(74, 58, 74),
    height: rf(74, 58, 74),
    borderRadius: rf(18, 14, 18),
    backgroundColor: "#FFE8F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: rf(18, 12, 18),
  },
  heroIconText: {
    color: colors.pink,
    fontSize: rf(26, 20, 26),
    fontWeight: "800",
  },
  heroTitle: {
    color: colors.ink,
    fontSize: rf(28, 22, 28),
    fontWeight: "800",
    marginBottom: rf(8, 6, 8),
  },
  heroSubtitle: {
    color: "#7F8CA4",
    fontSize: rf(15, 12, 15),
    fontWeight: "500",
    marginBottom: rf(22, 14, 22),
  },
  authCard: {
    width: "100%",
    maxWidth: rw(540, 1440),
    backgroundColor: "#FFFFFF",
    borderRadius: rf(24, 16, 24),
    paddingHorizontal: rf(22, 16, 22),
    paddingTop: rf(22, 16, 22),
    paddingBottom: rf(26, 18, 26),
    shadowColor: "#B4C0D3",
    shadowOpacity: 0.22,
    shadowRadius: rf(22, 14, 22),
    shadowOffset: { width: 0, height: 14 },
    gap: rf(14, 10, 14),
  },
  registerCard: {
    maxWidth: 540,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: rf(26, 20, 26),
    fontWeight: "800",
  },
  cardSubtitle: {
    color: "#6D7B92",
    fontSize: rf(15, 12, 15),
    lineHeight: rf(23, 18, 23),
    marginBottom: 8,
  },
  fieldGroup: { gap: rf(10, 6, 10) },
  fieldLabel: {
    color: "#44526B",
    fontSize: rf(15, 12, 15),
    fontWeight: "800",
  },
  fieldShell: {
    height: rf(58, 46, 58),
    borderWidth: 1,
    borderColor: "#D7E0ED",
    borderRadius: rf(14, 10, 14),
    backgroundColor: "#FFFFFF",
    paddingHorizontal: rf(15, 11, 15),
    flexDirection: "row",
    alignItems: "center",
    gap: rf(12, 8, 12),
  },
  leadingIcon: {
    width: rf(18, 14, 18),
    color: "#A9B7CB",
    fontSize: rf(15, 12, 15),
    textAlign: "center",
  },
  trailingIcon: {
    color: "#A9B7CB",
    fontSize: rf(16, 13, 16),
    fontWeight: "700",
  },
  fieldInput: {
    flex: 1,
    color: colors.ink,
    fontSize: rf(16, 13, 16),
    fontWeight: "600",
    paddingVertical: 0,
  },
  passwordHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -2,
  },
  inlineLink: {
    color: colors.pink,
    fontSize: 13,
    fontWeight: "800",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: -2,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D3DBE8",
    backgroundColor: "#FFFFFF",
  },
  rememberText: {
    color: "#96A3B7",
    fontSize: 14,
    fontWeight: "500",
  },
  fullButton: {
    width: "100%",
    marginTop: rf(6, 4, 6),
    borderRadius: 10,
    paddingVertical: rf(15, 11, 15),
    shadowColor: "#FF0A9D",
    shadowOpacity: 0.18,
    shadowRadius: rf(16, 10, 16),
    shadowOffset: { width: 0, height: 8 },
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: rf(10, 6, 10),
    marginVertical: rf(6, 4, 6),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E6ECF4",
  },
  dividerText: {
    color: "#97A4B8",
    fontSize: rf(14, 11, 14),
    fontWeight: "600",
  },
  googleButton: {
    height: rf(56, 44, 56),
    borderRadius: rf(14, 10, 14),
    borderWidth: 1,
    borderColor: "#D7E0ED",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: rf(12, 8, 12),
  },
  googleIcon: {
    width: rf(20, 16, 20),
    height: rf(20, 16, 20),
  },
  googleText: {
    color: "#44526B",
    fontSize: rf(16, 13, 16),
    fontWeight: "700",
  },
  bottomPrompt: {
    color: "#8B98AE",
    textAlign: "center",
    fontSize: rf(15, 12, 15),
    fontWeight: "500",
    marginTop: rf(4, 3, 4),
  },
  bottomPromptAccent: {
    color: colors.pink,
    fontWeight: "800",
  },
  panelWrap: {
    minHeight: rf(630, 500, 630),
    alignItems: "center",
    justifyContent: "center",
    paddingTop: rf(14, 10, 14),
    paddingBottom: rf(10, 6, 10),
  },
  panelCard: {
    width: "100%",
    maxWidth: rw(620, 1440),
    backgroundColor: "#FFFFFF",
    borderRadius: rf(20, 14, 20),
    paddingHorizontal: rf(32, 18, 32),
    paddingTop: rf(32, 20, 32),
    paddingBottom: rf(36, 24, 36),
    shadowColor: "#B4C0D3",
    shadowOpacity: 0.22,
    shadowRadius: rf(24, 16, 24),
    shadowOffset: { width: 0, height: 16 },
  },
  panelTitle: {
    color: colors.ink,
    fontSize: rf(28, 22, 28),
    fontWeight: "800",
    marginBottom: rf(14, 10, 14),
  },
  panelBody: {
    color: "#55647D",
    fontSize: rf(16, 13, 16),
    lineHeight: rf(35, 22, 35),
    marginBottom: rf(24, 16, 24),
    maxWidth: rw(430, 1440),
  },
  panelStack: { gap: rf(14, 10, 14) },
  errorText: {
    color: "#FF4848",
    fontSize: rf(16, 13, 16),
    fontWeight: "500",
    marginTop: -2,
  },
  otpRow: {
    flexDirection: "row",
    gap: rf(26, 14, 26),
    marginTop: rf(2, 1, 2),
    marginBottom: rf(2, 1, 2),
    justifyContent: "flex-start",
  },
  otpInput: {
    width: rf(60, 42, 60),
    height: rf(64, 46, 64),
    borderRadius: rf(10, 8, 10),
    borderWidth: 1.5,
    borderColor: colors.pink,
    color: colors.ink,
    fontSize: rf(34, 24, 34),
    fontWeight: "800",
    backgroundColor: "#FFFFFF",
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: rf(8, 6, 8),
  },
  resendText: {
    color: colors.ink,
    fontSize: rf(18, 14, 18),
    fontWeight: "500",
  },
  resendLink: {
    color: colors.pink,
    fontSize: rf(18, 14, 18),
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  changePasswordWrap: { minHeight: 680, paddingTop: 30 },
  profileTabs: { alignSelf: "center", flexDirection: "row", backgroundColor: "#DDE3EC", padding: 4, borderRadius: 999 },
  tabGhost: { minWidth: 150, alignItems: "center", justifyContent: "center", paddingVertical: 12, borderRadius: 999 },
  tabGhostText: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  tabDark: { minWidth: 190, alignItems: "center", justifyContent: "center", paddingVertical: 12, borderRadius: 999, backgroundColor: colors.navy },
  tabDarkText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  changePasswordForm: { width: "100%", maxWidth: 420, alignSelf: "center", gap: 22, marginTop: 42 },
  profileInput: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 16,
    color: "#B1BAC8",
    fontSize: 16,
  },
  changeButton: { width: "100%", marginTop: 14 },
});
