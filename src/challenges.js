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
		tableHTML +=
			`<tr>
				<td><a href="http://mywellnessnumbers.sftp.adurolife.com/titancoil/#/${record.id}" target="_blank">${record.fields['Title']}</a></td>
				<td><span>${record.fields['Category']}</span></td>
				<td><span>${record.fields['Instructions']}</span></td>
				<td><img src="${record.fields['Header Image']}" width="100%"/></td>
				<td><span style="display:none">${record._rawJson.createdTime}</span><span>${new Date(record._rawJson.createdTime).toDateString()}</span></td>
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
