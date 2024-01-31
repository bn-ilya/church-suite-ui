import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation"
import { FormEvent, useRef } from "react";

export const LcSearchForm = () => {
  const router = useRouter();
  const refInput = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = refInput.current?.value;
    router.push(`/livechat/edit/?code=${code}`);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl w-full mx-auto px-6 flex justify-center gap-2">
        <Input
          size="lg"
          isRequired
          type="text"
          placeholder="Код"
          labelPlacement="outside"
          className="w-[200px]"
          ref={refInput}
        />
        <Button type="submit" isIconOnly size="lg" color="primary">
          <ChevronRightIcon />
        </Button>
    </form>
  )
}