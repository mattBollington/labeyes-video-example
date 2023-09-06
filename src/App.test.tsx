import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";

describe("<App />", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the App component", () => {
    const appContainer = screen.getByTestId("app-container");
    expect(appContainer).toBeInTheDocument();
  });

  it("renders the Sidebar component", () => {
    const sidebarElement = screen.getByTestId("sidebar");
    expect(sidebarElement).toBeInTheDocument();
  });

  it("renders the Header component", () => {
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the MainPane component with correct videoSrc", () => {
    const sourceElement = screen.getByTestId("video-source");
    expect(sourceElement).toHaveAttribute(
      "src",
      "https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.mp4"
    );
  });
});
