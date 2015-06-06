module.exports = function(app, spotifyWebApi){

	var spotify = new spotifyWebApi({
		clientId: '<your_id_here>',
		clientSecret: '<your_secret_here>'
	});
	// spotify.setAccessToken('BQD0ZfwCEpH4-U1jOaUtbBVt0yxQvJV-dVGDoPBdbBL5GH0edRhnCcZPm3JP3rQAZ4zdH6Qh3sSDBj80b0_EjbWKPUp9aqPeS6h1zBeCQtSeBng3heRnb2H8zn-wIRoTR6GSjYgBdeIrLMxSlCxvj6nbX9nWyvdXtnpeyEWv68RKGjfeR0avGSX17uXN');
	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.post('/relatedArtists', function(req, res){
		// console.log(req.body.artist_band);
		var relatedArtists = [];
		spotify.searchArtists(req.body.artist_band)
		.then(function(data){
			var artistId = data.body.artists.items[0].id;
			spotify.getArtistRelatedArtists(artistId)
			.then(function(data2){
				if(data2.body.artists.length){
					console.log('I\'ve got ' + data2.body.artists.length + ' similar artists');
					// console.log(data2.body.artists);
					for(var i = 0; i < data2.body.artists.length; i++){
						relatedArtists.push(data2.body.artists[i].name);
						// console.log(relatedArtists);
						
					}
					console.log(relatedArtists);
					res.render('related_artists.ejs', {
						relatedArtists: relatedArtists
					});
				}else{
					// Perform a search by genre
					console.log('Couldn\'t find any related artist');
				}
			}, function(err){
				console.log(err);
				// res.render('error.ejs');
			});
		
		}, function(err){
			console.log(err);
			// res.render('error.ejs');
		});
	});
}