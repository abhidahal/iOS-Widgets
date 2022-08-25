// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: calendar-alt;
const widget = new ListWidget();
widget.backgroundColor = new Color("#1C1C1E");
let gradient = new LinearGradient();
let previousDate = null;
gradient.locations = [0, 1];
gradient.colors = [new Color("000046"), new Color("1CB5E0")];
widget.backgroundGradient = gradient;
widget.url = "https://b5s.dabhishek.com.np";

async function buildWidget() {
  const date = await getDate();
  addDate(date);
}

async function getDate() {
  const currentDate = new Date();
  if (!isSameDay(previousDate, currentDate)) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const dateString = convertEnglishDateToNepali(year, month, day);
    return dateString[0];
  }
  previousDate = currentDate;
}

function addDate(date) {
  const rowStack = widget.addStack();
  rowStack.layoutHorizontally();
  const dateStack = rowStack.addStack();
  const dateText = dateStack.addText(date);
  dateText.font = Font.mediumSystemFont(16);
  dateText.textColor = new Color("#FFFFFF");
}

function isSameDay(d1, d2) {
  if (d1 instanceof Date && d2 instanceof Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDay() === d2.getDay()
    );
  } else {
    return false;
  }
}

function convertEnglishDateToNepali(yy, mm, dd) {
  if (!checkIfDateIsInRange(yy, mm, dd)) {
    return "Invalid date !";
  }

  const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const leap_year_months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const def_eyy = 1944;
  const def_nyy = 2000;
  const def_nmm = 9;
  const def_ndd = 17 - 1;
  let total_eDays = 0;

  let day = 7 - 1;
  let i, j;

  for (i = 0; i < yy - def_eyy; i++) {
    if (isLeapYear(def_eyy + i)) {
      for (j = 0; j < 12; j++) {
        total_eDays = total_eDays + leap_year_months[j];
      }
    } else {
      for (j = 0; j < 12; j++) {
        total_eDays = total_eDays + month[j];
      }
    }
  }

  for (i = 0; i < mm - 1; i++) {
    if (isLeapYear(yy)) total_eDays += leap_year_months[i];
    else total_eDays += month[i];
  }

  total_eDays += dd;

  i = 0;
  j = def_nmm;
  let total_nDays = def_ndd;
  let m = def_nmm;
  let y = def_nyy;
  let a = 0;

  while (total_eDays !== 0) {
    a = nepali_years_and_days_in_months[i][j];
    total_nDays++;
    day++;
    if (total_nDays > a) {
      m++;
      total_nDays = 1;
      j++;
    }
    if (day > 7) day = 1;
    if (m > 12) {
      y++;
      m = 1;
    }
    if (j > 12) {
      j = 1;
      i++;
    }
    total_eDays--;
  }

  const dateString = [];
  dateString[0] =
    getEnglishMonth(m) +
    " " +
    total_nDays +
    ", " +
    getEnglishDayOfWeekInString(day);
  return dateString;
}

function getEnglishMonth(month) {
  let englishMonth = "";

  switch (month) {
    case 1:
      englishMonth = "Baisakh";
      break;

    case 2:
      englishMonth = "Jesth";
      break;

    case 3:
      englishMonth = "Asar";
      break;

    case 4:
      englishMonth = "Srawan";
      break;

    case 5:
      englishMonth = "Bhadra";
      break;

    case 6:
      englishMonth = "Aaswin";
      break;

    case 7:
      englishMonth = "Kartik";
      break;

    case 8:
      englishMonth = "Mangsir";
      break;

    case 9:
      englishMonth = "Paush";
      break;

    case 10:
      englishMonth = "Magh";
      break;

    case 11:
      englishMonth = "Falgun";
      break;

    case 12:
      englishMonth = "Chaitra";
      break;
  }
  return englishMonth;
}

function getEnglishDayOfWeekInString(day) {
  switch (day) {
    case 1:
      day = "Sunday";
      break;

    case 2:
      day = "Monday";
      break;

    case 3:
      day = "Tuesday";
      break;

    case 4:
      day = "Wednesday";
      break;

    case 5:
      day = "Thursday";
      break;

    case 6:
      day = "Friday";
      break;

    case 7:
      day = "Saturday";
      break;
  }
  return day;
}

function checkIfDateIsInRange(year, month, day) {
  if (year < 1944 || year > 2033) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }

  return !(day < 1 || day > 31);
}

function isLeapYear(year) {
  if (year % 100 === 0) {
    return year % 400 === 0;
  } else {
    return year % 4 === 0;
  }
}

const nepali_years_and_days_in_months = [
  [2000, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2001, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2002, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2003, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2004, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2005, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2006, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2007, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2008, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  [2009, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2010, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2011, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2012, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [2013, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2014, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2015, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2016, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [2017, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2018, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2019, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2020, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [2021, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2022, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [2023, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2024, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [2025, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2026, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2027, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2028, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2029, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  [2030, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2031, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2032, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2033, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2034, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2035, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  [2036, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2037, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2038, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2039, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [2040, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2041, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2042, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2043, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [2044, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2045, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2046, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2047, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [2048, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2049, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [2050, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2051, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [2052, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2053, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [2054, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2055, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2056, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  [2057, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2058, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2059, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2060, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2061, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2062, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  [2063, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2064, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2065, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2066, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  [2067, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2068, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2069, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2070, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  [2071, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2072, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  [2073, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  [2074, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [2075, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2076, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [2077, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  [2078, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  [2079, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  [2080, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  [2081, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [2082, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [2083, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  [2084, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  [2085, 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  [2086, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [2087, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  [2088, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  [2089, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  [2090, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
];

await buildWidget();

Script.setWidget(widget);
Script.complete();
widget.presentSmall();
