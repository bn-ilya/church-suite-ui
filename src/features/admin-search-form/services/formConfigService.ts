import { FormioForm } from "../types";

/**
 * Сервис для работы с конфигурацией форм
 */
export class FormConfigService {
  /**
   * Получает структуру формы из Formio API
   * @param formId ID формы
   * @returns Промис с данными формы
   */
  static async getFormStructure(formId: string): Promise<FormioForm> {
    try {
      // Получаем токен авторизации из localStorage
      const token = localStorage.getItem("formioToken");

      if (!token) {
        throw new Error("Отсутствует токен авторизации");
      }

      // Формируем URL для запроса структуры формы
      const url = `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${formId}`;
      console.log("URL для запроса структуры формы:", url);

      // Выполняем запрос к API
      console.log(
        "Выполняем запрос с токеном:",
        token.substring(0, 10) + "..."
      );
      const response = await fetch(url, {
        headers: {
          "x-jwt-token": token,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Ошибка при получении структуры формы: ${response.statusText}`
        );
      }

      // Парсим ответ как JSON
      const formData = await response.json();

      return formData;
    } catch (error) {
      console.error("Ошибка при получении структуры формы:", error);
      throw error;
    }
  }
}
