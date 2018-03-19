export const HMString = (timeMinutes: number, scale: number = 1) => {
  if (timeMinutes) {
    let min = timeMinutes / scale;
    let minutes = min % 60;
    let hours = (min - minutes) / 60;
    let minuteCeiling = Math.ceil(minutes);
    let duration = minuteCeiling + " min";
    if (min >= 60 && hours <= 24) {
      duration = Math.floor(minutes) + " min";
      duration = hours + " hr " + duration;
    } else if (hours > 24) {
      let day = Math.floor(hours / 24);
      let hour = Math.floor(hours % 24);
      duration = day + " d";
      if (hour > 0 && day < 3) {
        duration = duration + " " + hour + " hr";
      }
    }
    return duration;
  } else if (timeMinutes == 0) {
    return "1 min";
  } else {
    return "";
  }
};
