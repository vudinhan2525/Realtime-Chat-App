const parseIcons = (input: string) => {
  // Define a mapping of text patterns to icons
  const iconMap = {
    ":\\)": "😊", // Smiling face
    ":D": "😃", // Grinning face with big eyes
    ":\\(": "😞", // Slightly frowning face
    ":O": "😲", // Face with open mouth
    ":P": "😛", // Face with tongue
    ":\\*": "😘", // Face blowing a kiss
    ":\\|": "😐", // Neutral face
    ":\\/": "😕", // Confused face
    ":@": "😠", // Angry face
    ":X": "😶", // Face without mouth
    ">:\\(": "😡", // Pouting face
    "<3": "❤️", // Red heart
    "O:\\)": "😇", // Smiling face with halo
    "\\(y\\)": "👍", // Thumbs up
    "\\(n\\)": "👎", // Thumbs down
    "\\(\\^\\^\\^\\)": "🐧", // Penguin
    ":\\'\\(": "😢", // Crying face
    ">:O": "😤", // Face with symbols on mouth
    ":putnam:": "😐", // Chris Putnam face
    ";-\\)": "😉", // Winking face
    ":-D": "😃", // Big grin
    ":\\|\\]": "😐", // Robot face
    ":-\\/": "😕", // Confused face
    ":\\]\\)": "😊", // Robot face
    ":\\(\\(\\(\\(": "😢", // Crying face
    ":-P": "😛", // Sticking tongue out
    ":-\\*": "😘", // Blowing a kiss
    "=D": "😃", // Grinning face
    "=\\(": "😞", // Frowning face
    ":-o": "😲", // Surprised face
    ";\\(": "😢", // Crying face
    "8-\\)": "😎", // Sunglasses
    ":-S": "😒", // Confused face
    //":\\(": "😞", // Sad face
    ";\\)": "😉", // Wink
    xD: "😆", // Laughing face
    "B\\)": "😎", // Cool
    ":/": "😕", // Unsure
    "3:\\)": "😈", // Devil
    "o:\\)": "😇", // Angel
    ":-#": "😡", // Grumpy
    ":-X": "😶", // Lips sealed
    ":\\$": "😳", // Blush
  };

  // Replace text patterns with corresponding icons
  let parsedInput = input;
  Object.entries(iconMap).forEach(([pattern, icon]) => {
    parsedInput = parsedInput.replace(new RegExp(pattern, "g"), icon);
  });

  return parsedInput;
};
export const emojis = [
  "😊", // Smiling face
  "😃", // Grinning face with big eyes
  "😞", // Slightly frowning face
  "😲", // Face with open mouth
  "😛", // Face with tongue
  "😘", // Face blowing a kiss
  "😐", // Neutral face
  "😕", // Confused face
  "😠", // Angry face
  "😶", // Face without mouth
  "😡", // Pouting face
  "❤️", // Red heart
  "👍", // Thumbs up
  "👎", // Thumbs down
  "🐧", // Penguin
  "😢", // Crying face
  "😤", // Face with symbols on mouth
  "😉", // Winking face
  "😛", // Big grin
  "😐", // Robot face
  "😕", // Confused face
  "😊", // Robot face
  "😢", // Crying face
  "😛", // Sticking tongue out
  "😘", // Blowing a kiss
  "😃", // Grinning face
  "😞", // Frowning face
  "😲", // Surprised face
  "😢", // Crying face
  "😎", // Sunglasses
  "😒", // Confused face
  // "😞", // Sad face
  "😉", // Wink
  "😆", // Laughing face
  "😎", // Cool
  "😕", // Unsure
  "😈", // Devil
  "😇", // Angel
  "😡", // Grumpy
  "😶", // Lips sealed
  "😳", // Blush
];
export default parseIcons;
