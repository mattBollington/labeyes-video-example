import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../Header";

describe("<Header />", () => {
  it("renders the default title", () => {
    render(<Header />);
    expect(
      screen.getByText("Reach Industries Frontend Assessment")
    ).toBeInTheDocument();
  });
});
