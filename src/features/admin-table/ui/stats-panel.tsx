interface StatsPanelProps {
  totalSum: number;
  paidAmount: number;
  subscriptionsCount: number;
  totalUsers: number;
  summableFieldsStats: Record<string, number>;
}

export const StatsPanel = ({
  totalSum,
  paidAmount,
  subscriptionsCount,
  totalUsers,
  summableFieldsStats,
}: StatsPanelProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4 px-6">
      <div className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center">
        <span className="text-sm text-gray-500 mr-2">Регистрации:</span>
        <span className="font-semibold">{subscriptionsCount}</span>
      </div>
      <div className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center">
        <span className="text-sm text-gray-500 mr-2">Люди:</span>
        <span className="font-semibold">{totalUsers}</span>
      </div>
      {Object.entries(summableFieldsStats).map(([label, value]) => (
        <div
          key={label}
          className="bg-default-100/30 rounded-lg px-4 py-2 flex items-center"
        >
          <span className="text-sm text-gray-500 mr-2">{label}:</span>
          <span className="font-semibold">{value.toLocaleString("ru-RU")}</span>
        </div>
      ))}
    </div>
  );
};
