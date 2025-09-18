"use client";
import { useSubmissions } from "../useSubmissions";
import {
  AdminSearchForm,
  SearchParams,
} from "@/src/features/admin-search-form";
import { Spinner } from "@heroui/react";
import { useFormioAuth } from "@/src/shared/hooks/useFormioAuth";
import { AdminAppBar } from "@/src/features/admin-app-bar/ui";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  StatsPanel,
  PaidFilter,
  PresenceFilter,
  UsersTable,
  UserWithSubmission,
} from "@/src/features/admin-table";

const SEARCH_PARAMS_STORAGE_KEY = "admin_table_search_params";
const PAID_FILTER_STORAGE_KEY = "admin_table_paid_filter";
const PRESENCE_FILTER_STORAGE_KEY = "admin_table_presence_filter";

const AdminTablePage = () => {
  const { isAuthenticated, isLoading: authLoading } = useFormioAuth();

  const {
    submissions,
    updateSearchParams,
    refreshSubscriptions,
    isLoading: dataLoading,
    totalSum,
    paidAmount,
    totalUsers,
    summableFieldsStats,
    subscriptionsCount,
  } = useSubmissions();

  const [initialSearchParams, setInitialSearchParams] =
    useState<SearchParams | null>(null);
  const [currentSearchParams, setCurrentSearchParams] =
    useState<SearchParams | null>(null);
  const [isPaidFilter, setIsPaidFilter] = useState<boolean | null>(null);
  const [isPresenceFilter, setIsPresenceFilter] = useState<boolean | null>(
    null
  );
  const [localUpdates, setLocalUpdates] = useState<
    Record<string, boolean | undefined>
  >({});

  const isPaid = useCallback((submission: any) => {
    const total = Number(submission.total || 0);
    const paidAmount = Number(submission.paid_amount || 0);
    return total - paidAmount <= 0;
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedParams = localStorage.getItem(SEARCH_PARAMS_STORAGE_KEY);
        if (savedParams) {
          const params = JSON.parse(savedParams) as SearchParams;
          setInitialSearchParams(params);
          setCurrentSearchParams(params);
          updateSearchParams(params);
        }

        const savedPaidFilter = localStorage.getItem(PAID_FILTER_STORAGE_KEY);
        if (savedPaidFilter) {
          if (savedPaidFilter === "true") {
            setIsPaidFilter(true);
          } else if (savedPaidFilter === "false") {
            setIsPaidFilter(false);
          } else {
            setIsPaidFilter(null);
          }
        }

        const savedPresenceFilter = localStorage.getItem(
          PRESENCE_FILTER_STORAGE_KEY
        );
        if (savedPresenceFilter) {
          if (savedPresenceFilter === "true") {
            setIsPresenceFilter(true);
          } else if (savedPresenceFilter === "false") {
            setIsPresenceFilter(false);
          } else {
            setIsPresenceFilter(null);
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке параметров:", error);
      }
    }
  }, []);

  const handleSearch = (params: SearchParams) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(SEARCH_PARAMS_STORAGE_KEY, JSON.stringify(params));
      } catch (error) {
        console.error("Ошибка при сохранении параметров поиска:", error);
      }
    }

    setCurrentSearchParams(params);
    updateSearchParams(params);
  };

  const usersWithSubmissions = useMemo((): UserWithSubmission[] => {
    if (!submissions || submissions.length === 0) {
      return [];
    }

    let filteredSubmissions = submissions.filter(
      (submission) => submission.users && submission.users.length > 0
    );

    if (isPaidFilter !== null) {
      filteredSubmissions = filteredSubmissions.filter((submission) => {
        const submissionIsPaid = isPaid(submission);
        return isPaidFilter ? submissionIsPaid : !submissionIsPaid;
      });
    }

    if (
      currentSearchParams &&
      currentSearchParams.field &&
      currentSearchParams.value
    ) {
      const fieldMatch = currentSearchParams.field.match(
        /data\.users\.\d+\.(.+)$/
      );
      if (fieldMatch) {
        const userField = fieldMatch[1];
        const searchValue = currentSearchParams.value;
        const operator = currentSearchParams.operator || "equals";

        filteredSubmissions = filteredSubmissions.filter((submission) => {
          return submission.users.some((user) => {
            const userValue = user[userField];

            if (userValue === undefined || userValue === null) {
              return false;
            }

            const userValueStr = String(userValue);

            switch (operator) {
              case "equals":
                return userValueStr === searchValue;
              case "ne":
                return userValueStr !== searchValue;
              case "gt":
                return parseFloat(userValueStr) > parseFloat(searchValue);
              case "gte":
                return parseFloat(userValueStr) >= parseFloat(searchValue);
              case "lt":
                return parseFloat(userValueStr) < parseFloat(searchValue);
              case "lte":
                return parseFloat(userValueStr) <= parseFloat(searchValue);
              case "regex":
                const regex = new RegExp(searchValue, "i");
                return regex.test(userValueStr);
              default:
                return true;
            }
          });
        });
      }
    }

    let result: UserWithSubmission[] = [];

    filteredSubmissions.forEach((submission) => {
      submission.users.forEach((user, index) => {
        result.push({
          _id: `${submission._id}_${index}`,
          submissionId: submission._id,
          firstName: user.firstName || user.first_name || user.name || "",
          lastName: user.lastName || user.last_name || user.surname || "",
          phone: user.phone || "",
          check: submission.check,
          total: submission.total || 0,
          paid_amount: submission.paid_amount || 0,
          isPaid: isPaid(submission),
          isPresent: user.isPresent || false,
          comment: submission.comment || "",
        });
      });
    });

    if (isPresenceFilter !== null) {
      result = result.filter((user) => {
        const userIsPresent =
          localUpdates[user._id] !== undefined
            ? localUpdates[user._id]
            : user.isPresent;
        return isPresenceFilter ? userIsPresent : !userIsPresent;
      });
    }

    return result;
  }, [
    submissions,
    currentSearchParams,
    isPaidFilter,
    isPresenceFilter,
    isPaid,
    localUpdates,
  ]);

  const handleTogglePresence = async (
    user: UserWithSubmission,
    isPresent: boolean
  ) => {
    setLocalUpdates((prev) => ({
      ...prev,
      [user._id]: isPresent,
    }));

    try {
      const token = localStorage.getItem("formioToken");
      if (!token) {
        setLocalUpdates((prev) => {
          const newUpdates = { ...prev };
          delete newUpdates[user._id];
          return newUpdates;
        });
        return;
      }

      const [submissionId, userIndexStr] = user._id.split("_");
      const userIndex = parseInt(userIndexStr);

      const submission = submissions.find((s) => s._id === submissionId);
      if (!submission) {
        setLocalUpdates((prev) => {
          const newUpdates = { ...prev };
          delete newUpdates[user._id];
          return newUpdates;
        });
        return;
      }

      const updatedUsers = submission.users.map((u, index) => {
        if (index === userIndex) {
          return { ...u, isPresent };
        }
        return u;
      });

      const updatedSubmissionData = {
        ...submission,
        users: updatedUsers,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${process.env.NEXT_PUBLIC_FORMIO_FORM_ID}/submission/${submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-jwt-token": token,
          },
          body: JSON.stringify({ data: updatedSubmissionData }),
        }
      );

      if (!response.ok) {
        setLocalUpdates((prev) => {
          const newUpdates = { ...prev };
          delete newUpdates[user._id];
          return newUpdates;
        });
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса присутствия:", error);
      setLocalUpdates((prev) => {
        const newUpdates = { ...prev };
        delete newUpdates[user._id];
        return newUpdates;
      });
    }
  };

  const handleUpdateAmount = async (
    user: UserWithSubmission,
    field: "total" | "paid_amount",
    value: number
  ) => {
    try {
      const token = localStorage.getItem("formioToken");
      if (!token) return;

      const originalSubmission = submissions.find(
        (s) => s._id === user.submissionId
      );
      if (!originalSubmission) return;

      const updatedSubmissionData = {
        ...originalSubmission,
        [field]: value,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FORMIO_BASE_URL}form/${process.env.NEXT_PUBLIC_FORMIO_FORM_ID}/submission/${user.submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-jwt-token": token,
          },
          body: JSON.stringify({ data: updatedSubmissionData }),
        }
      );

      if (response.ok) {
        refreshSubscriptions();
      }
    } catch (error) {
      console.error("Ошибка при обновлении суммы:", error);
    }
  };

  const handleMarkPresent = (user: UserWithSubmission) => {
    handleTogglePresence(user, true);
  };

  const handleMarkAbsent = (user: UserWithSubmission) => {
    handleTogglePresence(user, false);
  };

  if (authLoading) {
    return (
      <div className="mt-[64px] flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mt-[64px] pb-20 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center mb-4 px-6 gap-4">
          <h1 className="text-2xl font-bold text-center">
            Табличное представление
          </h1>
        </div>

        <StatsPanel
          totalSum={totalSum}
          paidAmount={paidAmount}
          subscriptionsCount={subscriptionsCount}
          totalUsers={totalUsers}
          summableFieldsStats={summableFieldsStats}
        />

        <PaidFilter
          isPaidFilter={isPaidFilter}
          onFilterChange={setIsPaidFilter}
          storageKey={PAID_FILTER_STORAGE_KEY}
        />

        <PresenceFilter
          isPresenceFilter={isPresenceFilter}
          onFilterChange={setIsPresenceFilter}
          storageKey={PRESENCE_FILTER_STORAGE_KEY}
        />

        <AdminSearchForm
          onSearch={handleSearch}
          initialParams={initialSearchParams}
        />

        {dataLoading ? (
          <div className="flex justify-center my-8">
            <Spinner size="lg" color="primary" />
          </div>
        ) : usersWithSubmissions.length === 0 ? (
          <div className="text-center my-8">
            <p>Пользователи не найдены</p>
          </div>
        ) : (
          <UsersTable
            users={usersWithSubmissions}
            localUpdates={localUpdates}
            onMarkPresent={handleMarkPresent}
            onMarkAbsent={handleMarkAbsent}
            onUpdateAmount={handleUpdateAmount}
          />
        )}
      </div>

      <AdminAppBar />
    </div>
  );
};

export default AdminTablePage;
