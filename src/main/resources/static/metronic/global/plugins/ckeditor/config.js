/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.removePlugins = 'elementspath';
	config.toolbar = [
	                  { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },
	                  { name: 'styles', items: [ 'Font', 'FontSize' ] },
	                  { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', 'Blockquote'] }
	              ];
};
