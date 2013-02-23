Animalese = {
	letters: {},
	currentInterval: null,
	defaultDelay: 90, // ms

	// load letters out of a directory with a given extension and hope the browser likes that one
	load: function(dir, extension) {
		// TODO be less silly
		var chars = 'abcdefghijklmnopqrstuvwxyz';
		this.letters = {};
		for (var i = 0; i<chars.length; i++) {
			var char = chars[i];
			var filename = [dir, char + "." + extension].join("/");
			var audio = new Audio(filename);
			this.letters[char] = audio;
		}
	},

	// stop whatever is currently being said
	stop: function() {
		if (this.currentInterval != null) {
			window.clearInterval(this.currentInterval);
		}
	},

	// I don't advise anyone actually call this function
	say: function(text, delay) {
		// can only say one thing at once
		this.stop();

		var actualDelay = delay ? delay : this.defaultDelay

		var i = 0;
		var self = this;
		this.currentInterval = window.setInterval(function() {
				if (i < text.length) {
					var char = text[i];
					self.utter(char); // be
					i += 1;
				} else {
					self.stop();
				}
			}, actualDelay);
	},

	// say a single character, or nothing at all if the character isn't one we know
	utter: function(rawChar) {
		var char = rawChar.toLowerCase();
		if (char in this.letters) {
			// playing a clone lets more than one happen at the same time
			var audio = this.letters[char].cloneNode();
			audio.play();
		}
	}
};
