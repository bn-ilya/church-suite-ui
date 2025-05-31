"use client";
import { AdminAddForm } from "@/src/views/admin-add";
import { AdminAppBar } from "@/src/features/admin-app-bar/ui";

const AdminAddPage = () => {
  return (
    <div className="mt-[64px]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Добавление новой регистрации
        </h1>
        <AdminAddForm />
      </div>
      <AdminAppBar />
    </div>
  );
};

export default AdminAddPage;
