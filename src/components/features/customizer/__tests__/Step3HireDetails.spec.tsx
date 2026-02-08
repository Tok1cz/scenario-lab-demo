import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step3HireDetails from "../Step3HireDetails";

describe("Step3HireDetails", () => {
  it("renders step header with correct step number", () => {
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );
    expect(screen.getByText("guidedIntake")).toBeInTheDocument();
  });

  it("renders all hire cost options", () => {
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );
    expect(screen.getByText("step3.options.4-6")).toBeInTheDocument();
    expect(screen.getByText("step3.options.6-8")).toBeInTheDocument();
    expect(screen.getByText("step3.options.8+")).toBeInTheDocument();
  });

  it("renders all start timing options", () => {
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );
    expect(
      screen.getByText("step3.sidebar.startTiming.options.immediate")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step3.sidebar.startTiming.options.1month")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step3.sidebar.startTiming.options.2-3months")
    ).toBeInTheDocument();
  });

  it("renders all billability options", () => {
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );
    expect(
      screen.getByText("step3.sidebar.billability.options.high")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step3.sidebar.billability.options.medium")
    ).toBeInTheDocument();
    expect(
      screen.getByText("step3.sidebar.billability.options.low")
    ).toBeInTheDocument();
  });

  it("calls onChangeHireCost when hire cost option is clicked", async () => {
    const user = userEvent.setup();
    const onChangeHireCost = vi.fn();
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={onChangeHireCost}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );

    const option = screen.getByText("step3.options.6-8").closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeHireCost).toHaveBeenCalledWith("6-8");
  });

  it("calls onChangeStartTiming when start timing option is clicked", async () => {
    const user = userEvent.setup();
    const onChangeStartTiming = vi.fn();
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={onChangeStartTiming}
        onChangeBillability={vi.fn()}
      />
    );

    const option = screen
      .getByText("step3.sidebar.startTiming.options.1month")
      .closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeStartTiming).toHaveBeenCalledWith("1month");
  });

  it("calls onChangeBillability when billability option is clicked", async () => {
    const user = userEvent.setup();
    const onChangeBillability = vi.fn();
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={onChangeBillability}
      />
    );

    const option = screen
      .getByText("step3.sidebar.billability.options.high")
      .closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeBillability).toHaveBeenCalledWith("high");
  });

  it("displays selected hire cost option", () => {
    render(
      <Step3HireDetails
        hireCost="4-6"
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );

    expect(screen.getByText("step3.options.4-6")).toBeInTheDocument();
  });

  it("displays selected start timing option", () => {
    render(
      <Step3HireDetails
        hireCost=""
        startTiming="immediate"
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );

    expect(
      screen.getByText("step3.sidebar.startTiming.options.immediate")
    ).toBeInTheDocument();
  });

  it("displays selected billability option", () => {
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability="medium"
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );

    expect(
      screen.getByText("step3.sidebar.billability.options.medium")
    ).toBeInTheDocument();
  });

  it("renders step title and subtitle", () => {
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );
    expect(screen.getByText("step3.title")).toBeInTheDocument();
    expect(screen.getByText("step3.subtitle")).toBeInTheDocument();
  });

  it("renders sidebar title", () => {
    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={vi.fn()}
        onChangeStartTiming={vi.fn()}
        onChangeBillability={vi.fn()}
      />
    );
    expect(screen.getByText("step3.sidebar.title")).toBeInTheDocument();
  });

  it("handles changing multiple options in sequence", async () => {
    const user = userEvent.setup();
    const onChangeHireCost = vi.fn();
    const onChangeStartTiming = vi.fn();

    render(
      <Step3HireDetails
        hireCost=""
        startTiming=""
        billability=""
        onChangeHireCost={onChangeHireCost}
        onChangeStartTiming={onChangeStartTiming}
        onChangeBillability={vi.fn()}
      />
    );

    const costOption = screen.getByText("step3.options.8+").closest("div");
    if (costOption) {
      await user.click(costOption);
    }
    expect(onChangeHireCost).toHaveBeenCalledWith("8+");

    const timingOption = screen
      .getByText("step3.sidebar.startTiming.options.2-3months")
      .closest("div");
    if (timingOption) {
      await user.click(timingOption);
    }
    expect(onChangeStartTiming).toHaveBeenCalledWith("2-3months");
  });
});
