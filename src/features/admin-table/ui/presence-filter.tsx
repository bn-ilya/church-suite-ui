import { useEffect } from "react";

interface PresenceFilterProps {
  isPresenceFilter: boolean | null;
  onFilterChange: (filter: boolean | null) => void;
  storageKey: string;
}

export const PresenceFilter = ({
  isPresenceFilter,
  onFilterChange,
  storageKey,
}: PresenceFilterProps) => {
  useEffect(() => {
    if (typeof window !== "undefined" && isPresenceFilter !== null) {
      try {
        localStorage.setItem(storageKey, isPresenceFilter.toString());
      } catch (error) {
        console.error("Ошибка при сохранении фильтра присутствия:", error);
      }
    }
  }, [isPresenceFilter, storageKey]);

  const handleFilterChange = (filter: boolean | null) => {
    onFilterChange(filter);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(storageKey, String(filter));
      } catch (error) {
        console.error("Ошибка при сохранении фильтра присутствия:", error);
      }
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center gap-4">
        <span className="text-sm font-medium">Присутствие:</span>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="presenceFilter"
              className="mr-2"
              checked={isPresenceFilter === true}
              onChange={() => handleFilterChange(true)}
            />
            <span>Пришли</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="presenceFilter"
              className="mr-2"
              checked={isPresenceFilter === false}
              onChange={() => handleFilterChange(false)}
            />
            <span>Не пришли</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="presenceFilter"
              className="mr-2"
              checked={isPresenceFilter === null}
              onChange={() => handleFilterChange(null)}
            />
            <span>Все</span>
          </label>
        </div>
      </div>
    </div>
  );
};
