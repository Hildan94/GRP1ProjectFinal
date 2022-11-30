import {QrCode} from "@mui/icons-material";
import {render, screen} from "@testing-library/react";
import Quiz from "../pages/quiz";

test('on render the load page is shown', () => {
    render(<Quiz/>)

    screen.debug();
});

test("Loading render is shown", () => {
    render(<Quiz/>)

    screen.debug();
    let button = screen.getByRole("button");
    expect(button).toHaveTextContent("Klik hvis der ikke sker noget");

});