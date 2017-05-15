var BubbleRush = BubbleRush || {};

BubbleRush.controller = {

	// This function controlls the bubbles that are in the game
	bubble: function(options, bubble) {
		var reusing = false;


		if(bubble === undefined) {
			// Create a new bubble
			bubble = BubbleRush.draw.bubble(options);
			bubble.clicked = false;

		} else {

			// Change the existing bubble
			bubble.animate({duration: 50, ease: '>'}).scale(1).x(options.x).y(options.y);

			// after the animation finished, set the clicked state to false again
			// NOTE: this didn't work when
			setTimeout(function () {
				bubble.clicked = false;
			}, 50);

			var children = bubble.children();
			for (var i = 0; i < children.length; i++) {

				if(children[i].hasClass("color")) {

					children[i].fill(options.fill);
					children[i].radius(options.radius / 2);

				} else if(children[i].hasClass("glow")){

					children[i].radius((options.radius + (options.radius / 6)) / 2);
					children[i].fill(BubbleRush.stage.gradient('radial', function(stop) {
						stop.at({ offset: 0.6, color: "#ffffff", opacity: 0.2 });
						stop.at({ offset: 0.8, color: options.fill, opacity: 0.1 });
						stop.at({ offset: 1, color: options.fill, opacity: 0 });
					}));

				} else {
					children[i].radius(options.radius / 2);
				}
			}

			reusing = true;
		}


		if(reusing) bubble.off();
		bubble.on(BubbleRush.touchEvent, function(e) {
			console.log(bubble.clicked);
			if(!bubble.clicked) {
				bubble.clicked = true;
				BubbleRush.controller.onClick(e, options, bubble);
				BubbleRush.draw.clickEffect(options.x, options.y, options, bubble);
			}

		});


		if(options.countMe !== false) BubbleRush.visibleBubbles ++;

		// Make the bubble animate
		bubble.animate({duration: options.levelOptions.bubbleTime, ease: '<'}).scale(0).afterAll(function(){
			BubbleRush.controller.bubbleEnd(bubble, options, false);
		});

	},



	// If you do touch...
	onClick: function(e, options, bubble) {

		if(options.type !== undefined) {
			if(options.type === "life") {
				BubbleRush.lives++;
				BubbleRush.draw.message("+1", "extra life")
				BubbleRush.draw.updateLives();
			}
		}

		var points = options.levelOptions.pointsPerBubble;

		BubbleRush.doubleCheck.push(e.timeStamp/100);

		if(options.countMe !== false) {
			BubbleRush.bubblesHit++;

			setTimeout(function () {
				BubbleRush.doubleCheck = [];
			}, 50);
			if(BubbleRush.doubleCheck.length >= 2) {

				BubbleRush.streakLength ++;

				if(BubbleRush.streakLength < 5) {
					BubbleRush.draw.message(null, "Double hit", null);
				} else if(BubbleRush.streakLength < 20) {
					BubbleRush.draw.message(BubbleRush.streakLength + "x", "Double hit", "streak");
				} else if(BubbleRush.streakLength < 50) {
					BubbleRush.draw.message(BubbleRush.streakLength + "x", "Double hit", "super streak");
				} else if(BubbleRush.streakLength < 100) {
					BubbleRush.draw.message(BubbleRush.streakLength + "x", "Double hit", "mega streak");
				} else {
					BubbleRush.draw.message(BubbleRush.streakLength + "x", "Double hit", "insane streak");
				}

				clearTimeout(BubbleRush.streakTimer);

				BubbleRush.streakTimer = setTimeout(function () {
					BubbleRush.streakLength = 0;
				}, 1500);
			}

			if(BubbleRush.streakLength > 0) {
				points = points * BubbleRush.streakLength;
			}
		}

		BubbleRush.draw.updateScore(points);

		bubble.stop();
		BubbleRush.controller.bubbleEnd(bubble, options);

	},






	// After a bubble disappears
	bubbleEnd: function(bubble, options) {
		bubble.animate({duration: 100, ease: '>'}).scale(0);
		if(options.countMe !== false) {

			bubble.stop();

			if(!bubble.clicked) {
				BubbleRush.controller.dead();
			}
			if(BubbleRush.visibleBubbles == 0) {
				BubbleRush.lives = 0;
				BubbleRush.controller.dead();
			}
			BubbleRush.visibleBubbles --;

			BubbleRush.game.newBubble(bubble, options);
		}

	},






	dead: function() {
		if(BubbleRush.lives > 0) {
			BubbleRush.lives --;
			BubbleRush.draw.updateLives();
		} else {
			BubbleRush.gameOver();
		}
	}
}
