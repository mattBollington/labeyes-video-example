import React from "react";
import { render, screen } from "@testing-library/react";
import MainPane from "../ManePane";

describe("<MainPane />", () => {
  it("renders without crashing", () => {
    render(<MainPane />);
    const videoFallbackText = screen.getByText(
      "Your browser does not support the video tag."
    );
    expect(videoFallbackText).toBeInTheDocument();
  });

  it("renders the video element", () => {
    render(<MainPane />);
    const videoElement = screen.getByTestId("video-element");
    expect(videoElement).toBeInTheDocument();
  });

  it("accesses video source", () => {
    // mock api call
    render(<MainPane />);
    const sourceElement = screen.getByTestId("video-source");
    expect(sourceElement).toHaveAttribute("src", "");
  });
});
