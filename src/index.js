import _ from 'lodash';
import $ from 'jquery';
window.$ = window.jQuery = $;
require('bootstrap');

import { loadTable } from './challenges';
import { findChallenges } from './sort';


	window.onload = loadTable;

	// Event listeners
	$('#search').keyup(_.debounce(findChallenges, 175));

