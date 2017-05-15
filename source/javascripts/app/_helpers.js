var BubbleRush = BubbleRush || {};

BubbleRush.helpers = {

	getRunningTime: function() {
		return Math.round(new Date().getTime()/1000) - BubbleRush.startedAt;
	},

	randomFromArray: function(arr) {
		return arr[Math.floor(Math.random() * arr.length)];

	},

	// This returns the size of the browser
	getWindowSize: function(){
		return {
			width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
			height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
		};
	},

	isTouchDevice: function() {

		return (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent));
	},

	percentageToValue: function(percentage, max) {
		if(typeof(percentage) === "string") {
				// als het een string is...
				percentage = percentage.replace("%", "");
				return percentage * (max/100);

			} else if(percentage <= 1) {
				// als het een nummer onder 1 is
				percentage = percentage * 100;
				return percentage * (max/100);
			} else {
				// zo niet.. gewoon returnen
				return percentage;
		}


	}

}
