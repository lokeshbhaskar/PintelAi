import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { describe, test, beforeEach, expect } from "vitest";

import OrgPage from "../page/OrgPage";

const mockAxios = new AxiosMockAdapter(axios);

const orgId = 1;
const mockOrg = {
    id: orgId,
    name: "Pintel Ai",
    credits: 120,
    allotments: [{ credits: 30 }, { credits: 50 }]
};

describe("OrgPage", () => {

    beforeEach(() => {
        mockAxios.reset();
    });

    
    // 1. Test: should render organization details and total credits
    test("renders organization details and correct total credits", async () => {
        mockAxios
            .onGet(`http://localhost:8000/orgs/${orgId}/credits`)
            .reply(200, mockOrg);

        render(
            <MemoryRouter initialEntries={[`/org/${orgId}`]}>
                <Routes>
                    <Route path="/org/:id" element={<OrgPage />} />
                </Routes>
            </MemoryRouter>
        );

        
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();

        
        await waitFor(() => {
            expect(screen.getByText("Pintel Ai")).toBeInTheDocument();
        });
        expect(screen.getByText("200")).toBeInTheDocument();
    });

     
    // 2. Test: submitting credit request should show confirmation & clear input
    test.only("submits credit request and shows pending message", async () => {
        mockAxios
            .onGet(`http://localhost:8000/orgs/${orgId}/credits`)
            .reply(200, mockOrg);

        mockAxios
            .onPost(`http://localhost:8000/org/${orgId}/credits/requests`)
            .reply(200, {
                message: "Credit request created. Pending Approval",
                request: { org_id: 1, credits: 60 }
            });

        render(
            <MemoryRouter initialEntries={[`/org/${orgId}`]}>
                <Routes>
                    <Route path="/org/:id" element={<OrgPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Pintel Ai")).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText("Enter credits");
        const button = screen.getByRole("button", { name: /request allotment/i });

        await userEvent.type(input, "60");
        await userEvent.click(button);
        await waitFor(() => {
            expect(
                screen.getByText(/Pending approval/i)
            ).toBeInTheDocument();
        });
        expect(input.value).toBe("");
    });

});
