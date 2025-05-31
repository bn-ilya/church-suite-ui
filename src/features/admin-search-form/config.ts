import { FilterConfig } from "./types";

/**
 * Конфигурация фильтров по умолчанию
 * Используется, если не удалось получить динамическую конфигурацию
 */
export const defaultFilterConfig: FilterConfig = {
  fields: [
    {
      key: "name",
      label: "Имя, фамилия",
      type: "text",
      path: "data.users.0.name",
      operators: ["equals", "ne", "regex"],
    },
    {
      key: "age",
      label: "Возраст",
      type: "text",
      path: "data.users.0.age",
      operators: ["equals", "ne", "regex"],
    },
    {
      key: "volunteer",
      label: "Волонтер",
      type: "boolean",
      path: "data.users.0.volunteer",
      operators: ["equals"],
    },
    {
      key: "resettlement",
      label: "Пожелание по расселению",
      type: "text",
      path: "data.users.0.resettlement",
      operators: ["equals", "ne", "regex"],
    },
    {
      key: "car",
      label: "На своей машине",
      type: "boolean",
      path: "data.users.0.car",
      operators: ["equals"],
    },
    {
      key: "tent",
      label: "Не нуждаюсь в палатке",
      type: "boolean",
      path: "data.users.0.tent",
      operators: ["equals"],
    },
    {
      key: "independent",
      label: "Самостоятельный участник",
      type: "boolean",
      path: "data.users.0.independent",
      operators: ["equals"],
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
    },
    {
      key: "_id",
      label: "ID подписки",
      type: "text",
      path: "_id",
      operators: ["equals", "ne", "regex"],
    },
  ],
  defaultField: "data.users.0.name",
};
