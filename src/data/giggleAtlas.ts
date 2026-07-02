import { ImageSourcePropType } from 'react-native';
import { gallery } from '../assets/gallery';

export type GiggleCategoryId = 'everyday' | 'animals' | 'nonsense';

export type GiggleCategory = {
  id: GiggleCategoryId;
  title: string;
  description: string;
  palette: 'pink' | 'yellow' | 'violet';
  image: ImageSourcePropType;
  jokes: string[];
};

export type Tale = {
  id: string;
  title: string;
  body: string;
};

export type FinishCard = {
  id: string;
  setup: string;
  endings: string[];
};

export type RandomJoke = {
  id: string;
  setup: string;
  punchline: string;
};

export const giggleCategories: GiggleCategory[] = [
  {
    id: 'everyday',
    title: 'Daily Life',
    description: 'Laugh at the funniest moments from everyday life. Small situations, big smiles.',
    palette: 'pink',
    image: gallery.dailyMugnote,
    jokes: [
      "Yesterday I decided to tidy up my room. Now I can't find anything, but it's beautiful.",
      'I opened the fridge just to look. It looked so convincing that I had to have a snack.',
      'I bought an alarm clock that should motivate me to get up earlier. Now every morning I press "5 more minutes" with motivation.',
      'I told myself not to put off anything today. I decided to start with it tomorrow.',
      'I wanted to cook dinner according to a recipe from the Internet. The recipe was simple, but the kitchen after it was no longer.',
      'I went to the store just to get bread. I came back with two packages and forgot to buy bread.',
      'I decided to clean up the table a little. Now the mess just lies in even piles.',
      'I gave up my seat in transport. It turned out that the person was just tying a shoelace.',
      'Bought a bottle of water for sports. The hardest part of the workout was getting it home.',
      'Wrote a to-do list for the day. The list was completed, but for some reason the tasks remained.',
      'Tried to go to bed earlier. The dream said that today was his day off.',
      "Found an old box of things. Now I've been thinking for half an hour why I kept it.",
      'Wanted to take the perfect selfie. The phone decided that the ceiling was more photogenic.',
      'Asked a friend to help me quickly fix something. Two hours later, we were already watching memes and forgot that we were repairing.',
      'Decided to take a walk for some fresh air. On the way, I accidentally stopped by a coffee shop and returned with dessert.',
    ],
  },
  {
    id: 'animals',
    title: 'Animals',
    description: 'Cute, silly and unexpected jokes inspired by our favorite animals.',
    palette: 'yellow',
    image: gallery.animalTrio,
    jokes: [
      'The cat watched me eat so attentively. It seems he was checking if I had forgotten to share.',
      'The dog heard the word "walk" even in his sleep. I think it is his superpower.',
      'The parrot was silent all day. But at exactly six o clock in the evening he decided to repeat the alarm clock.',
      'The hamster hid his food so carefully. It seems he is already preparing for the next winter.',
      'The cat solemnly brought me his toy. A minute later he changed his mind and took it back.',
      'The dog was running after his own tail. From the outside, it looked like a very important meeting.',
      'The turtle walked so slowly to the bowl. But he still came first, because no one else was in a hurry.',
      'The rabbit jumped under the sofa so quickly. He must have heard the word "veterinarian."',
      'The cat lay down on the keyboard. He also wanted to write a message.',
      'The dog proudly carried a huge stick. It was clear that he had found a real treasure today.',
      'The fish was looking at me intently through the glass. It must have been waiting for me to finally stop looking at the refrigerator.',
      'The parrot heard a new word. Now he repeats it only when the house is quiet.',
      'The cat pretended not to know me at all. But as soon as he heard the opening of the bag of treats, he immediately became the best friend.',
      'The dog brought the ball and waited patiently. When I threw it, it seemed to him that he was happier than me.',
      'The kitten accidentally saw itself in the mirror. For several minutes it tried to figure out who this new furry neighbor was.',
    ],
  },
  {
    id: 'nonsense',
    title: 'Absurd',
    description: "Completely ridiculous jokes that make no sense but are impossible not to laugh at.",
    palette: 'violet',
    image: gallery.zanyBananaToast,
    jokes: [
      'Yesterday my toast was offended by the toaster. Now they only communicate through a plate.',
      'The sock decided to go on vacation. That is why her friend is still looking for her.',
      'The refrigerator sighed so loudly. He must have been tired of the night visits too.',
      'The spoon looked at the fork and said: "Today is your shift." The fork pretended not to hear.',
      'The sofa invited the chair to a lying down competition. The person who fell asleep between them won.',
      'The pencil wrote so diligently that the eraser became jealous. I had to erase the insults.',
      'The kettle boiled with curiosity. He really wanted to know who opened the refrigerator again.',
      'The umbrella decided to rest in the rain. He says that sometimes you need to trust the clouds.',
      'The alarm clock woke up earlier than everyone else. But no one thanked him for his efforts.',
      'The slippers ran under the bed. It seems that they also wanted to play hide-and-seek.',
      'The pillow told the blanket that he was working remotely today. As a result, everyone just slept longer.',
      'The mirror smiled at me first. I decided that this was a very polite morning.',
      'The banana bought himself sunglasses. He says he does not want to grow old prematurely.',
      'The door politely greeted the closet. The closet was silent because it was too busy keeping secrets.',
      'The light bulb decided to shine even brighter. She just wanted to be a little sunshine at home.',
    ],
  },
];

export const funFacts = [
  'The refrigerator works best when you open it for the fifth time in ten minutes.',
  'If you say "I will just sit down," there is a good chance you will spend another half hour on the couch.',
  'Socks have a mysterious superpower - sometimes they disappear without any explanation.',
  'The alarm clock always rings just when the dream is getting the most interesting.',
  'Cats can appear near a bag of treats faster than you can open it.',
  'If you pretend to go for a walk with a dog, its happiness level increases dramatically.',
  'The shortest path to the refrigerator strangely passes by the TV.',
  'The TV remote is right after you stop looking for it.',
  "A cup of tea tastes even better if you've already sat down and don't plan on getting up.",
  'It starts raining right when you leave your umbrella at home.',
  'If you look for your glasses for a long time, there is a chance that you will find them on your head.',
  'Slippers like to hide under the bed for no reason.',
  'The most delicious sandwich is the one you promised not to eat after eight in the evening.',
  'The line at the store always seems longer in front of you.',
  'When the phone is silent all day, it will definitely ring at the most inconvenient moment.',
  'If you clean your desk too well, it becomes much more difficult to find the right thing.',
  'Houseplants look especially happy after you forgot to water them and remembered at the last moment.',
  'The best ideas often come when it is already time to go to bed.',
  "If a cat sits on your keyboard, it's officially helping you work.",
  "A smile doesn't weigh much, but it almost always makes your day a little easier.",
];

export const finishCards: FinishCard[] = [
  {
    id: 'pillow-trip',
    setup: 'I told my pillow I needed a vacation...',
    endings: ['It packed my pajamas.', 'It wished me sweet dreams.', 'It hid under the blanket.'],
  },
  {
    id: 'fridge-chat',
    setup: 'My fridge looked at me and said...',
    endings: ['"You are here again?"', '"Bring me some pizza."', '"Close the door, I am freezing!"'],
  },
  {
    id: 'banana-shades',
    setup: 'The banana wore sunglasses because...',
    endings: ['It wanted to look cool.', 'It was going to the beach.', "It didn't want the apples to recognize it."],
  },
  {
    id: 'coffee-wave',
    setup: 'My coffee waved at me because...',
    endings: ['It knew Monday had arrived.', 'It missed me.', 'It finally woke up too.'],
  },
  {
    id: 'duck-bakery',
    setup: 'The duck opened a bakery because...',
    endings: ['Bread loved swimming.', 'It made quack-cakes.', 'Everyone wanted crispy crumbs.'],
  },
  {
    id: 'sock-mystery',
    setup: 'My socks disappeared because...',
    endings: ['They were playing hide-and-seek.', 'They went on vacation.', 'The washing machine adopted them.'],
  },
  {
    id: 'cookie-gym',
    setup: 'The cookie joined the gym because...',
    endings: ["It didn't want to crumble.", 'It loved running.', 'It wanted chocolate muscles.'],
  },
  {
    id: 'pencil-star',
    setup: 'The pencil became famous because...',
    endings: ['It always had a point.', 'It signed every notebook.', 'It drew invisible masterpieces.'],
  },
  {
    id: 'backpack-laugh',
    setup: 'My backpack laughed because...',
    endings: ['It was full of snacks.', 'It finally got a day off.', 'My homework stayed home.'],
  },
  {
    id: 'cloud-blue',
    setup: 'The cloud looked upset because...',
    endings: ['It forgot its rainbow.', 'Someone stole its sunshine.', 'It needed a nap.'],
  },
];

export const tales: Tale[] = [
  {
    id: 'professor-entryway',
    title: 'The Smartest Cat in the Entrance',
    body: 'In our entrance lived a cat, whom everyone called the Professor. No one knew if he had any owners, but he behaved as if he was the one paying for the utilities. Every morning he sat by the door and looked carefully at all the neighbors. If someone came with packages, the Professor politely escorted them to the elevator, as if he worked as a concierge. One day someone accidentally left a box of cookies on a bench. The cat came up, sniffed it, proudly turned around and walked away. A minute later he returned with a pigeon, which immediately began to peck at the cookies. The Professor calmly sat down next to him and watched. The pigeon accidentally knocked over the box, and a small bag of cat treats fell out of it, which was hidden inside. The cat slowly approached, picked it up and just as calmly walked away. The dove stared at the empty box for a few more minutes, as if trying to understand what had just happened. Since that day, everyone has been joking that the Professor is not just a cat, but a real strategist.',
  },
  {
    id: 'fridge-winner',
    title: 'The Day the Refrigerator Won',
    body: 'One morning, I firmly decided to eat right. I solemnly told myself that today there would be no sweets or unnecessary snacks. To be more sure, I even wrote it on a sticker and stuck it to the refrigerator. Only ten minutes passed, and I went to check if the sticker was still there. At the same time, I opened the refrigerator door, because I wondered if the yogurt was missing me. Then I saw the cheese, a piece of sausage lying next to it, and a piece of cake standing alone on the top shelf. I looked at it for a long time, and it looked at me silently. In the end, I decided that one small piece could not be considered a violation of the plan. A few minutes later, only the plate remained of the cake. I closed the refrigerator again and looked at my sticker. Without thinking twice, I added at the bottom in small letters: "Start eating right... tomorrow." I thought the refrigerator hummed softly with satisfaction.',
  },
  {
    id: 'hat-winner',
    title: 'How I Accidentally Became a Winner',
    body: 'Our town was holding a fun contest with a very simple condition: you had to come in a funny hat. I did not have any hat, so on the way I found an old straw one that was gathering dust in the closet. It looked like it had been through more than one adventure, but there was no other option. When I arrived at the square, everyone around was in incredible costumes. Someone had a hat that was glowing, someone had one that was spinning, and one guy even had a toy duck sitting on top. I already thought that I had no chance, and just started eating ice cream on the side. Suddenly a light breeze came up, and my old hat flew right through the crowd. People started catching it, laughing, passing it to each other, and the host announced that this was the best entertainment of the whole day. When the hat was solemnly returned to me, the host smiled and said: "The winner is the one who made everyone laugh." So I won the competition without even trying.',
  },
  {
    id: 'bagel-walk',
    title: 'The Dog Who Walked By Himself',
    body: 'There lived a very cheerful dog named Bagel in the yard. He was so friendly that he greeted almost every passerby. One day, his owner accidentally let go of the leash when he was tying his shoelace. Bagel was not at a loss. He took the leash in his teeth and walked on, as if it was meant to be. People stopped, smiled and looked after the unusual picture: the dog was walking itself, and the owner was barely keeping up behind. The funniest thing happened at the pedestrian crossing. Bagel patiently waited for the green light, looked back at his owner, as if checking if he had not fallen behind, and only then went ahead. After the walk, the neighbors joked that soon the dog would start buying treats at the store on its own. But the owner just laughed and said that the main thing is not to be late when your dog has already learned to organize walks on its own.',
  },
  {
    id: 'sock-search',
    title: 'The Mystery of the Lost Sock',
    body: 'Probably, at least once in every house, one sock mysteriously disappeared after washing. I also could not figure out where they went for a long time. One day I decided to conduct a real investigation. After washing, I carefully counted all the socks, folded them in pairs and even took a photo for reliability. But one still disappeared without a trace. I checked the washing machine, the laundry basket, the closet and even looked under the sofa. Nothing. I had almost given up when I heard a strange rustling. There was a cat sitting under the bed and sleeping very contentedly, resting its head on my lost sock. It seems that he had decided long ago that it was his personal pillow. I carefully took the find away, and the cat did not even wake up. Since then, every time something disappears at home, I first look not in the closet, but under the bed. Because if there is a cat lying there with a very happy look, then the search is almost over.',
  },
  {
    id: 'odd-order',
    title: 'The Strangest Order',
    body: 'Once I was standing in line at a coffee shop and heard a very unusual order. The guy in front of me looked at the menu for a long time, and then in a serious voice asked for coffee "not too hot, but not too cold, so that it was warm, but not too warm." The barista just smiled and started preparing the drink. After a few minutes, the guy took a sip, thought and said: "Almost perfect, but you can make it a little more... well, coffee." The line became quiet, and then everyone laughed together. The barista was not confused, winked and replied: "This is a secret recipe for the next level." Even the customer himself started laughing along with everyone. While I waited for my turn, the mood was great in the entire coffee shop. It seems that sometimes one funny phrase works better than any discount or promotion.',
  },
  {
    id: 'remote-operation',
    title: 'The Big Operation Remote',
    body: 'One evening the whole family decided to watch a movie. The popcorn was ready, the tea was poured, everyone was comfortably settled on the sofa. There was only one small task left - to find the TV remote. At first, everyone was sure that it was somewhere nearby. They checked the table, shelves, kitchen, even the refrigerator, although no one could explain why they were looking for it there. Then a real detective operation began. The sofa was moved away from the wall, pockets of jackets, boxes, blankets and even a flower pot were checked. Everyone had their own version of the remote disappearance. The younger brother was convinced that a cat had taken it. Dad seriously suggested that the remote simply got tired of working and went on vacation. After twenty minutes of searching, everyone was laughing more than they wanted to watch the movie itself. At some point, Grandma calmly lifted the pillow on which Dad had been sitting all this time, and silently took the remote out of there. The room fell silent for a few seconds, then everyone burst out laughing. Dad just smiled and said: "I was just guarding it so no one lost it." Since then, before every family viewing, someone has made a joke: "Make sure Dad is not guarding the remote again."',
  },
];

export const nicknamePool = [
  'Captain Cookie',
  'Bubble Buddy',
  'Tiny Muffin',
  'Giggle Panda',
  'Smiley Fox',
  'Cherry Buddy',
  'Honey Cookie',
  'Muffin Boss',
  'Peanut Hero',
  'Sunny Bunny',
  'Jelly Bean',
  'Cocoa Puff',
  'Happy Waffle',
  'Biscuit Buddy',
  'Caramel Pop',
  'Noodle Bear',
  'Candy Rocket',
  'Silly Penguin',
  'Toffee Bunny',
  'Marshmallow Buddy',
];

export const randomJokes: RandomJoke[] = [
  { id: 'bones', setup: "Why don't skeletons fight each other?", punchline: "They don't have the guts." },
  { id: 'banana-doc', setup: 'Why did the banana go to the doctor?', punchline: "Because it wasn't peeling well." },
  { id: 'computer-glasses', setup: 'Why did the computer wear glasses?', punchline: 'To improve its website.' },
  { id: 'cookie-doc', setup: 'Why did the cookie visit the doctor?', punchline: 'It felt a little crumby.' },
  { id: 'math-book', setup: 'Why was the math book sad?', punchline: 'Because it had too many problems.' },
  { id: 'cloud-wear', setup: 'What do clouds wear under their raincoats?', punchline: 'Thunderwear.' },
  { id: 'tomato-blush', setup: 'Why did the tomato blush?', punchline: 'Because it saw the salad dressing.' },
  { id: 'coffee-report', setup: 'Why did the coffee file a police report?', punchline: 'It got mugged.' },
  { id: 'balloon-music', setup: 'What kind of music do balloons hate?', punchline: 'Pop music.' },
  { id: 'eggs-jokes', setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up." },
  { id: 'sleeping-bull', setup: 'What do you call a sleeping bull?', punchline: 'A bulldozer.' },
  { id: 'broom-late', setup: 'Why did the broom arrive late?', punchline: 'It swept in.' },
  { id: 'fish-blush', setup: 'Why did the fish blush?', punchline: "Because it saw the ocean's bottom." },
  { id: 'bike-fall', setup: 'Why did the bicycle fall over?', punchline: 'It was two-tired.' },
  { id: 'cheese-owner', setup: "What do you call cheese that isn't yours?", punchline: 'Nacho cheese.' },
  { id: 'belt-arrest', setup: 'Why was the belt arrested?', punchline: 'It held up a pair of pants.' },
  { id: 'pencil-famous', setup: 'Why did the pencil become famous?', punchline: 'It always had a point.' },
  { id: 'orange-stop', setup: 'Why did the orange stop rolling?', punchline: 'It ran out of juice.' },
  { id: 'scarecrow-award', setup: 'Why did the scarecrow win an award?', punchline: 'Because he was outstanding in his field.' },
  { id: 'gummy-bear', setup: 'What do you call a bear with no teeth?', punchline: 'A gummy bear.' },
];
