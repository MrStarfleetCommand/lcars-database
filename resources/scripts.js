import {txtToHtml, htmlToTxt, fetchSourceText} from '/parser.js';
(async () => {
	const waveformWrapper = document.createElement('div');
	const waveform = document.createElement('div');
	waveformWrapper.classList.add('waveform-wrapper');
	waveform.classList.add('waveform');

	for (let i = 0; i < 15; i++){
		const waveformSegment = document.createElement('div');
		waveformSegment.classList.add('waveform-segment');
		waveform.append(waveformSegment);
	}

	waveformWrapper.append(waveform);
	document.body.append(waveformWrapper);

	const numberOfPanels = Math.round((screen.height - 5) / 130);
	const digits = Math.max(2, String(numberOfPanels).length);
	const blues = ['light-blue', 'dark-blue'];
	const grays = ['light-gray', 'dark-gray'];

	for (let i = 0; i < numberOfPanels; i++){
		const panelOne = document.createElement('div');
		const panelTwo = document.createElement('div');
		const prefix = String(i + 1).padStart(digits, 0);
		let paletteOne;
		let paletteTwo;

		if (i < 2){
			paletteOne = blues;
			paletteTwo = blues;
		} else if (i === 2){
			paletteOne = blues;
			paletteTwo = ['light-blue', 'light-gray'];
		} else if (i === 3){
			paletteOne = ['dark-blue', 'light-gray'];
			paletteTwo = blues;
		} else if (i % 7 === 1 || i % 7 === 3){
			paletteOne = grays;
			paletteTwo = blues;
		} else if (i % 7 === 2 || i % 7 === 4 || i % 7 === 5){
			paletteOne = blues;
			paletteTwo = blues;
		} else if (i % 7 === 6){
			paletteOne = blues;
			paletteTwo = grays;
		} else if (!(i % 7)){
			paletteOne = grays;
			paletteTwo = grays;
		}

		const colorOne = paletteOne[r(paletteOne.length)];
		const colorTwo = paletteTwo[r(paletteTwo.length)];

		panelOne.classList.add(colorOne, 'panel', 'box-with-label', 'panel-left');
		panelTwo.classList.add(colorTwo, 'panel', 'box-with-label', 'panel-right');
		panelOne.innerText = i === 0 ? 'LCARS 40274' : prefix + '-' + r(10) + r(10) + r(10) + r(10) + r(10) + r(10);
		panelTwo.innerText = i === 0 ? 'LCARS 40274' : prefix + '-' + String(r(1000000)).padStart(6, 0);
		document.body.append(panelOne, panelTwo);
	}

	hideExcessPanels();
	addEventListener('resize', hideExcessPanels);

	const siteHeading = document.createElement('h1');
	siteHeading.innerText = 'LCARS Database';
	document.body.append(siteHeading);

	const cascade = document.createElement('table');
	cascade.classList.add('cascade');

	for (let r = 0; r < 7; r++){
		const row = document.createElement('tr');
		for (let c = 0; c < 35; c++){
			const cell = document.createElement('td');
			let n;

			if (r(100) < 5 || c === 1){
				n = '';
			} else if (r(100) < 40){
				n = String(r(10000000));
			} else {
				n = String(r(1000));
			}

			cell.innerHTML = n;
			row.append(cell);
		}
		cascade.append(row);
	}

	document.body.append(cascade);

	const header1 = document.createElement('a');
	const header2 = document.createElement('a');
	const header3 = document.createElement('a');
	const header4 = document.createElement('a');

	header1.classList.add('button', 'box-with-label', 'header-one', 'dark-blue');
	header2.classList.add('button', 'box-with-label', 'header-two', 'light-blue');
	header3.classList.add('button', 'box-with-label', 'header-three', 'red');
	header4.classList.add('button', 'box-with-label', 'header-four', 'light-gray');
	header1.href = '/lcars-database/';
	header2.href = '/lcars-database/timeline/';
	header3.href = '/lcars-database/trek-analyzed/';
	header4.href = '/lcars-database/trek-lore/';
	header1.addEventListener('click', beep0);
	header2.addEventListener('click', beep0);
	header3.addEventListener('click', beep0);
	header4.addEventListener('click', beep0);
	header1.append('Home');
	header2.append('Timeline');
	header3.append('Trek Analyzed');
	header4.append('Trek Lore');

	document.body.append(header1, header2, header3, header4);

	const barOne = document.createElement('div');
	const barTwo = document.createElement('div');
	const barBreak = document.createElement('div');
	const barContinuedOne = document.createElement('div');
	const barContinuedTwo = document.createElement('div');
	const marker = document.createElement('div');

	barOne.classList.add('bar', 'number-one', 'dark-blue');
	barTwo.classList.add('bar', 'number-two', 'dark-blue');
	barBreak.classList.add('bar-break', 'light-gray');
	barContinuedOne.classList.add('bar-continued', 'number-one', 'light-gray');
	barContinuedTwo.classList.add('bar-continued', 'number-two', 'light-blue');
	marker.classList.add('marker');

	document.body.append(barOne, barTwo, barBreak, barContinuedOne, barContinuedTwo, marker);
	document.body.innerHTML += `
<div class="button box-with-label sidebar-1 left-facing red" onclick="beep0()">03-975683</div>
<div class="button box-with-label sidebar-2 left-facing light-gray" onclick="beep0()">04-765466</div>
<div class="button box-with-label sidebar-3 left-facing dark-blue" onclick="beep0()">05-224353</div>
<div class="button box-with-label sidebar-4 square border-button" onclick="beep2()">03-975683</div>
<div class="button box-with-label sidebar-5 square border-button" onclick="beep2()">04-765466</div>
<div class="button box-with-label sidebar-6 square border-button-cyan" onclick="beep1()">05-224353</div>
<div class="version-info">
	<ul>
		<li>Operating Version: v104.04.720</li>
		<li>Last Updated: 2391-01-01T19:54:17Z (68024.71)</li>
		<li>Latest Version: v118.77.022</li>
		<li>Latest Release: 2405-07-20T22:17:40Z (82566.00)</li>
		<li>Current Operational Load: 6 Kiloquads</li>
	</ul>
</div>
<div class="button box-with-label sidebar-7 left-facing red blink-slow" onclick="beep0()">03-975683</div>
<div class="button box-with-label sidebar-8 left-facing light-blue blink-fast" onclick="beep0()">04-765466</div>
<div class="button box-with-label sidebar-9 left-facing dark-gray" onclick="beep0()">05-224353</div>
<div class="button box-with-label sidebar-10 right-facing light-gray" onclick="beep0()">03-975683</div>
<div class="button box-with-label sidebar-11 right-facing red" onclick="beep0()">04-765466</div>
<div class="button box-with-label sidebar-12 right-facing dark-blue" onclick="beep0()">05-224353</div>
<a href="/lcars-database/legalities.html" class="left-facing copyrights button box-with-label red" onclick="beep1()">Legalities</a>`;

	const contentArea = document.createElement('div');
	const pageHeading = document.createElement('h2');
	const parserOutput = document.createElement('div');
	const sourceText = await fetchSourceText();

	pageHeading.innerText = document.title;
	parserOutput.id = 'parser-output';
	parserOutput.append(txtToHtml(sourceText));
	contentArea.classList.add('content-area', 'scrollbox');
	contentArea.append(pageHeading, parserOutput);
	document.body.append(contentArea);

	function beep0(){
		const beepZero = new Audio('/lcars-database/resources/beep-0.mp3');
		beepZero.play();
	}

	function beep1(){
		const beepOne = new Audio('/lcars-database/resources/beep-1.mp3');
		beepOne.play();
	}

	function beep2(){
		const beepTwo = new Audio('/lcars-database/resources/beep-2.mp3');
		beepTwo.play();
	}

	function stardateCalculator(selector){
		document.querySelectorAll(selector).forEach(stardate => {
			const date = selector === '.stardate' ? new Date(stardate.getAttribute('data-date')).getTime() : new Date().getTime();
			stardate.innerHTML = Math.round(Math.log(date + 432043200000000000000) / Math.log(1.0000001));
		});
	}

	stardateCalculator('.stardate');
	stardateCalculator('.currentStardate');
	setInterval(stardateCalculator, 1000, '.currentStardate');

	function r(i){
		return Math.floor(Math.random() * i);
	}

	function hideExcessPanels(){
		const wantedPanelCount = Math.round((innerHeight - 5) / 130);
		const wantedPanels = document.querySelectorAll(`.panel:not(:nth-child(${wantedPanelCount}) ~ div)`);
		const excessPanels = document.querySelectorAll(`.panel:nth-child(${wantedPanelCount}) ~ div`);

		wantedPanels.forEach(panel => panel.classList.remove('hidden'));
		excessPanels.forEach(panel => panel.classList.add('hidden'));
	}
})();
