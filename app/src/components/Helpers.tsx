import AsyncStorage from "@react-native-async-storage/async-storage";

export function convertTime(t: Date) {
  let format =
    t.toString().split(" ")[0] +
    ", " +
    ("0" + (t.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + t.getDate()).slice(-2) +
    "/" +
    t.getFullYear() +
    ", " +
    ("0" + t.getHours()).slice(-2) +
    ":" +
    ("0" + t.getMinutes()).slice(-2) +
    ":" +
    ("0" + t.getSeconds()).slice(-2) +
    " ";
  return format;
}
/**
 *
 * @param date1 the latest date in number
 * @param date2 the previous date in number
 */
export function timeDifference(date1: number, date2: number) {
  var difference = date1 - date2;

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  //   console.log(
  //     "difference = " +
  //       daysDifference +
  //       " day/s " +
  //       hoursDifference +
  //       " hour/s " +
  //       minutesDifference +
  //       " minute/s "
  //   );
  return { daysDifference, hoursDifference, minutesDifference };
}

export async function storeDataString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log("save " + key + " : " + value + " successfully!");
  } catch (e) {
    console.log(e);
  }
}

export async function retrieveDataString(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("fail to fetech");
    // Error retrieving data
  }
}
