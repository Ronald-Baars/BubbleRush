var BubbleRush = BubbleRush || {};

BubbleRush.draw = {

	bubble: function(options) {

		// Create a group
		if(options.layer !== undefined) {
			var bubble = BubbleRush.layer[options.layer].group();
		} else {
			var bubble = BubbleRush.layer.bubbles.group();
		}

		var color = options.fill;
		var glowSize = options.radius/6;

		// Shine
		var gradient1 = BubbleRush.stage.gradient('radial', function(stop) {
			stop.at({ offset: 0, color: '#ffffff', opacity: 0.25 });
			stop.at({ offset: 0.3, color: '#ffffff', opacity: 0 });
		})

		// Darken
		var gradient2 = BubbleRush.stage.gradient('radial', function(stop) {
			stop.at({ offset: 0, color: '#ffffff', opacity: 0.32252038 });
			stop.at({ offset: 0.4, color: '#bcbcbc', opacity: 0 });
			stop.at({ offset: 1, color: '#000000', opacity: 0.477779665 });
		});

		// Glow
		var gradient3 = BubbleRush.stage.gradient('radial', function(stop) {
			stop.at({ offset: 0.6, color: "#ffffff", opacity: 0.2 });
			stop.at({ offset: 0.8, color: color, opacity: 0.1 });
			stop.at({ offset: 1, color: color, opacity: 0 });
		});

		gradient1.from(0.24, 0.24).to(0.1, 0.1);
		gradient2.from(0.2, 0.2).to(0.5, 0.5);

		// Add the circle with the background color
		bubble.circle(options.radius + glowSize*2).attr({fill: gradient3}).x(-glowSize).y(-glowSize).addClass("glow");
		bubble.circle(options.radius).attr({ fill: color}).addClass("color");
		bubble.circle(options.radius).attr({ fill: gradient2});
		bubble.circle(options.radius -2).stroke({ color: '#000000', opacity: 0.1, width: 1 }).attr({fill: "transparent"}).x(1).y(1);
		bubble.circle(options.radius).attr({ fill: gradient1});

		// Add text if neccecary
		if(options.text !== undefined) {
			text = bubble.text(options.text)
			text.font({
				family: "comfortaa",
				anchor: "middle",
				size: 20,
				fill: "#000",
				opacity: 0.4
			});
			text.move(options.radius/2, (options.radius/2) - 10);
		}

		var x = BubbleRush.helpers.percentageToValue(options.x, BubbleRush.helpers.getWindowSize().width) + glowSize;
		var y = BubbleRush.helpers.percentageToValue(options.y, BubbleRush.helpers.getWindowSize().height) + glowSize;

		bubble.cx(x).cy(y);

		return bubble;
	},

	clickEffect: function(x, y, options, bubble) {

		var duration = 500;


		var scale = options.radius / 183;

		var effectContainer = BubbleRush.layer.background.group().addClass("effect");

		var ring1 = effectContainer.group().move(-14, -14).stroke({ color: options.fill, opacity: 1, width: 1 }).attr({fill: "transparent"});
		var ring2 = effectContainer.circle(155).stroke({ color: options.fill, opacity: 0.8, width: 3 }).attr({fill: "transparent"})
		var ring3 = effectContainer.group().move(15, 15).stroke({ color: options.fill, opacity: 0.5, width: 1 }).attr({fill: "transparent"});

		ring1.clear();

		ring1.path('M1.21505267,182.492054 M90.9920541,92.7150527 C90.3469947,142.008549 50.5085486,181.846995 1.21505275,182.492054').rotate(90);
		ring1.path('M92.7150527,90.9920541 M182.492054,1.21505267 C181.846995,50.5085486 142.008549,90.3469947 92.7150528,90.992054').rotate(-90);

		ring3.path('M62.502809,122.055461 M122.055461,62.502809 C121.4141,95.104616 95.104616,121.4141 62.5028093,122.05546');
		ring3.path('M1.21908805,60.7717397 M60.7717397,1.21908805 C60.130379,33.8208951 33.8208951,60.130379 1.21908835,60.7717394').rotate(180);

		var x = BubbleRush.helpers.percentageToValue(options.x, BubbleRush.helpers.getWindowSize().width);
		var y = BubbleRush.helpers.percentageToValue(options.y, BubbleRush.helpers.getWindowSize().height);

		effectContainer.cx(x).cy(y);

		ring1.animate({duration: duration, ease: '>'}).rotate(180);
		ring3.animate({duration: duration, ease: '>'}).rotate(-180);
		effectContainer.scale(scale).animate({duration: duration, ease: '>'}).scale(scale + 0.4).opacity(0).afterAll(function() {
			this.stop();
			this.off();
			this.remove();
		});
	},



	updateScore: function(points) {
		// update the score
		BubbleRush.score = BubbleRush.score + points;

		// update the interface
		BubbleRush.elements.gamescore.text(String(BubbleRush.score));
	},






	updateLives: function() {
		if(BubbleRush.elements.lives === undefined) BubbleRush.elements.lives = BubbleRush.layer.interface.group();

		var total = 0;
		while (BubbleRush.elements.lives[total] !== undefined) total++;

		if(BubbleRush.lives < total) {
			BubbleRush.elements.lives[total-1].animate().scale(4).opacity(0).afterAll(function() {
				this.stop();
				this.off();
				this.remove();
			});
			delete BubbleRush.elements.lives[total-1];
		}

		for (var i = 0; i < BubbleRush.lives; i++) {
			if(BubbleRush.elements.lives[i] === undefined) {
				var x = 17 + ((i) * 12);
				BubbleRush.elements.lives[i] = BubbleRush.draw.bubble({
					x: x,
					y: 17,
					radius: 15,
					fill: "#d90368",
					layer: "interface"
				});
			}
		}



	},






	background: function() {
		BubbleRush.elements.background = BubbleRush.layer.background.group();

		var gradient = BubbleRush.stage.gradient('linear', function(stop) {
			stop.at(0, "#021E32");
			stop.at(0.136937978, "#02253D");
			stop.at(0.349170918, "#5A0252");
			stop.at(0.625936703, "#8F002B");
			stop.at(0.793785874, "#BF0000");
			stop.at(1, "#C04300");
		});

		gradient.from(0, 0).to(0, 1)

		BubbleRush.elements.background.rect().attr({
			fill: gradient,
			x: 0,
			y: 0,
			width: "100%",
			height: "1000%"
		});


		// Create a canvas that will temporairly hold the stars
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');
		var x, y, r;

		// Make it the same size as the background
		canvas.height = BubbleRush.helpers.getWindowSize().height * 5;
		canvas.width = BubbleRush.helpers.getWindowSize().width;

		// Draw the stars
		for (var i = 0; i < 1600; i++) {
			x = Math.random() * canvas.width;
			y = Math.random() * canvas.height;
			r = Math.random() * ((1 - (y / canvas.height)) * 1.5);
			ctx.beginPath();
			ctx.fillStyle="#ffffff";
			ctx.globalAlpha = 1 - (y/canvas.height);
			ctx.arc(x, y, r, 0, 2 * Math.PI);
			ctx.fill();
		}

		// Convert it to a data:URL and add it to the SVG
		var image = BubbleRush.elements.background.image(canvas.toDataURL());
		image.size(canvas.width, canvas.height);

	},






	message: function(text1, text2, text3) {


		if (!BubbleRush.messageVisible) {
			BubbleRush.messageVisible = true;

			// Create a group
			BubbleRush.elements.message = BubbleRush.layer.interface.group();

			if(text1) {
				 BubbleRush.elements.messageTxt1 = BubbleRush.elements.message.text(String(text1));
				 BubbleRush.elements.messageTxt1.font({
	 				family: "comfortaa",
	 				anchor: "middle",
	 				size: 126,
	 				fill: "#ffd131",
	 			});
				BubbleRush.elements.messageTxt1.move("50%", 0);
			}
			if(text2) {
				BubbleRush.elements.messageTxt2 = BubbleRush.elements.message.text(String(text2));
				BubbleRush.elements.messageTxt2.font({
					family: "comfortaa",
					anchor: "middle",
					size: 38,
					fill: "#ffffff",
				});
				BubbleRush.elements.messageTxt2.move("50%", 116);
			}
			if(text3) {
				BubbleRush.elements.messageTxt3 = BubbleRush.elements.message.text(String(text3));
				BubbleRush.elements.messageTxt3.font({
					family: "comfortaa",
					anchor: "middle",
					size: 38,
					fill: "#ffffff",
				});
				BubbleRush.elements.messageTxt3.move("50%", 154);
			}

			// Add shadow and glow
			BubbleRush.elements.message.filter(shadow);
			BubbleRush.elements.message.filter(glow);

			BubbleRush.elements.message.y(80);

			BubbleRush.elements.message.scale(0.1).animate({duration: 200, ease: '>'}).scale(1);

			function shadow(add) {
				add.blend(add.source, add.offset(0, 0).in(add.sourceAlpha).gaussianBlur(24));
			}
			function glow(add) {
				add.blend(add.source, add.gaussianBlur(4));
			}

		} else {
			if(text1) BubbleRush.elements.messageTxt1.text(String(text1));
			if(text2) BubbleRush.elements.messageTxt2.text(String(text2));
			if(text3) BubbleRush.elements.messageTxt3.text(String(text3));
		}

		clearTimeout(BubbleRush.messageTimer);

		BubbleRush.messageTimer = setTimeout(function () {
			BubbleRush.messageVisible = false;
			BubbleRush.elements.message.animate({duration: 200, ease: '<'}).scale(0);
		}, 500);

	}
}
