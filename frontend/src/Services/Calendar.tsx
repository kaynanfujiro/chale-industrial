import { pt } from "date-fns/locale";
import { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  reservedDates: { startDate: Date; endDate: Date }[]; // Recebe as datas reservadas
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange, reservedDates }) => {
  const [selection, setSelection] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);

  const handleChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    const validStartDate = startDate ?? undefined;
    const validEndDate = endDate ?? undefined;

    setSelection([{ ...selection[0], startDate: validStartDate, endDate: validEndDate }]);
    onDateChange(validStartDate, validEndDate);
  };

  return (
    <div>
      <DateRange
        ranges={selection}
        onChange={handleChange}
        minDate={new Date()}
        rangeColors={["#FF5A5F"]}
        locale={pt}
        disabledDates={reservedDates.flatMap((reserved) => {
          const disabledDays = [];
          let currentDate = new Date(reserved.startDate);
          while (currentDate <= reserved.endDate) {
            disabledDays.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return disabledDays;
        })}
      />
    </div>
  );
};

export default Calendar;
