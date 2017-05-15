var BubbleRush = BubbleRush || {};

BubbleRush.general = {

	// This will run at the start of the game
	init: function() {

		if(BubbleRush.helpers.isTouchDevice()) {
			BubbleRush.touchEvent = "touchstart";
		} else {
			BubbleRush.touchEvent = "click";
		}

		// Show the main menu
		BubbleRush.view.menu();

		// Add eventlisteners
		BubbleRush.general.addEventListeners();

	},

	// This contains all eventlisteners that are needed from start
	addEventListeners: function() {
		window.addEventListener("resize", BubbleRush.view.resize)
	}
}
