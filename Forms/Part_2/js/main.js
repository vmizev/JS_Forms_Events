document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	let log = console.log;
	
	let seasons = [
		{"лето" : "одень футболку и шорты"},
		{"осень" : "одень куртку и штаны"},
		{"зима" : "одень шубу и теплые штаны"},
		{"весна" : "одень ветровку и джинсы"}
	];

	let form = document.forms.firstForm,
		select = form.elements.seasons,
		input = form.elements.description;

	for (let i = 0; i < seasons.length; i++){

		for (let key in seasons[i]){
			let str = '';

			for (j = 0; j < key.length; j++){				
				j==0 ? str += key[j].toUpperCase() : str += key[j];
			}

			key = str;
			var createOption = new Option(key, key, false, false);			
		}

		select.appendChild(createOption);
	}

	select.addEventListener('change', function(e) {
		var currentSeason = seasons[select.selectedIndex - 1];

		for (let key in currentSeason) {
			input.value = currentSeason[key];
		}
	});
	
});

