"use client";
import { LcRegIntroThree } from "@/src/widgets/lc-reg-intro-three";
import { LcRegFormFormio } from "./LcRegFormFormio";

export const LcRegThree = () => {
  return (
    <div className={`mt-[64px]`}>
      <LcRegIntroThree />
      <LcRegFormFormio />
    </div>
  );
};
