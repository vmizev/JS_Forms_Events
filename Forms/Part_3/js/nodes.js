let DomNode = function(node) {
	this._node = node;
};

DomNode.prototype.getInfo = function() {
	let info = {
		nodeName: this._node.nodeName,
		children: (this._node.children.length) ? this._node.children.length : 0,
		parent: this._node.parentElement
	};
	console.log("Результат node.getInfo(): ", info);
};

DomNode.prototype.attr = function(name, value) {
	if (name == undefined) {
		console.log("Вызван node.attr() без аргументов! Введите одно или два значения!");
		return;
	}

	let isValue = (value == undefined) ? false : true;

	if (!isValue) {
		if (this._node.hasAttribute(name)) {
			console.log("Результат node.attr() с 1 аругментом:", this._node.getAttribute(name));
		}
	} else {
		this._node.setAttribute(name, value);
		console.log(`Результат node.attr() с 2 аругментами: name - ${name}, value - ${value}`);
	}
};

DomNode.prototype.text = function(value) {
	if (value == undefined) {
		console.log("Содержимое узла (вызов node.text() без аргументов) :", this._node.textContent);		
	} else {
		this._node.textContent = value;
	}
};

DomNode.prototype.append = function(html) {
	this._node.insertAdjacentHTML('beforeend', html);
	return this;
};

DomNode.prototype.prepend = function(html) {
	this._node.insertAdjacentHTML('afterbegin', html);
	return this;
};

DomNode.prototype.before = function(html) {
	this._node.insertAdjacentHTML('beforebegin', html);
	return this;
};

DomNode.prototype.after = function(html) {
	this._node.insertAdjacentHTML('afterend', html);
	return this;
};

DomNode.prototype.html = function(value) {
	if (value == undefined) {
		console.log("html-содержимое узла(вызов node.html() без аргументов): ", this._node.innerHTML);		
		return this._node.innerHTML;
		
	} else {
		this._node.innerHTML = value;
		console.log(`Новое значение узла(вызов node.html() с аргументом) - ${value}`)
	}
};

DomNode.prototype.getElement = function() {
	return this._node;
}

DomNode.prototype.event = function(eventName, callback) {
	let isCallback = (callback === undefined) ? false : true;

	if (eventName !== undefined && !isCallback) {
		let event = new Event(eventName, {bubbles: true});
		this._node.dispatchEvent(event);
		return;
	}

	if (eventName !== undefined && isCallback) {
		let event = new Event(eventName, {bubbles: true});
		this._node.addEventListener(eventName, callback);
	}
};

DomNode.validateForm = function(form, elements) {

	form.addEventListener('submit', validate);

	function validate(e) {
		let isValid = true,
			notValidArr = [],
			pattern;


		elements.forEach(function(element) {
			for (let key in element) {
				let input = form.elements[key],
					str = element[key];

				switch (str) {
					case 'text': 
						pattern = /^[A-ZА-Я][a-zа-я]{1,20}$/;
						inputValidate(input, pattern);
						break;
					
					case 'digits': 
						pattern = /^\d+$/;
						inputValidate(input, pattern);
						break;
					
					case 'textDigits': 
						pattern = /^[0-9A-Za-zА-Яа-я]+$/;
						inputValidate(input, pattern); 
						break;					
				}
			}
		});
		
		function inputValidate(input, pattern) {
			if (!pattern.test(input.value)) {
				notValidArr.push(input.name);
				isValid = false;				
				input.style.borderColor = 'red';
			} else {
				input.style.borderColor = '';
			}
		}

		if (!isValid) {
			e.preventDefault();
			let error;

			if (!document.getElementById('error')) {
				error = document.createElement('div');
				error.id = 'error';
				form.appendChild(error);
			} else {
				error = document.getElementById('error');
			}

			error.innerHTML = 'Неверно заполнены поля: ' ;

			for (let i = 0; i < notValidArr.length; i++) {
				error.innerHTML += `${notValidArr[i]}; `;
			}
		} else {
			e.preventDefault();
			error.innerHTML = '';				
			return false;
		}	  
	}
};