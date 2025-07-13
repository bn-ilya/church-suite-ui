import {
  FormioComponent,
  FilterField,
} from "@/src/features/admin-search-form/types";

/**
 * Анализирует компоненты формы и извлекает поля для фильтрации
 * @param components Массив компонентов формы
 * @param prefix Префикс пути для вложенных компонентов
 * @returns Массив полей для фильтрации
 */
export function analyzeFormComponents(
  components: FormioComponent[],
  prefix = "data"
): FilterField[] {
  console.log("Анализ компонентов формы:", components);
  const fields: FilterField[] = [];

  // Рекурсивно обходим все компоненты формы
  const processComponent = (
    component: FormioComponent,
    currentPath: string
  ) => {
    // Пропускаем компоненты без ключа или скрытые компоненты
    if (!component.key || component.hidden) return;

    // Пропускаем компоненты, которые не должны отображаться в таблице
    if (component.tableView === false && component.input !== true) return;

    // Пропускаем кнопки и другие неинформативные компоненты
    if (
      [
        "button",
        "content",
        "htmlelement",
        "panel",
        "columns",
        "fieldset",
      ].includes(component.type)
    ) {
      return;
    }

    // Формируем путь к полю
    const fieldPath = `${currentPath}.${component.key}`;

    // Определяем тип поля для фильтра
    let fieldType: "text" | "number" | "boolean" | "select" = "text";
    let operators: string[] = ["equals", "ne", "regex"];
    let values: { label: string; value: string }[] | undefined = undefined;

    switch (component.type) {
      case "number":
        fieldType = "number";
        operators = ["equals", "ne", "gt", "gte", "lt", "lte"];
        break;
      case "checkbox":
        fieldType = "boolean";
        operators = ["equals"];
        break;
      case "select":
      case "selectboxes":
      case "radio":
        fieldType = "select";
        operators = ["equals", "ne"];
        // Получаем возможные значения для селекта или радиокнопок
        values = component.values || component.data?.values || [];
        break;
    }
    console.log("Добавляем поле в список:", {
      key: component.key,
      label: component.label,
      type: fieldType,
      path: fieldPath,
      operators,
      values,
    });
    // Создаем объект поля
    const fieldObj: FilterField = {
      key: component.key,
      label: component.label,
      type: fieldType,
      path: fieldPath,
      operators,
      values,
    };

    // Если у компонента есть атрибуты, добавляем информацию о них в консоль
    if (component.attributes) {
      console.log(
        `Поле ${component.key} имеет атрибуты:`,
        component.attributes
      );

      // Если есть атрибут data-type=summable, добавляем информацию об этом в консоль
      if (component.attributes["data-type"] === "summable") {
        console.log(`Поле ${component.key} является суммируемым`);
      }
    }

    // Добавляем поле в список
    fields.push(fieldObj);

    // Рекурсивно обрабатываем вложенные компоненты
    if (component.components && component.components.length > 0) {
      component.components.forEach((subComponent) => {
        processComponent(subComponent, fieldPath);
      });
    }
  };

  // Обрабатываем все компоненты
  components.forEach((component) => {
    console.log(
      "Обработка компонента:",
      component.type,
      component.key,
      component
    );

    // Особая обработка для datagrid, так как он содержит массив элементов
    if (component.type === "datagrid" && component.key) {
      console.log("Найден datagrid:", component.key);

      // Для datagrid мы хотим получить поля из первого элемента массива
      const datagridPath = `${prefix}.${component.key}.0`;

      // Обрабатываем компоненты внутри datagrid
      if (component.components && component.components.length > 0) {
        console.log(
          "Компоненты внутри datagrid:",
          component.components.length,
          component.components
        );
        component.components.forEach((subComponent) => {
          if (subComponent.components) {
            subComponent.components.forEach((component) => {
              processComponent(component, datagridPath);
            });
          }
        });
      }
    } else {
      // Обычная обработка для остальных компонентов
      processComponent(component, prefix);
    }
  });

  // Добавляем стандартные поля для всех форм
  fields.push(
    {
      key: "_id",
      label: "ID подписки",
      type: "text",
      path: "_id",
      operators: ["equals", "ne", "regex"],
    },
    {
      key: "created",
      label: "Дата создания",
      type: "text",
      path: "created",
      operators: ["equals", "ne", "regex"],
    },
    {
      key: "modified",
      label: "Дата изменения",
      type: "text",
      path: "modified",
      operators: ["equals", "ne", "regex"],
    }
  );

  return fields;
}

/**
 * Анализирует структуру формы и возвращает конфигурацию фильтров
 * @param form Структура формы
 * @returns Конфигурация фильтров
 */
export function analyzeForm(form: FormioComponent[]): FilterField[] {
  console.log("Анализ структуры формы:", form);
  if (!form || !Array.isArray(form)) {
    console.error("Ошибка: form не является массивом:", form);
    return [];
  }
  return analyzeFormComponents(form);
}
