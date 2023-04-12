import React, { useState } from 'react';
import { EditorState} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const DraftEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [contentState, setContentState] = useState(null);

    const handleContentStateChange = (contentState) => {
        setContentState(draftToHtml(contentState));
    };

    const handleEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="editor-toolbar"
                wrapperClassName="editor-wrapper"
                editorClassName="editor"
                onEditorStateChange={handleEditorStateChange}
                onContentStateChange={handleContentStateChange}
                spellCheck
            />

        </div>
    );
};

export default DraftEditor
