var grade = document.getElementById("grade");
var at = document.getElementById("at");

if( localStorage.vremea_ido ) {
	grade.innerHTML = localStorage.vremea_ido;
	at.innerHTML = localStorage.vremea_set_at;
}else{
	grade.innerHTML = 'Not set';
	at.innerHTML = 'Not set';
}

var urmatoarele_ore = document.getElementById("urmatoarele_ore");
var urm_ore = JSON.parse(localStorage.vremea_urmatoarele_ore);
var urm_temp = JSON.parse(localStorage.vremea_urmatoarele_temp);
var output = '';

for ( var key in urm_ore ) {
   	output += '<div class="urmatoarele">';
   	output += '<div class="u_ora">' + urm_ore[key] + ':00</div>';
   	output += '<div class="u_temp">' + urm_temp[key] + '°</div>';
   	output += '</div>';
}


urmatoarele_ore.innerHTML = output;