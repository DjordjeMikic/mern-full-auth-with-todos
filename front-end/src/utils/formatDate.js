
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const formatDate = (a) => {
  let d = new Date(a);
  return {
    minutes: d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes(),
    hours: d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(),
    date: d.getDate() < 10 ? `0${d.getDate()}` : d.getDate(),
    day: d.toString().split(' ')[0],
    month: months[d.getMonth()],
    year: d.getFullYear()
  }
}

export default formatDate;
