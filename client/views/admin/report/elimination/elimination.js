Template.eliminationReport.onCreated(function() {
	this.subscribe('fantasys');
	this.subscribe('swimwears');
	this.subscribe('gowns');
	this.subscribe('preliminaries');
});

Template.eliminationReport.helpers({
	candidates: function() {
		var candidate = [];
		Candidates.find().forEach(function(e) {
			var fantasy = 0;
			Fantasys.find({candidateId: e._id}).forEach(function(e) {
				fantasy = fantasy + parseFloat(e.total);
			});

			var swimwear = 0;
			Swimwears.find({candidateId: e._id}).forEach(function(e) {
				swimwear = swimwear + parseFloat(e.total);
			});

			var gown = 0;
			Gowns.find({candidateId: e._id}).forEach(function(e) {
				gown = gown + parseFloat(e.total);
			});

			var preliminary = 0;
			Preliminaries.find({candidateId: e._id}).forEach(function(e) {
				preliminary = preliminary + parseFloat(e.total);
			});

			fantasy = typeof fantasy != 'undefined' ? fantasy : '';
			swimwear = typeof swimwear != 'undefined' ? swimwear : '';
			gown = typeof gown != 'undefined' ? gown : '';
			preliminary = typeof preliminary != 'undefined' ? preliminary : '';

			var f = fantasy != '' ? parseFloat(fantasy) : 0;
			var s = swimwear != '' ? parseFloat(swimwear) : 0;
			var g = gown != '' ? parseFloat(gown) : 0;
			var p = preliminary != '' ? parseFloat(preliminary) : 0;

			var total = f + s + g + p;

			fantasy = fantasy != '' ? parseFloat(fantasy).toFixed(2) : '';
			swimwear = swimwear != '' ? parseFloat(swimwear).toFixed(2) : '';
			gown = gown != '' ? parseFloat(gown).toFixed(2) : '';
			preliminary = preliminary != '' ? parseFloat(preliminary).toFixed(2) : '';

			candidate.push({
				number: e.number,
				name: e.fname + ' ' + e.mname + ' ' + e.lname,
				fantasy: fantasy,
				swimwear: swimwear,
				gown: gown,
				preliminary: preliminary,
				total: parseFloat(total).toFixed(2)
			});

		});
		
		return candidate;
	}
});