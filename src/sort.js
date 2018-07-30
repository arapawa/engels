/* This file is for manipulation of the table - sorting, clearing, and sending table's results to the compiler */
import $ from 'jquery';

var buttons = [],
	ids = [],
	names = [],
	links = [],
	hiddenDateCreateds = [],
	dateCreateds = [],
	hiddenDateUpdateds = [],
	dateUpdateds = [],

	buttonArray = [],
	countArray = [];

// Put all the values into various arrays
export function throwToArray() {
  setTimeout(() => {
		$('#table-body tr').toArray().map((row) => {
      ids.push(row.cells[1]);
      names.push(row.cells[2].getElementsByTagName('A')[0]);
      links.push(row.cells[2]);
      hiddenDateCreateds.push(row.cells[3].getElementsByTagName('SPAN')[0]);
      dateCreateds.push(row.cells[3].getElementsByTagName('SPAN')[1]);
      hiddenDateUpdateds.push(row.cells[4].getElementsByTagName('SPAN')[0]);
      dateUpdateds.push(row.cells[4].getElementsByTagName('SPAN')[1]);
		});
  }, 500);
}

// Function for find challenge field - Uses text to search challenges by name/id
export function findChallenges() {
	const text = $(this).val();

	// Look through each row to find match for a value in input field -- display none for all things that are not that
	$('#table-body tr').toArray().map((row) => {
		if (text) {
			let slug = row.cells[1].innerText;
			let title = row.cells[2].innerText.toLowerCase();
			if (slug.indexOf(text) > -1 || title.indexOf(text) > -1) {
				row.style.display = 'table-row';
			} else {
				row.style.display = 'none';
			}
		} else {
			row.style.display = 'table-row';
		}
	});

}
