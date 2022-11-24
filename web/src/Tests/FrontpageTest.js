import {render} from "react-dom";
import ReportsOverview from "../pages/Reports/ReportsOverview";
import {screen} from "@testing-library/react";

test('shows reportpage',() =>{
    render(<ReportsOverview/>);
    const linkElement = screen.getByText('Oversigt over resultater');
    expect(linkElement).toBeInTheDocument();
});

test('has button', ()=>{
    render(<ReportsOverview />);
    let button = screen.getByRole("button");
    expect(button).toHaveTextContent("Lav Rapport");
})
