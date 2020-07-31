import Action from './Action';

const useScreen = new Action('use-screen', 'Use screen', 'Use phone or PC screen for any non-emergency purpose');
const eat = new Action('eat', 'Eat', 'Eat or drink anything except water or unsweetened tea');
const work = new Action('work', 'Work', 'Do the job I am paid for');
const play = new Action('play', 'Play', 'Play video games');
const browse = new Action('browse', 'Browse', 'Look or read casually around the Internet');
const readNews = new Action('read-news', 'Read news', 'Read news that are related to me and my folks');
const readPm = new Action('read-pm', 'Read PM', 'Read personal messages from my folks');

const actions = [
  useScreen,
  eat,
  work,
  play,
  browse,
  readNews,
  readPm,
];

export { useScreen, eat, work, play, browse, readNews, readPm };
export default actions;
