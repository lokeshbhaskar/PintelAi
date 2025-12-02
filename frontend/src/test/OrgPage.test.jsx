import { expect, beforeEach, test } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrgPage from "../page/OrgPage";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mockAxios = new AxiosMockAdapter(axios)

const orgId = 2;
const orgData = [
    {
        id: orgId,
        name: "Amazon",
        credits: 300,
        allotments: [
            { credits: 0 },
        ]
    }
]

beforeEach(() => {
    mockAxios.reset();
});

// 1. Test to check if OrgPage renders org details correctly
test("renders details and base credits", async () => {
    mockAxios.onGet("http://localhost:8000/orgs/details").reply(200, orgData);

    render(
        <MemoryRouter initialEntries={[`/org/${orgId}`]}>
            <Routes>
                <Route path="/org/:id" element={<OrgPage />} />
            </Routes>
        </MemoryRouter>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText("Amazon")).toBeInTheDocument();
        expect(screen.getByText("300")).toBeInTheDocument();
    });
});

//2. Testing  adding credits updates the allotments correctly
test.only("adds credits and updates allotments", async () => {
    mockAxios.onGet("http://localhost:8000/orgs/details").reply(200, orgData);
    mockAxios.onPost(`http://localhost:8000/org/${orgId}/credits`).reply(200, {
        message: "Credits added successfully",
        allotments: [
            { credits: 50 },
            { credits: 100 },
            { credits: 100 }
        ]
    });
    render(
        <MemoryRouter initialEntries={[`/org/${orgId}`]}>
            <Routes>
                <Route path="/org/:id" element={<OrgPage />} />
            </Routes>
        </MemoryRouter>
    );
    await waitFor(() => {
        expect(screen.getByText("Amazon")).toBeInTheDocument();
    });
    const input = screen.getByPlaceholderText("Enter credits");
    // const button = screen.getAllByText("Add Credits")[1];
    const button = screen.getByRole("button", { name: /add credits/i });
    await userEvent.type(input, "100");
    await userEvent.click(button);
    await waitFor(() => {
        expect(screen.getByText("550")).toBeInTheDocument();
    });
});