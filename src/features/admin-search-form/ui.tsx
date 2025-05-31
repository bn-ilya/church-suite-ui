import { Input, Select, SelectItem, Switch } from "@heroui/react";
import { useEffect, useState } from "react";

export interface SearchParams {
  field: string;
  value: string;
  operator?: string;
}

interface AdminSearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export const AdminSearchForm = ({ onSearch }: AdminSearchFormProps) => {
  const [searchField, setSearchField] = useState<string>("data.users.0.name");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isVolunteer, setIsVolunteer] = useState<boolean>(false);
  const [operator, setOperator] = useState<string>("regex");

  // Функция для выполнения поиска
  const performSearch = () => {
    // Особая обработка для поля volunteer (чекбокс)
    if (searchField === "data.users.0.volunteer") {
      onSearch({
        field: searchField,
        value: isVolunteer ? "true" : "false",
        operator: "equals", // Для булевых значений используем equals
      });
    } else if (searchField === "data.users.0.age") {
      // Для возраста используем выбранный оператор
      onSearch({
        field: searchField,
        value: searchValue,
        operator,
      });
    } else {
      // Для текстовых полей по умолчанию используем regex для поиска по части строки
      onSearch({
        field: searchField,
        value: searchValue,
        operator: operator || "regex",
      });
    }
  };

  // Выполняем поиск при изменении любого поля формы
  useEffect(() => {
    // Небольшая задержка для предотвращения слишком частых запросов
    const timer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchField, searchValue, isVolunteer, operator]);

  // Определяем, является ли текущее поле числовым
  const isNumericField = searchField === "data.users.0.age";

  // Определяем, является ли текущее поле текстовым
  const isTextField =
    searchField === "data.users.0.name" ||
    searchField === "data.users.0.resettlement" ||
    searchField === "_id" ||
    searchField === "created" ||
    searchField === "modified";

  return (
    <div className="w-full mx-auto flex flex-wrap justify-center gap-2 mb-4">
      {searchField === "data.users.0.volunteer" ? (
        <div className="flex items-center gap-2 min-w-[200px] flex-grow">
          <Switch
            isSelected={isVolunteer}
            onValueChange={setIsVolunteer}
            size="lg"
          />
          <span>{isVolunteer ? "Да" : "Нет"}</span>
        </div>
      ) : (
        <>
          <Input
            size="lg"
            type={isNumericField ? "number" : "text"}
            placeholder="Поиск"
            labelPlacement="outside"
            className="min-w-[200px] flex-grow"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Select
            size="lg"
            label="Поле для поиска"
            defaultSelectedKeys={["data.users.0.name"]}
            placeholder="Выберите поле"
            className="min-w-[200px]"
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
              // Сбрасываем оператор при смене поля
              if (e.target.value === "data.users.0.age") {
                setOperator("equals");
              } else if (e.target.value === "data.users.0.volunteer") {
                setOperator("equals");
              } else {
                setOperator("regex");
              }
            }}
          >
            <SelectItem key="data.users.0.name">Имя, фамилия</SelectItem>
            <SelectItem key="data.users.0.age">Возраст</SelectItem>
            <SelectItem key="data.users.0.volunteer">Волонтер</SelectItem>
            <SelectItem key="data.users.0.resettlement">
              Пожелание по расселению
            </SelectItem>
            <SelectItem key="created">Дата создания</SelectItem>
            <SelectItem key="modified">Дата изменения</SelectItem>
            <SelectItem key="_id">ID подписки</SelectItem>
          </Select>

          {/* Оператор сравнения */}
          <Select
            size="lg"
            label="Оператор"
            defaultSelectedKeys={["regex"]}
            placeholder="Выберите оператор"
            className="min-w-[150px]"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            {isNumericField
              ? // Операторы для числовых полей
                [
                  <SelectItem key="equals">Равно</SelectItem>,
                  <SelectItem key="ne">Не равно</SelectItem>,
                  <SelectItem key="gt">Больше</SelectItem>,
                  <SelectItem key="gte">Больше или равно</SelectItem>,
                  <SelectItem key="lt">Меньше</SelectItem>,
                  <SelectItem key="lte">Меньше или равно</SelectItem>,
                ]
              : isTextField
              ? // Операторы для текстовых полей
                [
                  <SelectItem key="equals">Точное совпадение</SelectItem>,
                  <SelectItem key="ne">Не равно</SelectItem>,
                  <SelectItem key="regex">
                    Содержит (регистронезависимый)
                  </SelectItem>,
                ]
              : null}
          </Select>
        </>
      )}
    </div>
  );
};
