import {render, screen} from "@testing-library/react";
import Home from "./Home";

describe('Home', ()=>{
    test('renders without crashing',()=>{
        const {container } = render(<Home />)
        expect(container).toBeTruthy()
        expect(screen.getByTestId('homepage')).toBeTruthy()
    })
})