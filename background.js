function getVremeaAtInterval() {
	// setup vars
	var grade = document.getElementById("grade");
	var theURL = 'http://vremea.ido.ro/Iasi.htm';

	// setup badge bg color & initial text
	chrome.browserAction.setBadgeBackgroundColor( { color: [255, 0, 0, 255]} );
	chrome.browserAction.setBadgeText({ text: "..."});

	// set xmlhttp
	if (window.XMLHttpRequest) {
	    xmlhttp=new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
	}else{
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
	}

	// do the request
	xmlhttp.onreadystatechange=function()
	{
	    if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {

	    	// match vremea acum
	    	var HTML = xmlhttp.responseText;
	    	var REGEX = /Temperatura acum: \<b\>(\-?\d+)/g;
	    	var GRADE = REGEX.exec(HTML);
	    	

	    	// set badge text with grade
	    	chrome.browserAction.setBadgeText( { text: GRADE[1] + "°" });
	  
	        // set local storage ( remove if exists )
	        if( localStorage.vremea_ido ) {
	        	localStorage.removeItem( "vremea_ido" );
	        	localStorage.removeItem( "vremea_set_at" );
	    	}

	    	// set time now
	    	var now = new Date();

	        localStorage.setItem( "vremea_ido", GRADE[1] );
	        localStorage.setItem( "vremea_set_at", now.toString() );

	        // match urmatoarele ore
	        var urmatoarele_ore = {};
	        var urmatoarele_temp = {}

	        var REGEX = /<p class="bx1">Ora (\d+)<\/p><img[^>]+><p><b>(\-?\d+)/g;
	        var i = 0;
			while ((GRADE = REGEX.exec(HTML)) != null) {
				i++;

				var ora               = GRADE[ 1 ];
				var temp              = GRADE[ 2 ];
				
				urmatoarele_ore[ i ]  = ora;
				urmatoarele_temp[ i ] = temp;
			}

			localStorage.setItem( "vremea_urmatoarele_ore", JSON.stringify(urmatoarele_ore) );
			localStorage.setItem( "vremea_urmatoarele_temp", JSON.stringify(urmatoarele_temp) );


	    }
	}
	xmlhttp.open("GET", theURL, true);
	xmlhttp.send();
}

getVremeaAtInterval();
setInterval( getVremeaAtInterval, 600000 );