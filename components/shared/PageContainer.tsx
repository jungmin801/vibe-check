import type { HTMLAttributes, ReactNode } from "react";

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function PageContainer({ children, className = "", ...props }: PageContainerProps) {
  return (
    <div className={`mx-auto max-w-[1280px] px-5 md:px-20 ${className}`} {...props}>
      {children}
    </div>
  );
}
