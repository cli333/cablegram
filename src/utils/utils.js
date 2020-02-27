const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const checkTime = () => {
  let date = new Date();
  let sufix = "";
  let day = date.getDate();
  let month = monthNames[date.getMonth()];
  let weekday = dayNames[date.getDay()];
  let year = date.getFullYear();
  if (day > 3 && day < 21) sufix = "th";
  switch (day % 10) {
    case 1:
      sufix = "st";
      break;
    case 2:
      sufix = "nd";
      break;
    case 3:
      sufix = "rd";
      break;
    default:
      sufix = "th";
      break;
  }
  return `${weekday} ${month} ${day}${sufix}, ${year}`;
};

// takes one string
// combine two unique strings, userId(from firebase) + the submitted headline?
export const hash = s =>
  [...s].reduce.call(s, (p, c, i, a) => (p << 5) - p + a.charCodeAt(i), 0);

// custom callback to filter grams
export const filterGrams = filter => item => {
  const headline = item.headline.toLowerCase().includes(filter.toLowerCase());
  const author = item.author.toLowerCase().includes(filter.toLowerCase());
  const pictureCaption = item.pictureCaption
    .toLowerCase()
    .includes(filter.toLowerCase());
  const text = item.text.toLowerCase().includes(filter.toLowerCase());
  return headline || author || pictureCaption || text;
};

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export const validateHeadline = headline => {
  let wordsTooLong = headline.split(" ").some(word => word.length > 15);
  let headlineTooLong = headline.length > 30;
  if (wordsTooLong || headlineTooLong) return false;
  return true;
};

export const validateGram = (headline, pictureURL, pictureCaption, text) => {
  if (!headline || !pictureURL || !text) return false;
  if (pictureCaption.length > 50) return false;
  if (!validateHeadline(headline)) return false;
  if (!validURL(pictureURL)) return false;
  if (text.length < 500) return false;
  return true;
};

export const timeElapsed = createdAt => {
  const dateNow = new Date();
  let seconds = Math.floor((dateNow - createdAt) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};
