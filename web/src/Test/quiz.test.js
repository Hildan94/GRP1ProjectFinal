import {QrCode} from "@mui/icons-material";
import {render, screen} from "@testing-library/react";
import Quiz from "../pages/quiz";

test('on render the load page is shown', () => {
    render(<Quiz></Quiz>)

    screen.debug();
});

test("next question", () => {
    render(<Quiz/>)

    screen.debug();
    const quizLoadHeader = screen.getByTestId("quiz_load");

});