$.fn.editor = function(options) {
	
	var textarea, mode, editor;

    options = options || {};
    options.height = options.height || 'auto';
   
    textarea = $(this);
    mode = options.mode || textarea.attr('mode') || 'html';
    if (mode === 'html') mode = 'text/html';
    if (mode === 'handlebars') mode = {name: "handlebars", base: "text/html"};

    editor = CodeMirror.fromTextArea(textarea.get(0), {
        mode: mode,
        readOnly: options.readOnly,
        indentUnit: 4,
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        indentWithTabs: true,
        autoCloseTags: true,
        foldGutter: true,
        dragDrop: true,
        lint: true,
        viewportMargin: Infinity,
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    });
    editor.setSize(null, options.height);

    editor.on('change', function(editor) {
        editor.save();

        // validate with https://github.com/provejs/provejs-jquery
        if (textarea.dirty) textarea.dirty(true);
        if (textarea.validate) textarea.validate();

        textarea.trigger('editor.change', editor);
    });

    return editor;
};