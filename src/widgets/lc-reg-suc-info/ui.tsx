"use client";
import { LcChangeData } from "@/src/features/lc-change-data";
import { Alert, Button } from "@heroui/react";
import { FC } from "react";

export const LcRegSucInfo: FC = () => {
  return (
    <div className={`px-6 max-w-xl mx-auto w-full h-full`}>
      <div className="w-full py-6 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Alert
              color="danger"
              title={"Обязательно!"}
              description="Подпишитесь на telegram-канал live-chat 2025, чтобы быть в курсе последних новостей."
            />
            <Button
              fullWidth
              color="primary"
              as="a"
              href="https://t.me/live_chat_2025"
            >
              Перейти в telegram
            </Button>
          </div>
          <LcChangeData />
        </div>
      </div>
    </div>
  );
};
