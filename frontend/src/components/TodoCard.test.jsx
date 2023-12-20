import TodoCard from "./TodoCard";
import {screen, render, fireEvent} from "@testing-library/react";

const mockEditCard = jest.fn()
const mockDeleteCard = jest.fn()
const mockCard = {id: 1, task: 'Buy groceries'}

describe('TodoCard', ()=>{
    it('should render without crashing',   ()=> {
        const {container} =  render(<TodoCard card={mockCard} deleteCard={mockDeleteCard} editCard={mockEditCard} />)
        expect(container).toBeTruthy()
        expect(screen.getByText('Buy groceries')).toBeTruthy()
    });

    it('edits the card',   ()=> {
        render(<TodoCard card={mockCard} deleteCard={mockDeleteCard} editCard={mockEditCard} />)
        const editIcon = screen.getByTestId('edit-icon')
        fireEvent.click(editIcon)
        const saveIcon = screen.getByTestId('save-icon')
        fireEvent.click(saveIcon)
        expect(mockEditCard).toBeCalled()
    });

    it('deletes the card',   ()=> {
        render(<TodoCard card={mockCard} deleteCard={mockDeleteCard} editCard={mockEditCard} />)
        const deleteIcon = screen.getByTestId('delete-icon')
        fireEvent.click(deleteIcon)
        expect(mockDeleteCard).toBeCalled()
    });
})