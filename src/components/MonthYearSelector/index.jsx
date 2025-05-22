import { useState, useEffect } from 'react';
import {
  Container,
  DropdownWrapper,
  DropdownHeader,
  DropdownList,
  DropdownItem,
  IconWrapper
} from './styles';
import { FiChevronDown } from 'react-icons/fi';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const MonthYearSelector = ({ userRegisterYear, onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = userRegisterYear; y <= currentYear; y++) {
    years.push(y);
  }

  useEffect(() => {
    onChange({ month: selectedMonth, year: selectedYear });
  }, [selectedMonth, selectedYear]);

  const toggleMonth = () => {
    setIsMonthOpen(!isMonthOpen);
    setIsYearOpen(false);
  };

  const toggleYear = () => {
    setIsYearOpen(!isYearOpen);
    setIsMonthOpen(false);
  };

  const closeAll = () => {
    setIsMonthOpen(false);
    setIsYearOpen(false);
  };

  return (
    <Container onBlur={closeAll} tabIndex={-1}>
      <DropdownWrapper>
        <DropdownHeader onClick={toggleMonth}>
          {months[selectedMonth]}
          <IconWrapper open={isMonthOpen}>
            <FiChevronDown />
          </IconWrapper>
        </DropdownHeader>
        {isMonthOpen && (
          <DropdownList>
            {months.map((name, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  setSelectedMonth(index);
                  setIsMonthOpen(false);
                }}
              >
                {name}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownWrapper>

      <DropdownWrapper>
        <DropdownHeader onClick={toggleYear}>
          {selectedYear}
          <IconWrapper open={isYearOpen}>
            <FiChevronDown />
          </IconWrapper>
        </DropdownHeader>
        {isYearOpen && (
          <DropdownList>
            {years.map((year) => (
              <DropdownItem
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setIsYearOpen(false);
                }}
              >
                {year}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownWrapper>
    </Container>
  );
};

export default MonthYearSelector;
