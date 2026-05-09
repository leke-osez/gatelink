import { cn } from "@/utils/style";
import { useField } from "formik";
import React, { forwardRef } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { type Value } from "react-phone-number-input";

export type InputProps = {
  hasError?: boolean;
  label?: string;
  setValue?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type TextareaProps = {
  hasError?: boolean;
  label?: string;
  setValue?: () => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError = false, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      autoComplete="off"
      className={cn(
        "flex h-9 w-full rounded border border-[#e0e0e0] bg-white px-3 py-0.5 text-sm ring-0 ring-offset-transparent transition-colors [appearance:textfield] placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        "file:border-0 file:bg-transparent file:pt-1 file:text-sm file:font-medium file:text-primary",
        hasError ? "border-error" : "border-[#e0e0e0]",
        className
      )}
      {...props}
    />
  )
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, hasError = false, ...props }, ref) => (
  <textarea
    ref={ref}
    // type={type}
    autoComplete="off"
    className={cn(
      "flex h-9 w-full rounded border border-[#e0e0e0] bg-white px-3 py-0.5 text-sm ring-0 ring-offset-transparent transition-colors [appearance:textfield] placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
      "file:border-0 file:bg-transparent file:pt-1 file:text-sm file:font-medium file:text-primary",
      hasError ? "border-error" : "border-[#e0e0e0]",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export const MyTextField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    const [field, meta] = useField(props.name as string);
    return (
      <>
        <label className="text-gray-600 font-medium">{label}</label>
        <Input {...field} {...props} ref={ref} />

        {meta.touched && meta.error ? (
          <div className="text-amber-500 text-sm mt-1">
            {meta.error}
          </div>
        ) : null}
      </>
    );
  }
);

export const MyTextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ label, ...props }, ref) => {
  const [field, meta] = useField(props.name as string);
  return (
    <>
      <label className="text-gray-600 font-medium">{label}</label>
      <Textarea {...field} {...props} ref={ref} />

      {meta.touched && meta.error ? (
        <div className="text-amber-500 text-sm mt-1">
          {meta.error}
        </div>
      ) : null}
    </>
  );
});

MyTextField.displayName = "MyTextField";

export const PhoneTextField = forwardRef<
  React.ComponentRef<typeof PhoneInput>,
  React.ComponentPropsWithoutRef<typeof PhoneInput>
>(({ label, setFieldValue, ...props }, ref) => {
  const [field, meta] = useField(props.name as string);
  const handleChange = (val: Value) => {
    setFieldValue(props.name, val);
  };
  return (
    <>
      <label className="text-gray-600 font-medium">{label}</label>
      <PhoneInput
        {...field}
        {...props}
        ref={ref}
        onChange={handleChange}
        className={cn(
          "flex h-9 w-full rounded border border-[#e0e0e0] bg-white px-3 py-0.5 text-sm ring-0 ring-offset-transparent transition-colors [appearance:textfield] placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          "file:border-0 file:bg-transparent file:pt-1 file:text-sm file:font-medium file:text-primary",
          meta.touched && meta.error
            ? "border-error"
            : "border-[#e0e0e0]"
        )}
      />

      {meta.touched && meta.error ? (
        <div className="text-amber-500 text-sm mt-1">
          {meta.error}
        </div>
      ) : null}
    </>
  );
});

PhoneTextField.displayName = "PhoneTextField";