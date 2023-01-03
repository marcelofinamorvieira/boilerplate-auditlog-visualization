import { ButtonGroup, ButtonGroupButton } from "datocms-react-ui";
import { useState } from "react";

type TimeFrame = "day" | "week" | "month" | "year";

export default function TimeFrameTab() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("month");

  const isSelected = (option: TimeFrame) => {
    return timeFrame === option;
  };

  return (
    <ButtonGroup>
      <ButtonGroupButton
        selected={isSelected("day")}
        onClick={() => {
          setTimeFrame("day");
        }}
      >
        Today
      </ButtonGroupButton>
      <ButtonGroupButton
        selected={isSelected("week")}
        onClick={() => {
          setTimeFrame("week");
        }}
      >
        This week
      </ButtonGroupButton>
      <ButtonGroupButton
        selected={isSelected("month")}
        onClick={() => {
          setTimeFrame("month");
        }}
      >
        This month
      </ButtonGroupButton>
      <ButtonGroupButton
        selected={isSelected("year")}
        onClick={() => {
          setTimeFrame("year");
        }}
      >
        This year
      </ButtonGroupButton>
    </ButtonGroup>
  );
}
