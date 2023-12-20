import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import React, {useCallback, useState} from "react";
import TodoCardService from "../services/todoCardService";
import {isEmpty} from "lodash";
import TodoCard from "./TodoCard";

const Home = () => {
const [todoCards, setTodoCards] = useState([])
    const deleteCard = useCallback((cardToDelete)=>{
        setTodoCards([...TodoCardService.deleteTodoCard(cardToDelete,  todoCards)])
    },[todoCards])

    const addCard = useCallback(()=>{
        const id = isEmpty(todoCards) ? 1 : todoCards[todoCards.length - 1].id + 1
        const newCards = TodoCardService.addTodoCard({id, task: ''}, todoCards)
        setTodoCards([...newCards])
    },[todoCards])

    const editCard = useCallback((newCard)=>{
        const newCards = TodoCardService.editTodoCard(newCard, todoCards)
        setTodoCards([...newCards])
    },[todoCards])
return (
    <div data-testid={'homepage'} style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{height: '80vh', width: '300px', backgroundColor: '#0079bf', marginTop: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto'}}>



 <div style={{display: "flex", justifyContent: 'flex-start', flexDirection: 'column'}}>
     {todoCards.map((card)=>{
         return <TodoCard card={card} deleteCard={deleteCard} editCard={editCard}/>
     })}
 </div>
        <div style={{display: 'flex', justifyContent:
                'flex-end', margin: '8px'}}>
            <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faPlus} color={'white'} onClick={addCard}/>
        </div>
    </div>
</div>)
}

export default Home;