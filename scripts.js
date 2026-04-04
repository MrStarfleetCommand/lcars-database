import {txtToHtml, htmlToTxt} from './parser.js';
(async () => {
	const currentPage = location.pathname.replace(/^\/LCARS-database\/(.*)\.html$/, '$1');
	const pageName = currentPage === '/LCARS-database/' ? 'index' : currentPage;
	const pageSource = await fetch(`${pageName}.txt`);
	const txt = await pageSource.text();
	const contentArea = document.createElement('div');
	const pageHeading = document.createElement('h2');
	const parserOutput = document.createElement('div');
	const waveform = document.createElement('div');
	const bracketOne = document.createElement('div');
	const bracketTwo = document.createElement('div');
	const panelColumnOne = document.createElement('div');
	const panelColumnTwo = document.createElement('div');
	const numberOfPanels = Math.round((screen.height - 5) / 130);
	const blues = ['light-blue', 'dark-blue'];
	const grays = ['light-gray', 'dark-gray'];
	let digits = String(numberOfPanels).length;
	digits = digits === 1 ? 2 : digits;

	pageHeading.innerText = document.title;
	parserOutput.id = 'parser-output';
	parserOutput.innerHTML = txtToHtml(txt)
	contentArea.classList.add('content-area', 'scrollbox');
	contentArea.appendChild(pageHeading);
	contentArea.appendChild(parserOutput);
	bracketOne.classList.add('element-one');
	bracketTwo.classList.add('element-two');
	waveform.classList.add('waveform');
	waveform.append(bracketOne);

	for (let i = 0; i < 15; i++){
		const line = document.createElement('div');
		line.classList.add('line');
		waveform.append(line);
	}

	waveform.append(bracketTwo);
	document.body.append(waveform);
	panelColumnOne.classList.add('panel-column');
	panelColumnTwo.classList.add('panel-column');

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

		panelOne.classList.add(colorOne);
		panelTwo.classList.add(colorTwo);
		panelOneText.classList.add('margin');
		panelTwoText.classList.add('margin');
		panelOneText.innerText = i === 0 ? 'LCARS 40274' : prefix + '-' + r(10) + r(10) + r(10) + r(10) + r(10) + r(10);
		panelTwoText.innerText = i === 0 ? 'LCARS 40274' : prefix + '-' + String(r(1000000)).padStart(6, 0);
		panelOne.append(panelOneText);
		panelTwo.append(panelTwoText);
		panelColumnOne.append(panelOne);
		panelColumnTwo.append(panelTwo);
	}

	document.body.append(panelColumnOne);
	document.body.append(panelColumnTwo);

	hideExcessPanels();
	addEventListener('resize', hideExcessPanels);

	const siteHeading = document.createElement('h1');
	siteHeading.innerText = 'LCARS Database';
	document.body.append(siteHeading);
	document.body.append(contentArea);
	document.body.innerHTML += `
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
<table class="cascade">
	<tr>
		<td>2385</td>
		<td></td>
		<td>8578232</td>
		<td>9</td>
		<td>5789</td>
		<td>3882</td>
		<td>5893</td>
		<td>9885</td>
		<td>3489</td>
		<td>3465</td>
		<td>0846</td>
		<td>9798</td>
		<td>9629</td>
		<td>29</td>
		<td>34</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>279</td>
		<td>89</td>
		<td>6589</td>
		<td>6547</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
	</tr>
	<tr>
		<td>2064</td>
		<td></td>
		<td>2064962</td>
		<td>7</td>
		<td>9776</td>
		<td>626</td>
		<td>1276</td>
		<td>7612</td>
		<td>126</td>
		<td>97</td>
		<td>6165</td>
		<td>6626</td>
		<td>876</td>
		<td>74</td>
		<td>2385</td>
		<td>6589</td>
		<td>6547</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
		<td>9</td>
		<td>5789</td>
		<td>3882</td>
		<td>5893</td>
		<td>3489</td>
		<td>3465</td>
		<td>0846</td>
		<td>9798</td>
		<td>9629</td>
		<td>29</td>
		<td>4588</td>
	</tr>
	<tr>
		<td>34</td>
		<td></td>
		<td>279</td>
		<td></td>
		<td>89</td>
		<td>6589</td>
		<td>6547</td>
		<td>6589</td>
		<td>6547</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
		<td>2064</td>
		<td>9776</td>
		<td>626</td>
		<td>1276</td>
		<td>7612</td>
		<td>126</td>
		<td>97</td>
		<td>6165</td>
		<td>6626</td>
		<td>876</td>
		<td>74</td>
		<td>3489</td>
	</tr>
	<tr>
		<td>4768</td>
		<td></td>
		<td>8967248</td>
		<td>7</td>
		<td>9798</td>
		<td>8969</td>
		<td>476</td>
		<td>9047</td>
		<td>8476</td>
		<td>9749</td>
		<td>0982</td>
		<td>8969</td>
		<td>0247</td>
		<td>89</td>
		<td>34</td>
		<td>279</td>
		<td>89</td>
		<td>6589</td>
		<td>6547</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
	</tr>
	<tr>
		<td>685</td>
		<td></td>
		<td>3478</td>
		<td>8</td>
		<td>867</td>
		<td>346</td>
		<td>34</td>
		<td>48</td>
		<td>49</td>
		<td>8</td>
		<td>89</td>
		<td>897</td>
		<td>38</td>
		<td>34</td>
		<td>279</td>
		<td></td>
		<td>89</td>
		<td>6589</td>
		<td>6547</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
	</tr>
	<tr>
		<td>757</td>
		<td></td>
		<td>898990</td>
		<td>8</td>
		<td>200</td>
		<td>285</td>
		<td>923</td>
		<td>9</td>
		<td>387</td>
		<td>238</td>
		<td>578</td>
		<td>875</td>
		<td>87</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>9</td>
		<td>34</td>
		<td></td>
		<td>279</td>
		<td>89</td>
		<td>6589</td>
		<td>6547</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>05</td>
	</tr>
	<tr>
		<td>484</td>
		<td></td>
		<td>947589</td>
		<td>7</td>
		<td>569</td>
		<td>68</td>
		<td>678</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>893</td>
		<td>56</td>
		<td>584</td>
		<td>678</td>
		<td>476</td>
		<td>458</td>
		<td>4</td>
		<td>34</td>
		<td>279</td>
		<td>89</td>
		<td>6589</td>
		<td>6547</td>
		<td>6587</td>
		<td>3465</td>
		<td>867</td>
		<td>2347</td>
		<td>5762</td>
		<td>4588</td>
		<td>05</td>
	</tr>
</table>
<a class="button header-one dark-blue" href="index.html" onclick="beep0()"><span class="margin">Home</span></a>
<a class="button header-two light-blue" href="timeline/index.html" onclick="beep0()"><span class="margin">Timeline</span></a>
<a class="button header-three red" href="trek-analyzed/index.html" onclick="beep0()"><span class="margin">Trek Analyzed</span></a>
<a class="button header-four light-gray" href="trek-lore/index.html" onclick="beep0()"><span class="margin">Trek Lore</span></a>
<div class="bar number-one dark-blue"></div>
<div class="bar number-two dark-blue"></div>
<div class="bar-break light-gray"></div>
<div class="bar-continued number-one light-gray"></div>
<div class="bar-continued number-two light-blue"></div>
<div class="marker"></div>
<a href="legalities.html" class="left-facing copyrights button red" onclick="beep1()"><span class="margin">Legalities</span></a>`;

	const beepZero = new Audio('audio/beep-0.mp3');
	const beepOne = new Audio('audio/beep-1.mp3');
	const beepTwo = new Audio('audio/beep-2.mp3');

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
		const wantedPanels = document.querySelectorAll(`.panel-column > div:not(:nth-child(${wantedPanelCount}) ~ div)`);
		const excessPanels = document.querySelectorAll(`.panel-column > :nth-child(${wantedPanelCount}) ~ div`);

		wantedPanels.forEach(panel => panel.classList.remove('hidden'));
		excessPanels.forEach(panel => panel.classList.add('hidden'));
	}
})();
