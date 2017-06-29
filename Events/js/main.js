document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	const log = console.log;
	let btnMsg = document.getElementById('btn-msg');

	// Задача 1
	function getTextFromBtn() {
		alert(this.textContent);
	}

	btnMsg.addEventListener('click', getTextFromBtn);

	// Задача 2
	function changeBackground(e) {
		if (e.type === 'mouseover') {
			this.style.background = 'red';
		} else if (e.type === 'mouseout') {
			this.style.background = '';
		}
	}

	btnMsg.addEventListener('mouseover', changeBackground);
	btnMsg.addEventListener('mouseout', changeBackground);

	
	// Задача 3
	let tag = document.getElementById('tag');
		innerText = tag.innerHTML;

	function getTarget(e) {
		tag.innerHTML = innerText;
		tag.innerHTML += ` Вы нажали на узел ${e.target.tagName}`;
	}
	document.addEventListener('click', getTarget);

	// Задача 4
	let btnGenerate = document.getElementById('btn-generate'),
		ul = document.querySelector('ul'), 
		allLi = document.querySelectorAll('li');

	let customEvent = new CustomEvent('customEvent', {detail: {counter: allLi.length + 1}});	

	function addNewItem() {
		let li = document.createElement('li');
		let text = document.createTextNode(`Item ${customEvent.detail.counter++}`);
		li.appendChild(text);
		ul.appendChild(li);
	} 

	ul.addEventListener('customEvent', addNewItem);
	btnGenerate.addEventListener('click', function(){ul.dispatchEvent(customEvent)});

	// Задача 5
	let node = new DomNode(btnGenerate);

	node.getInfo();

	node.event('click'); // после обновления страницы добавится один Item и выполнится задача 3
	node.event('click', function(){alert('Click on btn-generate!')});
	node.event('mouseover', function(){log('Mouseover on btn-generate!')});

});

