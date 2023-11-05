/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

export default class AbbreviationUI extends Plugin {
	init() {
		const editor = this.editor;

        // Register the button in the editor's UI component factory.
		editor.ui.componentFactory.add( 'abbreviation', () => {
			const button = new ButtonView();
			
			button.label = 'Abbreviation';
			button.tooltip = true;
			button.withText = true;

			this.listenTo( button, 'execute', () => {
				const title = 'What You See Is What You Get';
				const abbr = 'WYSIWYG';

				// Change the model to insert the abbreviation.
				editor.model.change( writer => {
					const range = editor.model.insertContent( 
						// Create a text node with the abbreviation attribute.
						writer.createText( abbr, { abbreviation: title } ) 
					);

					// By default the end position stickiness is 'toPrevious'. 
					// We change it so that the format isn't kept when writing more text next to the abbreviation.
					range.end.stickiness = 'toNone'

					// Now stickiness is 'toNone', but it doesn't work as expected. 
					// The format is being kept when you continue writing next to the abbreviation.
					console.log(range) 
				} );
			} );

			return button;
		} );
	}
}
