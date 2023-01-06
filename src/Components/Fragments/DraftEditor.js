import React, { Component } from 'react';
import { EditorState ,ContentState,convertFromHTML} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class DraftEditor extends Component {
    constructor(props) {
        super(props);
        let editorState = EditorState.createEmpty()
        if(this.props.initialValue){
            editorState = EditorState.createWithContent( ContentState.createFromBlockArray(
                convertFromHTML(this.props.initialValue)
            ))
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
