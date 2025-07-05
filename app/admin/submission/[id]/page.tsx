"use client";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { Spinner, Button } from "@heroui/react";
import { useFormioAuth } from "@/src/shared/hooks/useFormioAuth";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { DeleteSubscriptionButton } from "@/src/features/admin-delete-subscription";
import { AdminAppBar } from "@/src/features/admin-app-bar/ui";
import { FormioProvider } from "@formio/react";

const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});

const SubmissionPage = () => {
  const params = useParams();
  const router = useRouter();
  const submissionId = params.id as string;
  const { isAuthenticated, isLoading: authLoading } = useFormioAuth();

  const handleBack = () => {
    router.push("/admin");
  };

  const refreshSubscriptions = () => {
    router.push("/admin");
  };

  // Если проверка авторизации еще не завершена, показываем спиннер
  if (authLoading) {
    return (
      <div className="mt-[64px] flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Если пользователь не авторизован, он будет перенаправлен на страницу авторизации
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mt-[64px]">
      <div data-bs-theme="dark" className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button
            color="default"
            variant="light"
            className="mr-4"
            onClick={handleBack}
            startContent={<ArrowLeftIcon className="h-5 w-5" />}
          >
            Назад к списку
          </Button>
          <h1 className="text-2xl font-bold">Детали регистрации</h1>
        </div>

        <div className="bg-default-100/30 p-6 rounded-lg mb-6">
          <FormioProvider
            baseUrl={
              window.location.origin + process.env.NEXT_PUBLIC_FORMIO_BASE_URL
            }
          >
            <Form
              src={
                "form/" +
                process.env.NEXT_PUBLIC_FORMIO_FORM_ID +
                "/submission/" +
                submissionId
              }
            />
          </FormioProvider>
          <DeleteSubscriptionButton
            submissionId={submissionId}
            onSuccess={refreshSubscriptions}
          />
        </div>
      </div>
      <AdminAppBar />
    </div>
  );
};

export default SubmissionPage;
