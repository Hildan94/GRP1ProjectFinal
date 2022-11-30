import { render, screen, cleanup } from '@testing-library/react';
import Quiz from "../../pages/Quiz/CreateQuiz";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (jest.fn())
}));

test('Create test', () => {
    render(<Quiz/>)
    //const quizName = screen.getByText(/quiz navn/i);
    //expect(quizName).toBeInTheDocument();
});