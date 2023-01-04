import React, { Component } from 'react';
import { EditorState ,ContentState,convertFromHTML} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class DraftEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent( ContentState.createFromBlockArray(
                convertFromHTML(this.props.initialValue)
            )),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        this.props.formRef.current.setFieldsValue({
            [this.props.name]:editorState.convertToRaw()
        })

    };

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}
export default DraftEditor
