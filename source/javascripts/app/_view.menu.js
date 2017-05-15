var BubbleRush = BubbleRush || {};
BubbleRush.view = BubbleRush.view || {};


BubbleRush.view.menu = function(again) {

	var text = "Begin";
	if(again !== undefined) text = "Again";

	BubbleRush.elements.startBtn = BubbleRush.draw.bubble({
		x: "50%",
		y: "60%",
		radius: 120,
		fill: '#00FFFB',
		text: text,
		layer: "interface"
	});

	// Add the background
	BubbleRush.draw.background();

	BubbleRush.elements.startBtn.scale(0.1).opacity(0).animate({duration: 500, ease: '>', delay: 500}).scale(1).opacity(1);

	BubbleRush.elements.startBtn.on(BubbleRush.touchEvent, function() {
		BubbleRush.elements.startBtn.animate({duration: 100, ease: '>'}).scale(0.1).opacity(0).after(function(){
			this.stop();
			this.off();
			this.remove();
		});
		BubbleRush.game.init();
	});

}
