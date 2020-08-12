/* This file is for making all the ajax requests to WP and populating the table's contents */
import $ from 'jquery';
import Airtable from 'airtable';
import TableFilter from 'tablefilter';

// Draws the table
function drawTable(records) {

	$('#load').html('<strong style="color:blue"> </strong>');

	$('#search').attr('readonly', false);
	$('#exclusive').attr('disabled', false);

	let tableHTML = '';

	records.map((record, i) => {
		const teamOrInvidivual = record.fields['Team Activity'] === 'yes' ? 'Team' : 'Individual';
		const category = record.fields['Category'] ? record.fields['Category'] : '';

		let headerImage = record.fields['Header Image'];
		if (headerImage) {
			headerImage = headerImage.replace('http://thelibrary.adurolife.com/', 'https://mywellnessnumbers.com/thelibrary/');
		}

		// Remove years from the title
		let title = record.fields['Title']
			.replace(/2017: /, '')
			.replace(/2018: /, '')

		// Strip out old branding bits (YOUR CHALLENGE, forced styles)
		let instructions = record.fields['Instructions']
			.replace(/YOUR CHALLENGE: /, '')
			.replace(/ style="font-weight: bold; font-size: 14px;*"/, '')
			.replace(/ style="font-size:14px; font-weight:bold"/, '')
			.replace(/<\/*strong>/g, '');

		tableHTML +=
			`<tr>
				<td class="column-title"><a href="https://calendarbuilder.dev.adurolife.com/titancoil/#/${record.id}" target="_blank">${title}</a></td>
				<td class="column-category"><span>${category}</span></td>
				<td class="column-instructions">${instructions}</td>
				<td class="column-occurrence"><span>${record.fields['Reward Occurrence']}</span></td>
				<td class="column-device"><span>${record.fields['Device Enabled']}</span></td>
				<td class="column-team"><span>${teamOrInvidivual}</span></td>`;

		if (headerImage) {
			tableHTML += `<td class="column-image"><a href="${headerImage}" target="_blank"><img src="${headerImage}" width="100%"/></a></td>`;
		} else {
			tableHTML += '<td class="column-image"></td>';
		}

		tableHTML += '</tr>';
	});

	$('#table-body').append(tableHTML);

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
		} else {
			// create TableFilter (https://github.com/koalyptus/TableFilter)
			var tf = new TableFilter(document.querySelector('.table'), {
				col_1: 'select',
		    col_3: 'select',
		    col_4: 'select',
		    col_5: 'select',
		    col_6: 'none',
        extensions: [{
            name: 'sort'
        }],

        /** Bootstrap integration */

        // aligns filter at cell bottom when Bootstrap is enabled
        filters_cell_tag: 'th',

        // allows Bootstrap table styling
        themes: [{
            name: 'transparent'
        }]
			});
			tf.init();
		}

	});

}
