//Helpers
//=======

//Local Storage
window.savedUserInfo = {
	//Get saved info as OBJECT
	get: function(Item, callback) {
		if(typeof chrome != 'undefined' && chrome.storage) {
			chrome.storage.local.get(Item, function(result){ 
				//Callback
				if(typeof callback == 'function') callback.call(this, result[Item]);
			});
		} else {
			var result = localStorage.getItem(Item) ? $.parseJSON(localStorage.getItem(Item)) : null;
			
			//Callback
			if(typeof callback == 'function') callback.call(this, result);
		}
	},

	//Save info in OBJECT
	set: function(Item, Info, callback){
		var obj = {};
		obj[Item] = Info;

		if(typeof chrome != 'undefined' && chrome.storage) {
			chrome.storage.local.set(obj, function(result){
				
				//Callback
				if(typeof callback == 'function') callback.call(this, result);
			});
		} else {
			//Remove item
			if(Info === null) {
				var result = localStorage.removeItem(Item);
			} 

			//Update item
			else {
				var result = localStorage.setItem(Item, stringify(Info));
			}
			
			//Callback
			if(typeof callback == 'function') callback.call(this, result);
		}

		return obj;
	}
};

//To Array Helper
window.toArray = function(list){return Array.prototype.slice.call(list || [], 0);};

//Reset saved user info
window.resetUserInfo = function(){
	savedUserInfo.set('playlist.entries', null);
	savedUserInfo.set('playlist.play', null);
	savedUserInfo.set('playlist.volume', null);
};
