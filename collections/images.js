Images = new FS.Collection('images', {
	stores: [new FS.Store.FileSystem('photos')],
	filter: {
		allow: {
			contentTypes: ['image/*'],
			extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
		}
	}
});

Images.allow({
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
	},
	download: function(userId, doc) {
		if(userId)
			return true;
		else
			return false;
	}
});

Meteor.methods({
	deleteImage: function(doc) {
		Images.remove({'metadata.owner': doc._id});
	}
});