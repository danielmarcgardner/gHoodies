$(document).ready(function() {
  $('select').material_select();
  $(".dropdown-button").dropdown();
});

const submitName = $('#submit-name')[0];
const submitPost = $('#submit-post')[0];
const idInput = $('#id-input')[0];
const nameForm = $('#name-form')[0];
const postForm = $('#post-form')[0];
const updateForm = $('#update-form')[0];
const nameFormRow = $('#name-form-row')[0];
const reportForm = $('#report-form')[0];
const postRow = $('#post-row')[0];
const updateRow = $('#update-row')[0];
const tableRow = $('#table-row')[0];
const tableCol = $('#table-col')[0];
const loadRequests = $('#load-requests')[0];
const loadResults = $('#load-results')[0];
const reportCohortInput = $('#report-cohort-input')[0];
const reportCohortSelect = $('#report-cohort-select')[0];
const updateCohortSelect = $('#update-cohort-select')[0];
const updateSizeSelect = $('#update-size-select')[0];
let id;

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
  tableRow.setAttribute("style", "display: none");
  fetchJson(`https://warm-hamlet-87053.herokuapp.com/cohorts`)
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
	postRow.setAttribute("style", "display: none");
  tableRow.setAttribute("style", "display: none");
	updateRow.setAttribute("style", "");
  idInput.value = id;
  console.log(idInput.value);

  updateForm.setAttribute('action', `https://warm-hamlet-87053.herokuapp.com/students/${id}`);
  updateForm.setAttribute('method', `patch`);
  fetchJson(`https://warm-hamlet-87053.herokuapp.com/cohorts`)
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
	postRow.setAttribute("style", "display:none");
	updateRow.setAttribute("style", "display: none");
  tableRow.setAttribute("style", "");
  fetchJson(`https://warm-hamlet-87053.herokuapp.com/cohorts`)
	.then((cohorts) => {
		const select = $('#report-cohort-select');
		const input = $('#report-cohort-input');
		const disabled = `<option value="" disabled selected>Select a cohort</option>`;
		input.find('label').remove();
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
  nameFormRow.setAttribute("style", "display: none");
  generateReportForm();
})

loadRequests.addEventListener("click", (event) => {
  event.preventDefault();
  nameFormRow.setAttribute("style", "");
  postRow.setAttribute("style", "display:none");
	updateRow.setAttribute("style", "display: none");
  tableRow.setAttribute("style", "display: none");
})

reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = reportCohortSelect.value;
  fetchJson(`https://warm-hamlet-87053.herokuapp.com/cohorts/${value}/students`)
  .then((coData) => {
    generateTable(tableCol, coData);
  })
})

postForm.addEventListener("submit", (event) => {
  Materialize.toast("You have successfully added your information to the database!", 8000);
})

updateForm.addEventListener("submit", (event) => {
	event.preventDefault();
	fetch(`https://warm-hamlet-87053.herokuapp.com/students/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({
			cohort_id: updateCohortSelect.value,
			size: updateSizeSelect.value,
			updated_at: new Date()
		})
	});
  Materialize.toast("You have successfully updated your information in the database!", 8000);
})

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
	const firstName = $('#first_name')[0].value;
	const lastName = $('#last_name')[0].value;
	const fullName = firstName + " " + lastName;
	const url = (`https://warm-hamlet-87053.herokuapp.com/students/name/${fullName}`);
	fetchJson(url)
	.then((result) => {
    console.log(result);
		if (result.length === 0){
			generatePostForm();
		} else {
      id = result[0].id;
			generateEditForm(id);
		}
	})
})
