$(document).ready(function() {
  $('select').material_select();
  $(".dropdown-button").dropdown();
});

const submitName = $('#submit-name');
const nameForm = $('#name-form');
const postRow = $('#post-row');
const updateRow = $('#update-row');

$.getJSON("/Admin/GetFolderList/", function(result) {
    for (var i = 0; i < result.length; i++) {
        options += '<option value="' + result[i].ImageFolderID + '">' + result[i].Name + '</option>';
    }
});

var options = $("#options");
$.each(result, function() {
    options.append($("<option />").val(this.ImageFolderID).text(this.Name));
});

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
	postRow.setAttribute("style", "");
	updateRow.setAttribute("style", "display: none");
	fetchJson(`localhost:8000/cohorts`)
	.then((cohorts) => {
		const select = ${'#cohort-select'};
		const input = ${'#cohort-input'};
		$.each(cohorts, (i, val) => {
			select.append($("<option />").val(this.id).text(this.gnum));
		})
		input.append($("<label />").text("Cohort numer:"))
		$('select').material_select();
	})
}

nameForm.addEventListener("submit"), (event) => {
	const firstName = $('#first_name');
	const lastName = $('#last_name');
	const fullName = firstName + " " + lastName;
	const url = (`localhost:8000/students/names/${fullName}`);
	fetchJson(url)
	.then((result) => {
		if (result.length === 0){
			generatePostForm();
		} else {
			generateEditForm();
		}
	})
}
