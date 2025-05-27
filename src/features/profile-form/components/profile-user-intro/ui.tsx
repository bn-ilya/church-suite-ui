import { LogoArkhyz } from "@/src/shared/ui";
import { Divider } from "@heroui/react";

export const ProfileUserIntro = () => {
  return (
    <>
      <div className="max-w-xl w-full mx-auto px-6 pt-16 pb-4 flex flex-col items-center gap-4">
        <LogoArkhyz width={200} height={100} />
        <h1 className="text-2xl text-center font-bold">
          Редатирование регистрации
        </h1>
        <Divider className="my-2" />
      </div>
    </>
  );
};
