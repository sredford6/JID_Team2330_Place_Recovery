import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * Return the date in the format "YYYY-MM-DD".
 * @param date a date object 
 * @returns a string of format date
 */
export function formatDate(date: Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

/**
 * Convert a date object into format string. Includes hours, minutes, and seconds
 * @param t a date object
 * @returns a string
 */
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

/**
 * Store string data into local async storage
 * @param key 
 * @param value 
 */
export async function storeDataString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log("save " + key + " : " + value + " successfully!");
  } catch (e) {
    console.log(e);
  }
}

/**
 * retrive string data from local storage
 * @param key 
 * @returns string
 */
export async function retrieveDataString(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("fail to fetech");
    // Error retrieving data
    return "fail";
  }
}
