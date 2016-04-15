var translation = {
'لا':'No',
'من':'From',
'هذا':'This',
'أن':'that',
'في':'at',
'أنا':'I',
'على':'On',
'ما':'What',
'هل':'Do you',
'يا':'Oh',
'و':'And',
'لقد':'I have',
'ذلك':'that',
'ماذا':'What',
'أنت':'You',
'هنا':'Here',
'لم':'did not',
'إلى':'to me',
'نعم':'Yeah',
'كان':'It was',
'هو':'He',
'ان':'that',
'هذه':'this',
'هناك':'There',
'عن':'About',
'فى':'at',
'كل':'All',
'ليس':'Not',
'فقط':'Just',
'كنت':'I was',
'الآن':'right Now',
'يجب':'Must',
'انا':'I',
'لك':'is yours',
'مع':'With',
'شيء':'Thing',
'لكن':'But',
'لن':'will not',
'الذي':'Which',
'حسنا':'OK',
'كيف':'How',
'سوف':'Will',
'هيا':'Come on',
'نحن':'we',
'إنه':"it's a",
'أجل':'Yup',
'لماذا':'Why',
'إذا':'if',
'عندما':'When',
'انه':"it's a",
'كذلك':'As well',
'لي':'Mine',
'الى':'to me',
'بعد':'distance',
'انت':'You',
'هي':'she',
'أين':'Where',
'أنه':"it's a",
'كانت':'she was',
'حتى':'Even',
'أي':'Which',
'إنها':'It',
'أعرف':'I know',
'قد':'may',
'قبل':'Before',
'تلك':'That',
'الأمر':'It',
'بعض':'Some',
'أو':'or',
'مثل':'Like',
'أريد':'I want',
'رجل':'Man',
'لو':'If',
'أعتقد':'Think',
'ربما':'Maybe',
'أيها':'O',
'بخير':'Fine',
'يكون':'is being',
'عليك':'on you',
'جيد':'Good',
'أنك':'You',
'شخص':'Person',
'إن':'that',
'التي':'Which',
'ولكن':'But',
'أليس':'Alice',
'علي':'Ali',
'أحد':'A',
'به':'with it',
'الوقت':'Time',
'يمكن':'Can',
'انها':'It',
'اليوم':'Today',
'شئ':'a thing',
'تعرف':'Recognize',
'تريد':'You want',
'صحيح':'Right',
'أكثر':'More',
'تكون':'Be'
};
var vocabulary = ['لا','من','هذا','أن','في','أنا','على','ما','هل','يا','و','لقد','ذلك','ماذا','أنت','هنا','لم','إلى','نعم','كان','هو','ان','هذه','هناك','عن','فى','كل','ليس','فقط','كنت','الآن','يجب','انا','لك','مع','شيء','لكن','لن','الذي','حسنا','كيف','سوف','هيا','نحن','إنه','ـ','أجل','لماذا','إذا','عندما','انه','كذلك','لي','الى','بعد','انت','هي','أين','أنه','كانت','حتى','أي','إنها','أعرف','قد','قبل','تلك','الأمر','بعض','أو','مثل','أريد','رجل','لو','أعتقد','ربما','أيها','بخير','يكون','عليك','جيد','أنك','شخص','إن','التي','ولكن','أليس','علي','أحد','به','الوقت','يمكن','انها','اليوم','شئ','تعرف','تريد','صحيح','أكثر','تكون']
var progress = 0;
var word;
var language = 'Arabic Male';
var loopspeech = false; 
var loopspell = false;

function nextword() {
	word = vocabulary[progress];
	progress ++;
	var arabic = document.createElement('div');
	arabic.title = word;
	arabic.lang = 'ar';
	arabic.id = 'arabic';
	var formattedword = '';
	for (i = 0; i < word.length; i++) {
		formattedword += "<span id='letter" + i + "'>";
		if ( i == 0 ) {
			formattedword += word[i];
		} else {
			formattedword += "&zwj;" + word[i];
		}
		if (i != word.length - 1) {
			formattedword += "&zwj;</span>";
		} else {
			formattedword += "</span>";
		}
	}
	arabic.innerHTML = formattedword;
	var english = document.createElement('div');
	english.lang = 'en';
	english.id = 'english';
	english.style.display = 'none';
	english.innerHTML = translation[ word ].toLowerCase();
	$('#exerciser').empty().append(arabic, english);
}

document.onkeyup = KeyCheck;       
// User input to move focus word via keyboard

function KeyCheck(e) {
	var KeyID = (window.event) ? event.keyCode : e.keyCode;
	switch(KeyID) {
		case 39: // right arrow
			nextword();
		break;
		
		case 37: // left arrow
			spellsingle();
		break;
		
		case 16: // shift
			if (loopspeech == false) {
				loopspeech = true;
				speak();
			} else if (loopspeech == true && loopspell == false) {
				loopspell = true;
				spell();
			} else {
				loopspeech = false;
				loopspell = false;
			}
		break;
	}
}

function spell () {
	if (loopspell == true) {
		spellsingle();
		setTimeout(function() {
			spell();
		}, 1000);
	} else {
		spellsingle();
	}
}

function spellsingle () {
	if ($('#arabic').find('.highlight').length > 0) {
		if ($('#arabic').find('.highlight').next().length == 0) {
			$('#arabic').find('.highlight').removeClass('highlight');
		} else if ($('#arabic').find('.highlight').next().next().length == 0) {
			$('#arabic').find('.highlight').removeClass('highlight').next().addClass('highlight');
			setTimeout(function() {
				$('#arabic').find('.highlight').removeClass('highlight');
				$('#english').show();
				if (loopspeech == false) {speak();}
			}, 1200);
		} else if ($('#arabic').find('.highlight').next().length > 0) {
			$('#arabic').find('.highlight').removeClass('highlight').next().addClass('highlight');
		}
	} else {
		$('#letter0').addClass('highlight');
	}
}

function speak() {
	responsiveVoice.speak(word, language, {
		rate: 0.7, 
		onend: function() {
			setTimeout(function(){
				if (loopspeech == true) {
					speak();
				} else {
					return;
				}
			}, 3000);
		}
	});
}
