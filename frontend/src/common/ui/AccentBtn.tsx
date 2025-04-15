import { ComponentPropsWithoutRef, ReactNode } from "react";

interface AccentBtnProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  className?: string;
}

/**
 * Accent-styled button component.
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param props - Additional button props
 * @example <AccentBtn>Submit</AccentBtn>
 * @example <AccentBtn className="ml-4" onClick={handleClick}>Confirm</AccentBtn>
 */
const AccentBtn = ({
  children,
  className,
  onClick,
  type = "button",
  ...props
}: AccentBtnProps) => {
  return (
    <button
      className={`btn btn-accent shadow-sm ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default AccentBtn;
