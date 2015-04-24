Settings = new Mongo.Collection('settings');

Settings.allow({
	insert: function(userId, doc) {
		if(userId)
			return true;
		else
			return false;
	},
	update: function(userId, doc) {
		if(userId)
			return true;
		else
			return false;
	}
});

Meteor.methods({
	addSetting: function(doc) {
		check(doc.title, String);
		check(doc.top, String);

		return Settings.insert(doc);
	},
	editSetting: function(doc) {
		check(doc._id, String);
		check(doc.title, String);
		check(doc.top, String);

		return Settings.update(doc._id, {
			$set: {
				title: doc.title,
				top: doc.top
			}
		});
	}
});