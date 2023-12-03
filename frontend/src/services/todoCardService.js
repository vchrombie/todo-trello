
const getTodoCards = () => {
    // return axios.get(API_URL + "user", { headers: authHeader() });
    return [{id: 1,task: 'Buy Groceries'},{id: 2, task: 'Clean home'},{id: 3, task: 'Laundry'},{id: 4, task: 'Walk' +
            ' the dog'}]
};

const deleteTodoCard = (cardToDelete, cards) => {
    return cards.filter((card)=>{
        return card.id !== cardToDelete.id
    })
}

const addTodoCard = (cardToAdd, cards) => {
    const isDuplicateTask = cards.some((card)=> cardToAdd.id === card.id)
    if (!isDuplicateTask){
        cards.push(cardToAdd)
    }
    return cards
}

const editTodoCard = (newCard, cards) => {
    return cards.map((card)=>{
        if (card.id === newCard.id){
            card.task = newCard.task
            return card;
        }else{
            return card;
        }
    })
}

const TodoCardService = {
getTodoCards, deleteTodoCard, addTodoCard, editTodoCard
};

export default TodoCardService;