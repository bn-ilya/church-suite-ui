import { Input, Skeleton as SkeletonNext } from "@nextui-org/react"

export const Skeleton = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-2 gap-4">
      <SkeletonNext className="col-span-2 rounded-xl">
        <Input/>
      </SkeletonNext>
      <SkeletonNext className="col-span-2 rounded-xl">
        <Input/>
      </SkeletonNext>
      <SkeletonNext className="col-span-2 rounded-xl">
        <Input/>
      </SkeletonNext>
      <SkeletonNext className="col-span-2 rounded-xl">
        <Input/>
      </SkeletonNext>
      <SkeletonNext className="col-span-2 rounded-xl">
        <Input/>
      </SkeletonNext>
      <SkeletonNext className="col-span-2 rounded-xl">
        <Input/>
      </SkeletonNext>
    </div>
  )
}