var BubbleRush = BubbleRush || {};

// Some variables
BubbleRush.stage = SVG('stage');
BubbleRush.elements = {};
BubbleRush.level = 0;
BubbleRush.lives = 3;
BubbleRush.score = 0;
BubbleRush.visibleBubbles = 0;
BubbleRush.bubblesHit = 0;

BubbleRush.messageVisible = false;

// This will be able to check multiple touches at the same time
BubbleRush.doubleCheck = [];
BubbleRush.streakLength = 0;



// Add the group elements so the objects stay in the right order
BubbleRush.layer = {};
BubbleRush.layer.background = BubbleRush.stage.group();
BubbleRush.layer.bubbles = BubbleRush.stage.group();
BubbleRush.layer.interface = BubbleRush.stage.group();

BubbleRush.layer.background.addClass('background');
BubbleRush.layer.bubbles.addClass('bubbles');
BubbleRush.layer.interface.addClass('interface');

BubbleRush.colors = ["#31E981", "#FFD131", "#E4572E", "#44CCFF", "#D90368", "#17BEBB", "#A2D729"];

// Initialize the game
BubbleRush.general.init();
