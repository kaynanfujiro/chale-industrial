import { useState } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [selection, setSelection] = useState<Range[]>([
    {
      startDate: new Date(),  // Inicializa com uma data válida
      endDate: undefined,     // Mantenha como undefined para seguir o tipo esperado
      key: "selection",
    },
  ]);

  const handleChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    // Converte null para undefined, que é o que a interface espera
    const validStartDate = startDate ?? undefined;  // Usando null coalescing para tratar null
    const validEndDate = endDate ?? undefined;      // Usando null coalescing para tratar null
    
    setSelection([{ ...selection[0], startDate: validStartDate, endDate: validEndDate }]);
    onDateChange(validStartDate, validEndDate);  // Passando valores corretamente para onDateChange
  };

  return (
    <div>
      <DateRange
        ranges={selection}
        onChange={handleChange}
        minDate={new Date()}
        rangeColors={["#FF5A5F"]}
      />
    </div>
  );
};

export default Calendar;