import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../Header";
import { Annotation } from "../../../types/types";

describe("<Header />", () => {
  it("renders the default title", () => {
    const annotationData: Annotation[] | null = null;
    render(<Header annotationData={annotationData} />);
    expect(
      screen.getByText("Reach Industries Frontend Assessment")
    ).toBeInTheDocument();
  });
});
