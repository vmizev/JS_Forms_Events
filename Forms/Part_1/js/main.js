document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	
	let form = document.forms.firstForm,				
		inputs = document.querySelectorAll('input'),
		labels = document.querySelectorAll('label'),
		error = document.querySelector('.error'); 

	form.addEventListener('submit', validateForm);
  
	function validateForm(e) {
		let value,
			count = 0,
			text,
			isValid = true,
			notValidArr = [];
		
		for (let i = 0; i < inputs.length; i++) {
			value = inputs[i].value;
			  
			if (value.indexOf(' ') !== -1 || !value) {
				text = labels[i].textContent;
				notValidArr.push(text.substring(0, text.length));
				inputs[i].style.borderColor = 'red';
				++count;
				continue;
			}
			
			switch (inputs[i].name) {
				case 'userName': 
				case 'userSurname': handler(inputs[i], i, nameValidate(value)); break;
				case 'userAge': handler(inputs[i], i, ageValidate(value)); break;
				case 'userEmail': handler(inputs[i], i, emailValidate(value)); break;
			}
		}
		
		if (count > 0) {
			isValid = false;
		}
		
		function handler(input, i, isFieldValid) {
			let text;
			if (!isFieldValid) {				
				text = labels[i].textContent;
				notValidArr.push(text.substring(0, text.length));
				input.style.borderColor = 'red';
				isValid = false;
			} else {
				input.style.borderColor = '';
			}
		}
		
		function nameValidate(str) {
			return str[0] === str[0].toUpperCase() && str.length >= 2;      
		}
		
		function ageValidate(n) {
			age = +n;
			return age && age > 18 && age < 100 ;
		}
		
		function emailValidate(email) {
			 let pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			 return pattern.test(email);
		}
		
		if (!isValid) {
			e.preventDefault();
			error.innerHTML = 'Некорректно заполнены поля: ';
			for (let i = 0, max = notValidArr.length; i < max; i++) {
				error.innerHTML += ` ${notValidArr[i]};`;
			}
		} else {
			e.preventDefault();
			error.innerHTML = '';
			return true;
		}
	}

});

