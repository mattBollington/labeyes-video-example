import { render, screen } from "@testing-library/react";
import Sidebar from "../Sidebar";

describe("<Sidebar />", () => {
  const mockSetVideoSource = jest.fn();
  const mockSetDataSource = jest.fn();
  it("renders without crashing", () => {
    render(
      <Sidebar
        currentAnnotation={null}
        setVideoSource={mockSetVideoSource}
        setDataSource={mockSetDataSource}
      />
    );
    const sidebarElement = screen.getByRole("complementary");
    expect(sidebarElement).toBeInTheDocument();
  });

  it("renders the correct number of video items", () => {
    render(
      <Sidebar
        currentAnnotation={null}
        setVideoSource={mockSetVideoSource}
        setDataSource={mockSetDataSource}
      />
    );
    const videoItems = screen.getAllByRole("listitem");
    expect(videoItems).toHaveLength(3);
  });

  it("renders each video with the correct text", () => {
    render(
      <Sidebar
        currentAnnotation={null}
        setVideoSource={mockSetVideoSource}
        setDataSource={mockSetDataSource}
      />
    );
    expect(screen.getByText("Labeyes video 1")).toBeInTheDocument();
    expect(screen.getByText("Labeyes video 2")).toBeInTheDocument();
    expect(screen.getByText("Labeyes video 3")).toBeInTheDocument();
  });
});
