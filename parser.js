function txtToHtml(txt){
	let html = txt;
	html = html.replace(/</g, '&lt;');
	html = html.replace(/^\s+/, '');
	html = html.replace(/\s+$/, '');
	html = html.replace(/^(======) *(.+?) *\1 *$/gm, '<h6 class="heading">$2</h6>');
	html = html.replace(/^(=====) *(.+?) *\1 *$/gm, '<h5 class="heading">$2</h5>');
	html = html.replace(/^(====) *(.+?) *\1 *$/gm, '<h4 class="heading">$2</h4>');
	html = html.replace(/^(===) *(.+?) *\1 *$/gm, '<h3 class="heading">$2</h3>');
	html = html.replace(/^(==) *(.+?) *\1 *$/gm, '<h2 class="heading">$2</h2>');
	html = html.replace(/^ *([^<\s].*?) *$/gm, '<p>$1</p>');
	html = html.replace(/''' *([^'].*?) *'''/g, '<span class="bold">$1</span>');
	html = html.replace(/'' *([^'].*?) *''/g, '<span class="italic">$1</span>');
	html = html.replace(/\[ *([^\s"]+?) +(.+?) *\]/g, '<a href="$1" class="external-link">$2</a>');
	html = html.replace(/\s+/g, ' ');
	return html;
}

function htmlToTxt(html){
	let txt = html;
	txt = txt.replace(/\s*<h6 class="heading">(.+?)<\/h6>\s*/g, '\n====== $1 ======\n');
	txt = txt.replace(/\s*<h5 class="heading">(.+?)<\/h5>\s*/g, '\n===== $1 =====\n');
	txt = txt.replace(/\s*<h4 class="heading">(.+?)<\/h4>\s*/g, '\n==== $1 ====\n');
	txt = txt.replace(/\s*<h3 class="heading">(.+?)<\/h3>\s*/g, '\n=== $1 ===\n');
	txt = txt.replace(/\s*<h2 class="heading">(.+?)<\/h2>\s*/g, '\n== $1 ==\n');
	txt = txt.replace(/\s*<p>(.+?)<\/p>\s*/g, '\n\n$1\n\n');
	txt = txt.replace(/<span class="bold">(.+?)<\/span>/g, `'''$1'''`);
	txt = txt.replace(/<span class="italic">(.+?)<\/span>/g, `''$1''`);
	txt = txt.replace(/<a href="(.+?)" class="external-link">(.+?)<\/a>/g, '[$1 $2]');
	txt = txt.replace(/\n\n\n+/g, '\n\n');
	txt = txt.replace(/^(==+ .+? ==+\n)\n/gm, '$1');
	txt = txt.replace(/^\s+/, '');
	txt = txt.replace(/\s+$/, '');
	return txt;
}

export {txtToHtml, htmlToTxt};
