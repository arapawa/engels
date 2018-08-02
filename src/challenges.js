/* This file is for making all the ajax requests to WP and populating the table's contents */
import $ from 'jquery';
import Airtable from 'airtable';
import { addRemove, throwToArray } from './sort';

// Draws the table
function drawTable(records) {

	$('#load').html('<strong style="color:blue"> </strong>');

	$('#search').attr('readonly', false);
	$('#exclusive').attr('disabled', false);

	let tableHTML = '';

	records.map((record, i) => {
		var teamOrInvidivual = record.fields['Team Activity'] === 'yes' ? 'Team' : 'Individual';
		tableHTML +=
			`<tr>
				<td class="column-title"><a href="http://mywellnessnumbers.sftp.adurolife.com/titancoil/#/${record.id}" target="_blank">${record.fields['Title']}</a></td>
				<td class="column-category"><span>${record.fields['Category']}</span></td>
				<td class="column-occurrence"><span>${record.fields['Reward Occurrence']}</span></td>
				<td class="column-device"><span>${record.fields['Device Enabled']}</span></td>
				<td class="column-team"><span>${teamOrInvidivual}</span></td>
				<td class="column-instructions"><span>${record.fields['Instructions']}</span></td>
				<td class="column-image"><img src="${record.fields['Header Image']}" width="100%"/></td>
			</tr>`;
	});

	$('#table-body').append(tableHTML);

	// Creates an array used for sorting functionality
	throwToArray();
}

// Loads table JSON file from api
export function loadTable() {

	const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appa7mnDuYdgwx2zP');
	base('Challenges').select({
		view: 'Grid view'
	}).eachPage(function page(records, fetchNextPage) {

		drawTable(records);

		fetchNextPage();
	}, function done(err) {
		if (err) {
			console.error(err);
			return;
		}

	});

}
