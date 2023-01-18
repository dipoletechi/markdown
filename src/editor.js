import React, { useEffect, useState } from 'react';
import './editor.css';
import ReactMarkdown from 'react-markdown'
import MDEditor from '@uiw/react-md-editor';
import Sidebar from './sidebar';
import Header from './header';
import Alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function Editor() {

    const [showDeleteDoc, setDeleteDocButton] = useState(true);
    const [fullWidthEditor, setfullWidthEditor] = useState(true);
    //pass value parent to child
    //const [passLocalStorage, setLocalStorageValue] = React.useState([])

    useEffect((passLocalStorageData) => {
        var passLocalStorageData = JSON.parse(localStorage.getItem("files"));
        if (passLocalStorageData) {
            setValue(passLocalStorageData?.[0]?.value)
            setCurrentDoc(passLocalStorageData?.[0])
            setUntitledDoc(passLocalStorageData)
        }
        setfullWidthEditor(showSidebar)
    }, []);

    const [value, setValue] = React.useState('');
    const [currentDoc, setCurrentDoc] = React.useState({
        id: 0,
        title: 'Untitled Document.md',
        value: ''
    });
    const [untitledDoc, setUntitledDoc] = useState([
        {
            id: 0,
            title: 'Untitled Document.md',
            value: ''
        }
    ]);

    const handleSetValue = (value) => {
        setValue(value)
        let docs = [...untitledDoc]
        //var curDoc = docs.find((doc) => doc?.id === currentDoc?.id)
        const index = docs.findIndex(object => {
            return object.id === currentDoc?.id;
        });
        docs[index]['value'] = value;
        setUntitledDoc(docs)
    }

    const [showSidebar, setShowSidebar] = React.useState(false);

    const handleOnToggle = () => {
        setShowSidebar(!showSidebar)
        setfullWidthEditor(!showSidebar)
    }
    // current Doc
    const handleShowDocument = (doc) => {
        setValue(doc?.value)
        setCurrentDoc(doc)
        localStorage.setItem('currentDocument', JSON.stringify(doc));
    }

    const handleNewDocClick = (newDoc) => {
        setUntitledDoc([...untitledDoc, newDoc])
        setCurrentDoc(newDoc)
        setValue(newDoc?.value)
    }

    const saveUntitledDouument = () => {
        localStorage.setItem('files', JSON.stringify(untitledDoc));
        localStorage.setItem('currentDocument', JSON.stringify(currentDoc));
        Alertify.success('Document Saved.');
    }

    const deleteUntitledDouument = () => {
        localStorage.removeItem('currentDocument');
        var files = JSON.parse(localStorage.getItem("files"));
        files.splice(currentDoc?.id, 1);
        localStorage.setItem('files', JSON.stringify(files));
        setUntitledDoc(files)
        //let lastElement = files[files.length - 1];
        var first = [...files].shift();
        setCurrentDoc(first)
        setValue(first?.value)
        if (files.length === 1) {
            setDeleteDocButton(false);
        } else {
            setDeleteDocButton(true);
        }
        Alertify.error('Document Delete.');
    }

    // change menu title
    const handleDocTitleChange = (item) => {
        let docs = [...untitledDoc]
        const index = docs.findIndex(object => {
            return object.id === item?.id;
        });
        docs[index] = item;
        setUntitledDoc(docs)
        setCurrentDoc(item)
    }

    // Drag Drop change editor value
    const onDragDrop = (items, index) => {
        setUntitledDoc(items)
        const curDoc = items.find(object => {
            return object.id === index;
        });
        setCurrentDoc(curDoc)
        setValue(curDoc.value)
        localStorage.setItem('files', JSON.stringify(items));
    }

    return (
        <>
            <Sidebar showSidebar={showSidebar} editorValue={value} showDocument={handleShowDocument} untitledDocs={untitledDoc}
                handleNewDocClick={handleNewDocClick} saveUntitledDouument={saveUntitledDouument} deleteUntitledDouument={deleteUntitledDouument}
                showDeleteDoc={showDeleteDoc} currentDoc={currentDoc} handleDocTitleChange={handleDocTitleChange} onDragDrop={onDragDrop}/>
            <Header onToggle={handleOnToggle} />
            <div className={fullWidthEditor ? "show-sidebar" : "wmde-markdown-var"}>
                <MDEditor
                    value={value}
                    onChange={(value) => handleSetValue(value)}
                />
            </div>
        </>
    );
}

export default Editor;