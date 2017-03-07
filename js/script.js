$(document).ready(function() {
  $('select').material_select();
  $(".dropdown-button").dropdown();
});

const submitName = $('#submit-name')[0];
const nameForm = $('#name-form')[0];
const nameFormRow = $('#name-form-row')[0];
const reportForm = $('#report-form')[0];
const postRow = $('#post-row')[0];
const updateRow = $('#update-row')[0];
const tableRow = $('#table-row')[0];
const tableCol = $('#table-col')[0];
const loadRequests =$('#load-requests')[0];
const loadResults =$('#load-results')[0];

const data = [
  {
    "name": "Daniel Gardner",
    "fulfilled": false,
    "size": "Large"
  },
  {
    "name": "Matt Muir",
    "fulfilled": false,
    "size": "XL"
  },
  {
    "name": "Randall Spencer",
    "fulfilled": false,
    "size": "Large"
  },
  {
    "name": "Thomas Stang",
    "fulfilled": false,
    "size": "XL"
  },
  {
    "name": "Ryan Thissen",
    "fulfilled": false,
    "size": "Large"
  }
];

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
	fetchJson(`https://localhost:8000/cohorts`)
	.then((cohorts) => {
		const select = $('#cohort-select');
		const input = $('#cohort-input');
		$.each(cohorts, (i, val) => {
			select.prepend($("<option/>").val(this.id).text(this.gnum));
		})
		input.append($("<label/>").text("Cohort numer:"))
		$('select').material_select();
	})
}

function generateEditForm(){
	postRow.setAttribute("style", "diplay:none");
	updateRow.setAttribute("style", "");
	fetchJson(`https://localhost:8000/cohorts`)
	.then((cohorts) => {
		const select = $('#cohort-select');
		const input = $('#cohort-input');
		$.each(cohorts, (i, val) => {
			select.prepend($("<option/>").val(this.id).text(this.gnum));
		})
		input.append($("<label/>").text("Cohort numer:"))
		$('select').material_select();
	})
}

//first parameter will be the column which is a child of a row which is a child of the container
function generateTable(tableDiv, data) {
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
    console.log(table[0]);
    console.log(tableCol);
    return tableCol.append(table[0]);
}

loadResults.addEventListener("click", (event) => {
  event.preventDefault();
  nameFormRow.setAttribute("style", "display: none");
  tableRow.setAttribute("style", "");

})

reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  generateTable(tableCol, data);
})

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
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
