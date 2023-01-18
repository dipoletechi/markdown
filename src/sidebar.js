import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 269
});

function Sidebar({ showSidebar, editorValue, showDocument, untitledDocs, handleNewDocClick, saveUntitledDouument,
  deleteUntitledDouument, showDeleteDoc, currentDoc, handleDocTitleChange, onDragDrop }) {

  useEffect(() => {
    setActive(currentDoc?.id)
  }, [currentDoc])

  //Create Verbal
  const [showUnTitledDoc, setShowUnTitleDoc] = useState(false);
  const [isEdit, setIsEdit] = useState('');


  const [active, setActive] = useState(0);
  //MENU color change
  const deleteDoc = (e) => {
    deleteUntitledDouument();
    const index = parseInt(untitledDocs[0].id);
    if (index !== active) {
      setActive(index);
    }

  }
  //click event add menu
  const handleOnNewDocument = () => {
    // setDocuments({ ...documents, ['document' + Object.keys(documents).length + 1]: '' })
    let array = [];
    array.push('Untitled Document.md');
    var maxID = Math.max(...untitledDocs.map(val => val.id))

    const newDoc = {
      id: (maxID + 1),
      title: 'Untitled Document.md',
      value: ''

    }
    const index = parseInt(newDoc.id);
    if (index !== active) {
      setActive(index);
    }
    handleNewDocClick(newDoc)

  }

  //click event show hide
  const addNewDocument = () => {
    if (showUnTitledDoc) {
      setShowUnTitleDoc(false);
    }
    else {
      setShowUnTitleDoc(true);
    }
  }

  const showUntitledDouument = (e, item) => {
    console.log(item)
    showDocument(item)
    const index = parseInt(item.id);
    if (index !== active) {
      setActive(index);
    }
  }
  // edit input value
  const editMenu = (item) => {
    setIsEdit(item.id)
  }

  const saveTitle = (item) => {
    setIsEdit('')
    localStorage.setItem('files', JSON.stringify(untitledDocs));
  }

  const changeDocTitle = (e, item) => {
    item.title = e.target.value
    handleDocTitleChange(item)
  }

  //Drag Drop Document
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      untitledDocs,
      result.source.index,
      result.destination.index
    );
    var docId = untitledDocs[result.source.index].id
    onDragDrop(items, docId);

  }


  return (
    <>
      <div className={`sidebar-wrapper ${showSidebar ? 'show' : 'hide'}`}>
        <div className="sidebar ng-scope" >
          <h2 className="sidebar-branding">
            Editor
          </h2>
          <nav className="nav nav-sidebar">
            <ul className="menu menu-sidebar">
              <li className="menu-item menu-item--documents in-sidebar">
                <a className="menu-link document-dropdown" onClick={addNewDocument}>
                  <span>Documents</span> <span className="caret"></span></a>
                {/* {!showUnTitledDoc && untitledDocs && untitledDocs.length > 0 && untitledDocs.map((item, i) => (
                                    <ul className="documents sidebar-list collapse in" key={i}>
                                        <li key={i}>                                        
                                            <a id={item.id} className={active === item.id ? "ng-binding-active" : "ng-binding"} onClick={(e) => showUntitledDouument(e, item)} onMouseOver={dragDropList}>
                                            </a>
                                            {isEdit === item.id ?
                                                <span className='icon' onClick={(e) => saveTitle(item)}>Save</span>
                                                :
                                                <span className='icon' onClick={(e) => editMenu(item)}>Edit</span>
                                            }

                                        </li>
                                    </ul>
                                ))
                                } */}
                <div className='all-document'>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          {!showUnTitledDoc && untitledDocs && untitledDocs.length > 0 && untitledDocs.map((item, index) => (
                            <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index} >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                  onClick={(e) => showUntitledDouument(e, item)}
                                  className={active === item.id ? "ng-binding-active" : "ng-binding"}
                                >
                                  <span className='menu-item-style'>
                                    {isEdit === item.id ?
                                      <input disabled={false} value={item?.title} onChange={(e) => changeDocTitle(e, item)} />
                                      :
                                      item.title
                                    }
                                  </span>
                                  {isEdit === item.id ?
                                    <span className='icon' onClick={(e) => saveTitle(item)}>Save</span>
                                    :
                                    <span className='icon' onClick={(e) => editMenu(item)}>Edit</span>
                                  }
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>

              </li>
            </ul>
          </nav>
          <a className="btn btn--new" onClick={handleOnNewDocument}>New Document</a>
          <a className="btn btn--save" onClick={saveUntitledDouument}>Save Session</a>
          {showDeleteDoc && <a className="btn btn--delete ng-scope" onClick={(e) => deleteDoc(e)}>Delete Document</a>}
        </div>
      </div>
    </ >
  )
}

export default Sidebar;
