import React, { Component } from 'react';
import { EditorState ,ContentState,convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class DraftEditor extends Component {
    constructor(props) {
        super(props);
        let editorState = EditorState.createEmpty()
        if(this.props.initialValue){
            const contentBlock = htmlToDraft(this.props.initialValue);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        }
        this.state = {
            editorState,
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        this.props.formRef.current.setFieldsValue({
            [this.props.name]:draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })

    };

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor editor_class_name"
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}
export default DraftEditor
