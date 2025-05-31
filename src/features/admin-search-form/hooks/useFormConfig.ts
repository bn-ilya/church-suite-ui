import { useEffect, useState } from "react";
import { FilterConfig } from "../types";
import { FormConfigService } from "../services/formConfigService";
import { analyzeForm } from "@/src/shared/lib/helpers/formAnalyzer";
import { defaultFilterConfig } from "../config";

/**
 * Хук для получения конфигурации фильтров на основе структуры формы
 * @returns Объект с конфигурацией фильтров и статусом загрузки
 */
export const useFormConfig = () => {
  const [filterConfig, setFilterConfig] =
    useState<FilterConfig>(defaultFilterConfig);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFormConfig = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Получаем ID формы из переменных окружения
        const formId = process.env.NEXT_PUBLIC_FORMIO_FORM_ID;

        if (!formId) {
          throw new Error("ID формы не указан в переменных окружения");
        }

        // Получаем структуру формы из API
        const formData = await FormConfigService.getFormStructure(formId);
        console.log("Получена структура формы:", formData);

        // Анализируем структуру формы и получаем поля для фильтрации
        const fields = analyzeForm(formData.components);
        console.log("Поля для фильтрации:", fields);

        // Определяем поле по умолчанию
        // Ищем поле "name" или первое текстовое поле для использования по умолчанию
        const nameField = fields.find((field) => field.key === "name");
        const defaultField =
          nameField?.path ||
          fields.find((field) => field.type === "text")?.path ||
          "_id";

        // Формируем конфигурацию фильтров
        const config: FilterConfig = {
          fields,
          defaultField,
        };

        setFilterConfig(config);
      } catch (err) {
        console.error("Ошибка при получении конфигурации формы:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        // В случае ошибки используем конфигурацию по умолчанию
        console.log(
          "Используем конфигурацию по умолчанию:",
          defaultFilterConfig
        );
        setFilterConfig(defaultFilterConfig);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormConfig();
  }, []);

  return { filterConfig, isLoading, error };
};
