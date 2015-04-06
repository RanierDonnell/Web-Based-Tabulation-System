Meteor.users.allow({
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
	createSystemUser: function(options) {
		return Accounts.createUser({
			username: options.username,
			password: options.password,
			profile: {
				fname: options.name,
				lname: options.name,
				roles: ['judge'],
				pass: options.password,
				deleted: 0
			}
		});
	},
	updateSystemUser: function(options) {
		return Meteor.users.update(options._id, {
			username: options.username,
			password: options.password,
			profile: {
				fname: options.name,
				lname: options.name,
				roles: ['judge'],
				pass: options.password,
				deleted: 0
			}
		});
	},
	deleteSystemUser: function(options) {
		return Meteor.users.remove(options._id);
	}
});