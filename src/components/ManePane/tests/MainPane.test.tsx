import React from "react";
import { render, screen } from "@testing-library/react";
import MainPane from "../ManePane";

describe("<MainPane />", () => {
  it("renders without crashing", () => {
    render(<MainPane videoSrc="sample.mp4" />);
    const videoFallbackText = screen.getByText(
      "Your browser does not support the video tag."
    );
    expect(videoFallbackText).toBeInTheDocument();
  });

  it("renders the video element", () => {
    render(<MainPane videoSrc="sample.mp4" />);
    const videoElement = screen.getByTestId("video-element");
    expect(videoElement).toBeInTheDocument();
  });

  it("uses the videoSrc prop as the video source", () => {
    const sampleVideoSrc = "sample.mp4";
    render(<MainPane videoSrc={sampleVideoSrc} />);
    const sourceElement = screen.getByTestId("video-source");
    expect(sourceElement).toHaveAttribute("src", sampleVideoSrc);
  });
});
