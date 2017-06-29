document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	
	let form = document.forms.firstForm; 

	DomNode.validateForm(firstForm, [
		{login: 'text'},
		{age: 'digits'},
		{pass: 'textDigits'}
	]);

});

