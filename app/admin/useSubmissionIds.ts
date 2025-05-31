import { useEffect, useState } from "react";
import { SearchParams } from "@/src/features/admin-search-form";

export const useSubmissionIds = () => {
  const [submissionIds, setSubmissionIds] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchSubmissions = async (params?: SearchParams) => {
    setIsLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${process.env.NEXT_PUBLIC_FORMIO_FORM_ID}/submission`;

      // Добавляем параметры поиска, если они есть
      if (params && params.field && params.value) {
        // Для поиска по полям формы используем правильный синтаксис
        let fieldPath = params.field;

        // Для поиска по полям в массиве users используем специальный синтаксис
        // Например: data.users.0.name=Иван превращается в data.users.name=Иван
        if (fieldPath.startsWith("data.users.0")) {
          fieldPath = fieldPath.replace("data.users.0.", "data.users.");
        }

        // Добавляем оператор к полю, если он указан
        if (params.operator && params.operator !== "equals") {
          // Для regex используем специальный синтаксис
          if (params.operator === "regex") {
            // Формируем регулярное выражение для поиска по части строки (регистронезависимый)
            // /value/i - i означает регистронезависимый поиск
            fieldPath += `__regex=/^.*${params.value}.*$/i`;
            url += `?${fieldPath}`;
          } else {
            // Для других операторов используем синтаксис с двойным подчеркиванием
            fieldPath += `__${params.operator}`;
            url += `?${fieldPath}=${encodeURIComponent(params.value)}`;
          }
        } else {
          // Для обычного равенства используем стандартный синтаксис
          url += `?${fieldPath}=${encodeURIComponent(params.value)}`;
        }
      }

      const response = await fetch(url);
      const data: Array<{ _id: string }> = await response.json();
      setSubmissionIds(data.map((submission) => submission["_id"]));
    } catch (error) {
      setSubmissionIds([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для обновления параметров поиска
  const updateSearchParams = (params: SearchParams) => {
    setSearchParams(params);
  };

  // Загружаем подписки при монтировании компонента или изменении параметров поиска
  useEffect(() => {
    fetchSubmissions(searchParams || undefined);
  }, [searchParams]);

  return { submissionIds, updateSearchParams, isLoading };
};
