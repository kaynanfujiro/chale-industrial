import { pt } from "date-fns/locale";
import { useState, useEffect } from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  reservedDates: { startDate: Date; endDate: Date }[];
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange, reservedDates }) => {
  const [selection, setSelection] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);

  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  // Processar as datas reservadas quando o componente for montado ou quando as reservas mudarem
  useEffect(() => {
    console.log("Processando datas reservadas no Calendar:", reservedDates);
    
    const allDisabledDates: Date[] = [];
    
    reservedDates.forEach(reserved => {
      const start = new Date(reserved.startDate);
      const end = new Date(reserved.endDate);
      
      // Garantir que as datas são válidas
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.warn("Data inválida encontrada:", reserved);
        return;
      }
      
      let currentDate = new Date(start);
      
      // Adiciona cada dia entre a data de início e fim
      while (currentDate <= end) {
        allDisabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    console.log("Total de datas desabilitadas:", allDisabledDates.length);
    setDisabledDates(allDisabledDates);
  }, [reservedDates]);

  const handleChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    const validStartDate = startDate ?? undefined;
    const validEndDate = endDate ?? undefined;

    // Verifica se as datas selecionadas não conflitam com datas reservadas
    let isRangeValid = true;
    if (validStartDate && validEndDate) {
      const start = new Date(validStartDate);
      const end = new Date(validEndDate);
      
      // Verifica se alguma data no intervalo selecionado está desabilitada
      let checkDate = new Date(start);
      while (checkDate <= end) {
        const conflictingDate = disabledDates.find(
          d => d.getDate() === checkDate.getDate() && 
               d.getMonth() === checkDate.getMonth() && 
               d.getFullYear() === checkDate.getFullYear()
        );
        
        if (conflictingDate) {
          isRangeValid = false;
          break;
        }
        
        checkDate.setDate(checkDate.getDate() + 1);
      }
    }

    // Se o intervalo for válido, atualiza a seleção
    if (isRangeValid) {
      setSelection([{ ...selection[0], startDate: validStartDate, endDate: validEndDate }]);
      onDateChange(validStartDate, validEndDate);
    } else {
      // Caso contrário, mantém apenas a data de início
      setSelection([{ ...selection[0], startDate: validStartDate, endDate: undefined }]);
      onDateChange(validStartDate, undefined);
      alert("O período selecionado inclui datas já reservadas. Por favor, selecione outro período.");
    }
  };

  return (
    <div>
      <DateRange
        ranges={selection}
        onChange={handleChange}
        minDate={new Date()}
        rangeColors={["#FF5A5F"]}
        locale={pt}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default Calendar;