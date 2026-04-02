import {
  widthPercentageToDP as wpBase,
  heightPercentageToDP as hpBase,
} from "react-native-responsive-screen";

export const wp = (value) => wpBase(typeof value === "number" ? `${value}%` : value);
export const hp = (value) => hpBase(typeof value === "number" ? `${value}%` : value);

export const rw = (size, base = 1440) => wp((size / base) * 100);
export const rh = (size, base = 900) => hp((size / base) * 100);

export const rf = (size, min, max, base = 390) => {
  const scaled = wp((size / base) * 100);

  if (typeof min === "number" && scaled < min) {
    return min;
  }

  if (typeof max === "number" && scaled > max) {
    return max;
  }

  return scaled;
};
