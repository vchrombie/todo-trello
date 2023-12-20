import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import React, {useEffect, useState} from "react";

const TodoCard = (props) => {
    const {card, deleteCard, editCard} = props
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState(card.task)

    useEffect(()=>{
        const input = document.getElementById('task-input');
        if (input){
            input.focus();
            input.setSelectionRange(0,9999);
        }
    },[])

    return (    <div data-testid={'todo-card'} style={{height: 'fit-content', backgroundColor: '#c4c9cc', width: '250px', marginLeft: '22px', marginTop: '16px', padding: '8px'}}>
        <div style={{display: 'flex', justifyContent:
                'flex-end', margin: '4px', marginBottom: '8px'}}>
            {isEditing ?
                <FontAwesomeIcon data-testid={'save-icon'} style={{cursor: 'pointer'}} icon={faSave} onClick={()=>{
                    editCard({...card, task: inputValue})
                setIsEditing(false)}
                }/> :
                <FontAwesomeIcon data-testid={'edit-icon'} style={{cursor: 'pointer'}} icon={faPenToSquare} onClick={()=>{setIsEditing(true)}} />}
                </div>
        <div style={{backgroundColor: 'white', height:'fit-content', width: '100%'}} onClick={()=>{setIsEditing(true)}}>
            {isEditing ?
                <input id={'task-input'} style={{width: '100%', border: '2px solid blue',  }} type="text" name="task" value={inputValue} onChange={(e)=>{
                setInputValue(e.target.value)}
                }  /> :
            <span style={{margin: '4px'}}>{card.task}</span>}</div>
        <div style={{display: 'flex', justifyContent:
                'flex-end', margin: '4px', marginTop: '8px'}}>
            {!isEditing ? <FontAwesomeIcon data-testid={'delete-icon'} style={{cursor: 'pointer'}} icon={faTrash} onClick={()=>deleteCard(card)}/> : <div style={{height: '10px'}}></div>}
        </div>
    </div>)
}

export default TodoCard