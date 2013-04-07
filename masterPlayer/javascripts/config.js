//Global config
//=============
var CONFIG = {
	hostname: ''
};

var masterPlayer = {};

//Load resources
//==============

//Mandatory
yepnope([
	'javascripts/vendor/jquery.js',
	'javascripts/vendor/jquery.jplayer.min.js',
	'javascripts/vendor/jplayer.playlist.min.js'
]);

//Core
yepnope({
	load: 'javascripts/masterPlayer.js',
	callback: function(){
		masterPlayer.playerInit();
	}
});

//Have connection?
yepnope({
	test: navigator.onLine,
	yep: {
		'socket': 'javascripts/vendor/socket.io.js',
		'qrcodecore': 'javascripts/vendor/qrcode.js',
		'jqueryqrcode': 'javascripts/vendor/jquery.qrcode.js'
	},
	callback: {
		'socket': function(){
			masterPlayer.socketInit();
		},
		'jqueryqrcode': function(){
			masterPlayer.qrCodeInit();
		}
	}
});

//Have FileReader?
yepnope({
	test: true,
	yep: ['javascripts/masterPlayer.js'],
	callback: function(){
		masterPlayer.fileReaderInit();
	}
});