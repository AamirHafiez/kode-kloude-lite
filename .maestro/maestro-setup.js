/* eslint-disable no-undef */
const androidApp = "com.anonymous.kodekloudelite";
const iosApp = "com.anonymous.kode-kloude-lite";

if (maestro.platform === "ios") {
  output.appIdUnderTest = iosApp;
}
if (maestro.platform === "android") {
  output.appIdUnderTest = androidApp;
}
