import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step2Baseline from "../Step2Baseline";

describe("Step2Baseline", () => {
  it("renders step header with correct step number", () => {
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );
    expect(screen.getByText("guidedIntake")).toBeInTheDocument();
  });

  it("renders all cash buffer options", () => {
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );
    expect(screen.getByText("step2.options.under1")).toBeInTheDocument();
    expect(screen.getByText("step2.options.1-3")).toBeInTheDocument();
    expect(screen.getByText("step2.options.3-6")).toBeInTheDocument();
    expect(screen.getByText("step2.options.6+")).toBeInTheDocument();
  });

  it("renders team size input field", () => {
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );
    const input = screen.getByPlaceholderText(
      "step2.sidebar.teamSize.placeholder",
    );
    expect(input).toBeInTheDocument();
  });

  it("calls onChangeCashBuffer when cash buffer option is clicked", async () => {
    const user = userEvent.setup();
    const onChangeCashBuffer = vi.fn();
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={onChangeCashBuffer}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );

    const option = screen.getByText("step2.options.3-6").closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeCashBuffer).toHaveBeenCalledWith("3-6");
  });

  it("calls onChangeTeamSize when team size input changes", async () => {
    const user = userEvent.setup();
    const onChangeTeamSize = vi.fn();
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={onChangeTeamSize}
        onChangeUtilization={vi.fn()}
      />,
    );

    const input = screen.getByPlaceholderText(
      "step2.sidebar.teamSize.placeholder",
    );
    await user.type(input, "18");
    expect(onChangeTeamSize).toHaveBeenCalled();
  });

  it("renders all utilization options", () => {
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );
    expect(
      screen.getByText("step2.sidebar.utilization.options.full"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("step2.sidebar.utilization.options.stretched"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("step2.sidebar.utilization.options.bench"),
    ).toBeInTheDocument();
  });

  it("calls onChangeUtilization when utilization option is clicked", async () => {
    const user = userEvent.setup();
    const onChangeUtilization = vi.fn();
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={onChangeUtilization}
      />,
    );

    const option = screen
      .getByText("step2.sidebar.utilization.options.bench")
      .closest("div");
    if (option) {
      await user.click(option);
    }
    expect(onChangeUtilization).toHaveBeenCalledWith("bench");
  });

  it("displays selected cash buffer option", () => {
    render(
      <Step2Baseline
        cashBuffer="1-3"
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );

    expect(screen.getByText("step2.options.1-3")).toBeInTheDocument();
  });

  it("displays team size input value", () => {
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize="20"
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );

    const input = screen.getByDisplayValue("20");
    expect(input).toBeInTheDocument();
  });

  it("displays selected utilization option", () => {
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization="stretched"
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );

    expect(
      screen.getByText("step2.sidebar.utilization.options.stretched"),
    ).toBeInTheDocument();
  });

  it("renders step title and subtitle", () => {
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );
    expect(screen.getByText("step2.title")).toBeInTheDocument();
    expect(screen.getByText("step2.subtitle")).toBeInTheDocument();
  });

  it("renders sidebar title", () => {
    render(
      <Step2Baseline
        cashBuffer=""
        teamSize=""
        utilization=""
        onChangeCashBuffer={vi.fn()}
        onChangeTeamSize={vi.fn()}
        onChangeUtilization={vi.fn()}
      />,
    );
    expect(screen.getByText("step2.sidebar.title")).toBeInTheDocument();
  });
});
