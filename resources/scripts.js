import {txtToHtml, htmlToTxt} from './parser.js';
(async () => {
	const sourcePage = `${location.pathname.replace(/\/+$/, '')}/index.html`.replace(/\.html(?:\/index\.html)?$/, '.txt');
	const txt = await (await fetch(sourcePage)).text();
	const contentArea = document.createElement('div');
	const pageHeading = document.createElement('h2');
	const parserOutput = document.createElement('div');
	const waveformWrapper = document.createElement('div');
	const waveform = document.createElement('div');
	const numberOfPanels = Math.round((screen.height - 5) / 130);
	const blues = ['light-blue', 'dark-blue'];
	const grays = ['light-gray', 'dark-gray'];
	const digits = Math.max(2, String(numberOfPanels).length);

	pageHeading.innerText = document.title;
	parserOutput.id = 'parser-output';
	parserOutput.innerHTML = txtToHtml(txt)
	contentArea.classList.add('content-area', 'scrollbox');
	contentArea.append(pageHeading);
	contentArea.append(parserOutput);
	waveformWrapper.classList.add('waveform-wrapper');
	waveform.classList.add('waveform');

	for (let i = 0; i < 15; i++){
		const waveformSegment = document.createElement('div');
		waveformSegment.classList.add('waveform-segment');
		waveform.append(waveformSegment);
	}

	waveformWrapper.append(waveform);
	document.body.append(waveformWrapper);

	for (let i = 0; i < numberOfPanels; i++){
		const panelOne = document.createElement('div');
		const panelTwo = document.createElement('div');
		const panelOneText = document.createElement('span');
		const panelTwoText = document.createElement('span');
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

		panelOne.classList.add(colorOne, 'panel', 'panel-left');
		panelTwo.classList.add(colorTwo, 'panel', 'panel-right');
		panelOneText.classList.add('margin');
		panelTwoText.classList.add('margin');
		panelOneText.innerText = i === 0 ? 'LCARS 40274' : prefix + '-' + r(10) + r(10) + r(10) + r(10) + r(10) + r(10);
		panelTwoText.innerText = i === 0 ? 'LCARS 40274' : prefix + '-' + String(r(1000000)).padStart(6, 0);
		panelOne.append(panelOneText);
		panelTwo.append(panelTwoText);
		document.body.append(panelOne);
		document.body.append(panelTwo);
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
	const header1Text = document.createElement('span');
	const header2Text = document.createElement('span');
	const header3Text = document.createElement('span');
	const header4Text = document.createElement('span');

	header1Text.classList.add('margin');
	header2Text.classList.add('margin');
	header3Text.classList.add('margin');
	header4Text.classList.add('margin');
	header1Text.append('Home');
	header2Text.append('Timeline');
	header3Text.append('Trek Analyzed');
	header4Text.append('Trek Lore');

	header1.classList.add('button', 'header-one', 'dark-blue');
	header2.classList.add('button', 'header-two', 'light-blue');
	header3.classList.add('button', 'header-three', 'red');
	header4.classList.add('button', 'header-four', 'light-gray');
	header1.href = '/lcars-database/';
	header2.href = '/lcars-database/timeline/';
	header3.href = '/lcars-database/trek-analyzed/';
	header4.href = '/lcars-database/trek-lore/';
	header1.addEventListener('click', beep0);
	header2.addEventListener('click', beep0);
	header3.addEventListener('click', beep0);
	header4.addEventListener('click', beep0);
	header1.append(header1Text);
	header2.append(header2Text);
	header3.append(header3Text);
	header4.append(header4Text);

	document.body.append(header1);
	document.body.append(header2);
	document.body.append(header3);
	document.body.append(header4);



	document.body.append(contentArea);

	document.body.innerHTML += `
<div class="bar number-one dark-blue"></div>
<div class="bar number-two dark-blue"></div>
<div class="bar-break light-gray"></div>
<div class="bar-continued number-one light-gray"></div>
<div class="bar-continued number-two light-blue"></div>
<div class="marker"></div>
<div class="button sidebar-1 left-facing red" onclick="beep0()"><span class="margin">03-975683</span></div>
<div class="button sidebar-2 left-facing light-gray" onclick="beep0()"><span class="margin">04-765466</span></div>
<div class="button sidebar-3 left-facing dark-blue" onclick="beep0()"><span class="margin">05-224353</span></div>
<div class="button sidebar-4 square border-button" onclick="beep2()"><span class="margin">03-975683</span></div>
<div class="button sidebar-5 square border-button" onclick="beep2()"><span class="margin">04-765466</span></div>
<div class="button sidebar-6 square border-button-cyan" onclick="beep1()"><span class="margin">05-224353</span></div>
<div class="version-info">
	<ul>
		<li>Operating Version: v104.04.720</li>
		<li>Last Updated: 2391-01-01T19:54:17Z (68024.71)</li>
		<li>Latest Version: v118.77.022</li>
		<li>Latest Release: 2405-07-20T22:17:40Z (82566.00)</li>
		<li>Current Operational Load: 6 Kiloquads</li>
	</ul>
</div>
<div class="button sidebar-7 left-facing red blink-slow" onclick="beep0()"><span class="margin">03-975683</span></div>
<div class="button sidebar-8 left-facing light-blue blink-fast" onclick="beep0()"><span class="margin">04-765466</span></div>
<div class="button sidebar-9 left-facing dark-gray" onclick="beep0()"><span class="margin">05-224353</span></div>
<div class="button sidebar-10 right-facing light-gray" onclick="beep0()"><span class="margin">03-975683</span></div>
<div class="button sidebar-11 right-facing red" onclick="beep0()"><span class="margin">04-765466</span></div>
<div class="button sidebar-12 right-facing dark-blue" onclick="beep0()"><span class="margin">05-224353</span></div>
<a href="/lcars-database/legalities.html" class="left-facing copyrights button red" onclick="beep1()"><span class="margin">Legalities</span></a>`;

	const beepZero = new Audio('/lcars-database/resources/beep-0.mp3');
	const beepOne = new Audio('/lcars-database/resources/beep-1.mp3');
	const beepTwo = new Audio('/lcars-database/resources/beep-2.mp3');

	function beep0(){
		beepZero.play();
	}

	function beep1(){
		beepOne.play();
	}

	function beep2(){
		beepTwo.play();
	}

	function stardateCalculator(selector){
		document.querySelectorAll(selector).forEach(function(stardate){
			const date = (selector === '.stardate') ? new Date(stardate.getAttribute('data-date')).getTime() : new Date().getTime();
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
