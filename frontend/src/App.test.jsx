import {render, screen} from "@testing-library/react";
import App from "./App";

jest.mock('react-router-dom', () => ({
    Link: ({ children }) => <div>{children}</div>,
    Route: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
}));

describe('App', ()=>{
    test('renders without crashing',()=>{
        const {container } = render(<App />)
        expect(container).toBeTruthy()
        expect(screen.getByTestId('app')).toBeTruthy()
    })
})