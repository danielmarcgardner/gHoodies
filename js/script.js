$(document).ready(function() {
  $('select').material_select();
  $(".dropdown-button").dropdown();
});

const submitName = $('#submit-name')[0];
const submitPost = $('#submit-post')[0];
const landing = $('#landing')[0];
const about = $('#about')[0];
const nameForm = $('#name-form')[0];
const postForm = $('#post-form')[0];
const updateForm = $('#update-form')[0];
const reportForm = $('#report-form')[0];
const nameFormRow = $('#name-form-row')[0];
const postRow = $('#post-row')[0];
const updateRow = $('#update-row')[0];
const tableRow = $('#table-row')[0];
const tableCol = $('#table-col')[0];
const loadAbout = $('#load-about')[0];
const loadRequests = $('#load-requests')[0];
const loadResults = $('#load-results')[0];
const loadAdmin = $('#load-admin')[0];
const loadLanding = $('#load-landing')[0];
const idInput = $('#id-input')[0];
const reportCohortInput = $('#report-cohort-input')[0];
const reportCohortSelect = $('#report-cohort-select')[0];
const updateCohortSelect = $('#update-cohort-select')[0];
const updateSizeSelect = $('#update-size-select')[0];
let id;
let created;
let email;
let name;

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

function hideContents(){
	landing.setAttribute("style", "display:none");
	about.setAttribute("style", "display:none");
	postRow.setAttribute("style", "display:none");
	updateRow.setAttribute("style", "display: none");
	tableRow.setAttribute("style", "display: none");
}

function generatePostForm(){
	hideContents();
	postRow.setAttribute("style", "");
	$('#post-row').prepend('<div/>', {"class": 'input-field col s6'})
		.append('input', {
			"class": 'validate',
			id: 'post-name',
			type: 'text',
			name: 'firstName',
			placeholder: 'Enter your full first name',
			value: $('#search-name')[0].value
		}).append('label', {
			for: 'post-name',
			text: $('#search-name')[0].text
		})
		$('#post-row').prepend('<div/>', {"class": 'input-field col s6'})
			.append('input', {
				"class": 'validate',
				id: 'post-surname',
				type: 'text',
				name: 'lastName',
				placeholder: 'Enter your last name',
				value: $('#search-surname')[0].value
			}).append('label', {
				for: 'post-surname',
				text: $('#search-surname')[0].text
			})

  fetchJson(`https://ghoodies.herokuapp.com/cohorts`)
	.then((cohorts) => {
		const select = $('#cohort-select');
		const input = $('#cohort-input');
		$.each(cohorts, (i, value) => {
			select.prepend($("<option/>").val(value.id).text(value.gnum));
		})
		input.append($("<label/>").text("Cohort number:"))
		$('select').material_select();
	})
}

function generateEditForm(id){
	hideContents();
	updateRow.setAttribute("style", "");
  idInput.value = id;
  updateForm.setAttribute('action', `https://ghoodies.herokuapp.com/students/${id}`);
  updateForm.setAttribute('method', `patch`);
  fetchJson(`https://ghoodies.herokuapp.com/cohorts`)
	.then((cohorts) => {
		const select = $('#update-cohort-select');
		const input = $('#update-cohort-input');
		$.each(cohorts, (i, value) => {
			select.prepend($("<option/>").val(value.id).text(value.gnum));
		})
		input.append($("<label/>").text("Cohort number:"))
		$('select').material_select();
	})
}

function generateReportForm(){
	hideContents();
  tableRow.setAttribute("style", "");
  fetchJson(`https://ghoodies.herokuapp.com/cohorts`)
	.then((cohorts) => {
		const select = $('#report-cohort-select');
		const input = $('#report-cohort-input');
		const disabled = `<option value="" disabled selected>Select a cohort</option>`;
		input.find('label').remove();
    select.empty();
		$.each(cohorts, (i, value) => {
			select.prepend($("<option/>").val(value.id).text(value.gnum));
		})
		select[0].insertAdjacentHTML('beforeend', disabled);
		input.append($("<label/>").text("Cohort number:"))
		$('select').material_select();
	})
}

//first parameter will be the column which is a child of a row which is a child of the container
function generateTable(tableDiv, data) {
	while (tableCol.firstChild) {
		tableCol.removeChild(tableCol.firstChild);
	}
  const table = $("<table/>").addClass('striped');
	const tHead = $("<thead/>");
	const tBody = $("<tbody/>");
  const thRow = $("<tr/>").append(
		$("<th/>").text("Student Name"),
		$("<th/>").text("Size"),
		$("<th/>").text("Fulfillment Status")
  );
  tHead.append(thRow);
	table.append(tHead);
	table.append(tBody);
  $.each(data, (i, student) => {
      const row = $("<tr/>").append(
				$('<td/>').text(student.name),
				$('<td/>').text(student.size),
				$('<td/>').text(student.fulfilled)
			);
			tBody.append(row);
  });
  return tableCol.append(table[0]);
}

loadResults.addEventListener("click", (event) => {
  event.preventDefault();
  landing.setAttribute("style", "display: none");
  generateReportForm();
})

loadRequests.addEventListener("click", (event) => {
  event.preventDefault();
	hideContents();
	landing.setAttribute("style", "");
})

loadAbout.addEventListener("click", (event) => {
  event.preventDefault();
	hideContents();
	about.setAttribute("style", "");
})

reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = reportCohortSelect.value;
  fetchJson(`https://ghoodies.herokuapp.com/cohorts/${value}/students`)
  .then((coData) => {
    generateTable(tableCol, coData);
  })
})

postForm.addEventListener("submit", (event) => {
  Materialize.toast("You have successfully added your information to the database!", 8000);
})

updateForm.addEventListener("submit", (event) => {
	event.preventDefault();
	let data = {
	    cohort_id: Number(updateCohortSelect.value),
	    size: updateSizeSelect.value,
	    id: id,
	    created_at: created,
	    fulfilled: false,
	    name: name,
	    email: email
	  };
	  $.ajax({
      url: `https://ghoodies.herokuapp.com/students/${id}`,
	    type: 'PATCH',
	    data: data,
	    dataType: 'application/json'
	  })
	  Materialize.toast("You have successfully updated your information in the database!", 8000);
})

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
	const firstName = $('#search-name')[0].value;
	const lastName = $('#search-surname')[0].value;
	const fullName = firstName + " " + lastName;
	const url = (`https://ghoodies.herokuapp.com/students/name/${fullName}`);
	fetchJson(url)
	.then((result) => {
		if (result.length === 0){
			generatePostForm();
		} else {
      id = result[0].id;
      created = result[0].created_at;
      email = result[0].email;
      name = result[0].name;
			generateEditForm(id);
		}
	})
})
