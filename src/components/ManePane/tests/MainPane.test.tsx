import { render, screen } from "@testing-library/react";
import MainPane from "../MainPane";

describe("<MainPane />", () => {
  const mockSetCurrentAnnotation = jest.fn();
  const mockSetAnnotationData = jest.fn();
  it("renders without crashing", () => {
    render(
      <MainPane
        setCurrentAnnotation={mockSetCurrentAnnotation}
        setAnnotationData={mockSetAnnotationData}
        videoSource="path/to/mockVideoSource.mp4"
        dataSource="path/to/mockJSONSource.json"
      />
    );
    const videoFallbackText = screen.getByText(
      "Your browser does not support the video tag."
    );
    expect(videoFallbackText).toBeInTheDocument();
  });

  it("renders the video element", () => {
    render(
      <MainPane
        setCurrentAnnotation={mockSetCurrentAnnotation}
        setAnnotationData={mockSetAnnotationData}
        videoSource="path/to/mockVideoSource.mp4"
        dataSource="path/to/mockJSONSource.json"
      />
    );
    const videoElement = screen.getByTestId("video-element");
    expect(videoElement).toBeInTheDocument();
  });

  it("accesses video source", () => {
    render(
      <MainPane
        setCurrentAnnotation={mockSetCurrentAnnotation}
        setAnnotationData={mockSetAnnotationData}
        videoSource="path/to/mockVideoSource.mp4"
        dataSource="path/to/mockJSONSource.json"
      />
    );
    const sourceElement = screen.getByTestId("video-source");
    expect(sourceElement).toHaveAttribute("src", "");
  });
});
