interface PaidFilterProps {
  isPaidFilter: boolean | null;
  onFilterChange: (filter: boolean | null) => void;
  storageKey: string;
}

export const PaidFilter = ({
  isPaidFilter,
  onFilterChange,
  storageKey,
}: PaidFilterProps) => {
  const handleFilterChange = (filter: boolean | null) => {
    onFilterChange(filter);
    localStorage.setItem(storageKey, String(filter));
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center gap-4">
        <span className="text-sm font-medium">Оплачено:</span>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paidFilter"
              className="mr-2"
              checked={isPaidFilter === true}
              onChange={() => handleFilterChange(true)}
            />
            <span>Да</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paidFilter"
              className="mr-2"
              checked={isPaidFilter === false}
              onChange={() => handleFilterChange(false)}
            />
            <span>Нет</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paidFilter"
              className="mr-2"
              checked={isPaidFilter === null}
              onChange={() => handleFilterChange(null)}
            />
            <span>Все</span>
          </label>
        </div>
      </div>
    </div>
  );
};
