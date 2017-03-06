$(document).ready(function() {
  $('select').material_select();
  $(".dropdown-button").dropdown();
});

const submitName = $('#submit-name')[0];
const nameForm = $('#name-form')[0];
const postRow = $('#post-row')[0];
const updateRow = $('#update-row')[0];

function fetchJson(url) {
  return fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(jsonresult){
    return jsonresult;
  })
  .catch(function(error){
    console.log('Your error was: ('+error+') ')
    throw error;
  });
}

function generatePostForm(){
	debugger;
	postRow.setAttribute("style", "");
	updateRow.setAttribute("style", "display: none");
	fetchJson(`https://localhost:8000/cohorts`)
	.then((cohorts) => {
		const select = $('#cohort-select');
		const input = $('#cohort-input');
		$.each(cohorts, (i, val) => {
			select.prepend($("<option />").val(this.id).text(this.gnum));
		})
		input.append($("<label />").text("Cohort numer:"))
		$('select').material_select();
	})
}

function generateEditForm(){

}

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
	debugger;
	const firstName = $('#first_name')[0].value;
	const lastName = $('#last_name')[0].value;
	const fullName = firstName + " " + lastName;
	const url = (`http://localhost:8000/students/name/${fullName}`);
	// $.getJSON(url, function(result) {
	// 	if (result.length === 0){
	// 		generatePostForm();
	// 	} else {
	// 		generateEditForm();
	// 	}
	// });
	fetchJson(url)
	.then((result) => {
		if (result.length === 0){
			generatePostForm();
		} else {
			generateEditForm();
		}
	})
})
