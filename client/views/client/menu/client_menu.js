Template.clientMenu.onCreated(function() {
	this.subscribe('settings');
});

Template.clientMenu.helpers({
	setting: function() {
		return Settings.findOne();
	}
});