import { cn } from "@/utils/style";

type Props = {
  src: string;
  className?: string;
  containerClass?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({ src, className, containerClass, ...props }: Props) => {
  return (
    <div
      className={cn(
        "h-full w-full relative overflow-hidden group  rounded-3xl hover:z-4 transition-transform duration-300 ",
        containerClass
      )}
    >
      <div className="group-hover:hidden hgroup-hover-backdrop-none absolute w-full h-full animate-pulse"></div>
      <img
        {...props}
        src={src}
        className={cn(
          "object-cover group-hover:scale-120 w-full h-full transition-transform duration-300 absolute top-0 left-0",
          className
        )}
      />
    </div>
  );
};

export default Image;