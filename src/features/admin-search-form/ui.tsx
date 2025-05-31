import { Input, Select, SelectItem, Switch, Spinner } from "@heroui/react";
import { useEffect, useState, useMemo } from "react";
import { useFormConfig } from "./hooks/useFormConfig";
import { FilterField } from "./types";

export interface SearchParams {
  field: string;
  value: string;
  operator?: string;
}

interface AdminSearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export const AdminSearchForm = ({ onSearch }: AdminSearchFormProps) => {
  const { filterConfig, isLoading, error } = useFormConfig();
  const [searchField, setSearchField] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isBooleanValue, setIsBooleanValue] = useState<boolean>(false);
  const [operator, setOperator] = useState<string>("regex");
  const [selectValue, setSelectValue] = useState<string>("");

  // Инициализируем поле поиска при загрузке конфигурации
  useEffect(() => {
    if (filterConfig && filterConfig.defaultField) {
      setSearchField(filterConfig.defaultField);
    }
  }, [filterConfig]);

  // Получаем текущее поле из конфигурации
  const currentField = useMemo(() => {
    if (!filterConfig || !searchField) return null;
    return filterConfig.fields.find((field) => field.path === searchField);
  }, [filterConfig, searchField]);

  // Функция для выполнения поиска
  const performSearch = () => {
    if (!currentField) return;

    // Особая обработка для разных типов полей
    switch (currentField.type) {
      case "boolean":
        onSearch({
          field: searchField,
          value: isBooleanValue ? "true" : "false",
          operator: "equals", // Для булевых значений используем equals
        });
        break;
      case "select":
        onSearch({
          field: searchField,
          value: selectValue,
          operator: operator || "equals",
        });
        break;
      case "number":
        onSearch({
          field: searchField,
          value: searchValue,
          operator: operator || "equals",
        });
        break;
      default:
        // Для текстовых полей по умолчанию используем regex для поиска по части строки
        onSearch({
          field: searchField,
          value: searchValue,
          operator: operator || "regex",
        });
        break;
    }
  };

  // Выполняем поиск при изменении любого поля формы
  useEffect(() => {
    if (!searchField) return;

    // Небольшая задержка для предотвращения слишком частых запросов
    const timer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchField, searchValue, isBooleanValue, operator, selectValue]);

  // Обработчик изменения поля поиска
  const handleFieldChange = (value: string) => {
    setSearchField(value);
    setSearchValue("");
    setSelectValue("");

    // Находим поле в конфигурации
    const field = filterConfig.fields.find((f) => f.path === value);

    if (field) {
      // Устанавливаем оператор по умолчанию в зависимости от типа поля
      switch (field.type) {
        case "boolean":
          setOperator("equals");
          setIsBooleanValue(false);
          break;
        case "number":
          setOperator("equals");
          break;
        case "select":
          setOperator("equals");
          break;
        default:
          setOperator("regex");
          break;
      }
    }
  };

  // Добавляем отладочную информацию
  console.log("filterConfig:", filterConfig);
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("currentField:", currentField);

  // Если конфигурация загружается, показываем спиннер
  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-4">
        <Spinner size="md" color="primary" />
      </div>
    );
  }

  // Если произошла ошибка, показываем сообщение
  if (error) {
    return (
      <div className="w-full text-center text-danger py-4">
        Ошибка при загрузке фильтров: {error.message}
      </div>
    );
  }

  // Если нет полей для фильтрации, показываем сообщение
  if (!filterConfig || filterConfig.fields.length === 0) {
    return (
      <div className="w-full text-center py-4">
        Нет доступных полей для фильтрации
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex flex-wrap justify-center gap-2 mb-4">
      {currentField?.type === "boolean" ? (
        <div className="flex items-center gap-2 min-w-[200px] flex-grow">
          <Switch
            isSelected={isBooleanValue}
            onValueChange={setIsBooleanValue}
            size="lg"
          />
          <span>{isBooleanValue ? "Да" : "Нет"}</span>
        </div>
      ) : currentField?.type === "select" && currentField.values ? (
        <>
          <Select
            size="lg"
            placeholder="Выберите значение"
            labelPlacement="outside"
            className="min-w-[200px] flex-grow"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {currentField.values.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        </>
      ) : (
        <>
          <Input
            size="lg"
            type={currentField?.type === "number" ? "number" : "text"}
            placeholder="Поиск"
            labelPlacement="outside"
            className="min-w-[200px] flex-grow"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </>
      )}

      <Select
        size="sm"
        label="Поле для поиска"
        placeholder="Выберите поле"
        className="min-w-[200px]"
        value={searchField}
        onChange={(e) => handleFieldChange(e.target.value)}
        selectedKeys={searchField ? [searchField] : []}
      >
        {filterConfig.fields.map((field) => (
          <SelectItem key={field.path}>{field.label}</SelectItem>
        ))}
      </Select>

      {/* Оператор сравнения */}
      {currentField && currentField.type !== "boolean" && (
        <Select
          size="sm"
          label="Оператор"
          placeholder="Выберите оператор"
          className="min-w-[150px]"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          selectedKeys={operator ? [operator] : []}
        >
          {currentField.operators.map((op) => (
            <SelectItem key={op}>{getOperatorLabel(op)}</SelectItem>
          ))}
        </Select>
      )}
    </div>
  );
};

// Функция для получения человекочитаемого названия оператора
function getOperatorLabel(operator: string): string {
  switch (operator) {
    case "equals":
      return "Равно";
    case "ne":
      return "Не равно";
    case "gt":
      return "Больше";
    case "gte":
      return "Больше или равно";
    case "lt":
      return "Меньше";
    case "lte":
      return "Меньше или равно";
    case "regex":
      return "Содержит (регистронезависимый)";
    default:
      return operator;
  }
}
