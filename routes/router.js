module.exports = function(app, spotifyWebApi){

	var spotify = new spotifyWebApi({
		clientId: '9ab7d2b02b3a4e2bb07b02ff0bf6da61',
		clientSecret: 'b8e0044da9d24edd9d1d3d85c814112f'
	});
	
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
					console.log(data2.body);
					console.log('I\'ve got ' + data2.body.artists.length + ' similar artists');
					console.log(data2.body.artists[0].id);
					for(var i = 0; i < data2.body.artists.length; i++){
						relatedArtists.push(data2.body.artists[i].name);
						// console.log(relatedArtists);
						
					}

					data2.body.artists.forEach(function(obj){
						spotify.getArtistTopTracks(obj.id, 'BR')
						.then(function(data3){
							console.log('============================');
							console.log(obj.name);
							data3.body.tracks.forEach(function(track, index){

								console.log((index+1) + '. ' + track.name);
							});
						});
						
					});
					// console.log(relatedArtists);
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

	app.get('/topTracksArtist', function(req, res){
		spotify.getArtistTopTracks('5IHkB1o1qNXwLPe55WWTEH', 'BR')
		.then(function(data){
			data.body.tracks.forEach(function(track, index){
				console.log((index+1) + '. ' + track.name + ' (popularity is ' + track.popularity + ')');
			});
			res.end();
		});
	});


	app.get('/generatePlaylist', function(req, res){
		spotify.authorizationCodeGrant(authorizationcode)
	});
}