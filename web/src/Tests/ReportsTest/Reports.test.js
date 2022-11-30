import '@testing-library/jest-dom';
import {render} from "@testing-library/react";
import ReportsOverview from "../../pages/Reports/ReportsOverview";

test('on render the load page is shown', () => {
    render(<ReportsOverview></ReportsOverview>)

});

//TODO: Create these