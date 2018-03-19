
export const NameCase = (name: string, split: string = " ") => {
  if (name && typeof name == "string") {
    let words = name.split(split);
    words = words.map(word => {
      let uppercase = word.toUpperCase();
      let lowercase = word.toLowerCase();
      if (word == uppercase || word == lowercase) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word;
      }
    });
    let newName = words.reduce(
      (string, word) => {
        return `${string} ${word}`;
      },
      ""
    );
    return newName;
  } else {
    return name;
  }
};
