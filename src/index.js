import _ from 'lodash';
import $ from 'jquery';
window.$ = window.jQuery = $;
require('bootstrap');

import { loadTable } from './challenges';

	window.onload = loadTable;
