var BubbleRush = BubbleRush || {};


BubbleRush.game = {


	options: {

		levels: {
			1: {
				bubbleColor: "#FFA69E",
				totalBubbles: 1,
				pointsPerBubble: 1,
				bubbleSize: 200,
				bubblesNeeded: 10,
				bubbleTime: 5000,
				minimumDistance: 300
			},
			2: {
				bubbleColor: "#44CCFF",
				totalBubbles: 2,
				pointsPerBubble: 6,
				bubbleSize: 150,
				bubblesNeeded: 50,
				bubbleTime: 5000,
				minimumDistance: 300
			},
			3: {
				bubbleColor: "#FFD131",
				totalBubbles: 2,
				pointsPerBubble: 7,
				bubbleSize: 125,
				bubblesNeeded: 100,
				bubbleTime: 5000,
				minimumDistance: 250,
				extra: ['life']
			},
			4: {
				bubbleColor: "#E62C10",
				totalBubbles: 2,
				pointsPerBubble: 8,
				bubbleSize: 125,
				bubblesNeeded: 200,
				bubbleTime: 2500,
				minimumDistance: 200
			},
			5: {
				bubbleColor: "#36B74A",
				totalBubbles: 2,
				pointsPerBubble: 9,
				bubbleSize: 112,
				bubblesNeeded: 250,
				bubbleTime: 2000,
				minimumDistance: 150
			},
			6: {
				bubbleColor: "#FFA69E",
				totalBubbles: 2,
				pointsPerBubble: 20,
				bubbleSize: 110,
				bubblesNeeded: 50000,
				bubbleTime: 2000,
				minimumDistance: 100
			}
		}
	},

	init: function() {

		BubbleRush.layer.bubbles.clear();
		BubbleRush.layer.interface.clear();

		BubbleRush.draw.updateLives();

		// Some variables to keep track of the game
		BubbleRush.score = 0;
		BubbleRush.level = 1;
		BubbleRush.lives = 3;

		// Set the startedAt to the current time
		BubbleRush.startedAt = Math.round(new Date().getTime()/1000);
		BubbleRush.game.newBubble();

		// Create the score
		BubbleRush.elements.gamescore = BubbleRush.layer.interface.text(String(BubbleRush.score));
		BubbleRush.elements.gamescore.font({
			family: "comfortaa",
			anchor: "end"
		});
		BubbleRush.elements.gamescore.move(window.innerWidth - 20, 20);
		BubbleRush.elements.gamescore.fill('#43E68A');
		BubbleRush.elements.gamescore.filter(glow);

		function glow(add) {
			add.blend(add.source, add.gaussianBlur(2));
		}

	},



	newBubble: function(oldBubble) {
		var options = BubbleRush.game.options.levels[BubbleRush.level];


		if(options.bubblesNeeded <= BubbleRush.bubblesHit) {
			// Next level
			BubbleRush.level++;
			options = BubbleRush.game.options.levels[BubbleRush.level];
			BubbleRush.bubblesHit = 0;

			BubbleRush.draw.message(null, "Next level!")

			BubbleRush.elements.background.animate({duration: 10000, ease: '<>'}).move(0, -window.innerHeight * BubbleRush.level);

			if(options.extra !== undefined) BubbleRush.game.addExtra(options.extra, options);
		}



		var radius = 50 + (150 / options.totalBubbles);
		var matrixString, matrix, thisBubble, activeBubbles, bubblePositions, pos, xDiff, yDiff, minimumDistance;

		while (BubbleRush.visibleBubbles < options.totalBubbles || oldBubble !== undefined) {

		 	activeBubbles = BubbleRush.layer.bubbles.node.childNodes;[0]
		 	bubblePositions = [];

		 	pos = calculatePos();

			for (var i = 0; i < activeBubbles.length; i++) {
			 	matrixString = activeBubbles[i].attributes.transform.nodeValue;
				matrixString = matrixString.replace("matrix(", "").replace(")", "");
			 	matrix = new SVG.Matrix(matrixString);
			 	thisBubble = matrix.extract();
				bubblePositions.push({x: thisBubble.x + (options.bubbleSize/2), y: thisBubble.y + (options.bubbleSize/2)});
			}

			bubblePositions.shift();

			for (var i = 0; i < bubblePositions.length; i++) {
				tries = 0;
				placed = false;

				while(!placed) {
					tries ++;
					if(Math.abs(bubblePositions[i].x - pos.x) < options.minimumDistance / (0.25*tries) && Math.abs(bubblePositions[i].y - pos.y) < options.minimumDistance / (0.25*tries)) {

						// te dichtbij
						pos = calculatePos();

					} else {

						// prima plek
						placed = true;

					}
				}
			}

			// Create a new bubble
			BubbleRush.controller.bubble({
				x: pos.x,
				y: pos.y,
				radius: options.bubbleSize,
				fill: options.bubbleColor,
				levelOptions: options
			}, oldBubble);
			if(oldBubble !== undefined) oldBubble = undefined;
		}

		function calculatePos() {
			return {
				x: 0 + Math.random() * (BubbleRush.helpers.getWindowSize().width - 120),
				y: 0 + Math.random() * (BubbleRush.helpers.getWindowSize().height - 120)
			};
		}
	},

	addExtra: function(extra, options) {
		setTimeout(function () {
			for (var i = 0; i < extra.length; i++) {
				console.log(extra[i] + " added");
				if(extra[i] === "life") {
					BubbleRush.controller.bubble({
						x: 5 + Math.random()*90 + "%",
						y: 5 + Math.random()*90 + "%",
						radius: 55,
						countMe: false,
						fill: "#D90368",
						layer: "interface",
						levelOptions: options,
						type: extra[i]
					});
				}
			}
		}, 3000);
	}
}
