"use client";

import { FC } from "react";
import { IPayInfoProps } from "./ui.props";
import { Accordion, AccordionItem, Divider, Snippet } from "@heroui/react";
import { costRegister } from "../../../model/data";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import { LogoSber } from "@/src/shared/ui";

export const PayInfo: FC<IPayInfoProps> = ({ sumRegister }) => {
  const [copiedPhone, copyToClipboardPhone] = useCopyToClipboard();
  const [copiedCard, copyToClipboardCard] = useCopyToClipboard();

  const handleCopyPhone = (value: string | Array<string>) => {
    if (typeof value === "string") {
      copyToClipboardPhone(value);
    }
  };

  const handleCopyCard = (value: string | Array<string>) => {
    if (typeof value === "string") {
      copyToClipboardCard(value);
    }
  };

  return (
    <>
      <div className="col-span-2 flex flex-col items-center">
        <div className="w-full flex justify-center">
          <span className="text-base font-bold text-success me-2">
            К оплате:
          </span>
          <span className="text-base font-bold text-success">
            {sumRegister}₽
          </span>
        </div>
        <span className="text-sm text-zinc-500">
          Стоимость за человека - {costRegister}₽
        </span>
      </div>
      <Accordion isCompact variant="splitted" className="col-span-2 px-0">
        <AccordionItem
          key="1"
          aria-label="Как оплатить?"
          title={<div className="text-sm">Как оплатить?</div>}
        >
          <Divider />
          <div className="flex flex-col items-center py-6 gap-2">
            <div className="text-sm text-center max-w-[250px]">
              Необходимо осуществить перевод на карту по номеру карты или
              телефона:
            </div>
            <Snippet
              onCopy={handleCopyPhone}
              copyIcon={
                copiedPhone ? (
                  <CheckIcon width={14} />
                ) : (
                  <Square2StackIcon width={14} />
                )
              }
              hideSymbol
              size="md"
              className="font-bold"
            >
              +7 (988) 525-36-05
            </Snippet>
            <Snippet
              onCopy={handleCopyCard}
              copyIcon={
                copiedCard ? (
                  <CheckIcon width={14} />
                ) : (
                  <Square2StackIcon width={14} />
                )
              }
              hideSymbol
              size="md"
              className="font-bold"
            >
              2202 2080 9271 8387
            </Snippet>
            <div className="flex flex justify-center gap-1 items-center mt-1">
              <LogoSber width={14} height={14} />
              <div className="text-sm">Сбербанк. Максим Глазачев</div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};
