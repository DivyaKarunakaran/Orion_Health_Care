
    $('#search').keyup(function() {
	var searchField = $('#search').val();
	var myExp = new RegExp(searchField, "i");
	$.getJSON('data.json', function(data) {
		var output = '<ul class="searchresults">';
		$.each(data, function(key, val) {
			if (val.name.search(myExp) != -1) {
				output += '<li>';
				output += '<h4>'+ val.name +'</h4>';
				
		/*		output += '<p>'+ val.email +'</p>';
				output += '<p>'+ val.phone +'</p>';
                output += '<p>'+ val.website +'</p>';*/
				output += '</li>';
			}
		});
		output += '</ul>';
		$('#update').html(output);
	}); //get JSON & Search
});




