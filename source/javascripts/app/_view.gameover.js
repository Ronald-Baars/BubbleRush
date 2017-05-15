var BubbleRush = BubbleRush || {};
BubbleRush.view = BubbleRush.view || {};


BubbleRush.gameOver = function() {

	var fontSize = 120;
	if(BubbleRush.score < 10000) {
		fontSize = 140;
	} else if(BubbleRush.score > 99999) {
		fontSize = 96;
	}

	clearInterval(BubbleRush.interval);
	BubbleRush.layer.bubbles.clear();
	BubbleRush.layer.interface.clear();

	// Create the score
	BubbleRush.elements.scoreTxt = BubbleRush.layer.interface.text("You scored")
	BubbleRush.elements.scoreTxt.font({
		family: "comfortaa",
		size:36,
		anchor: "middle"
	});
	BubbleRush.elements.scoreTxt.move("50%", "20%");
	BubbleRush.elements.scoreTxt.fill('#fff');


	BubbleRush.elements.score = BubbleRush.layer.interface.text(String(BubbleRush.score));
	BubbleRush.elements.score.font({
		family: "comfortaa",
		size: fontSize,
		anchor: "middle"
	});
	BubbleRush.elements.score.move("50%", "25%");
	BubbleRush.elements.score.fill('#fff');

	BubbleRush.view.menu(true);
}
