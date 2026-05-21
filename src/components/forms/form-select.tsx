"use client";

import { FieldPath, FieldValues, useController } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseFormFieldProps, FormOption } from "@/types/base-form";

interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFormFieldProps<TFieldValues, TName> {
  options: FormOption[] | string[];
  placeholder?: string;
  searchable?: boolean;
}

function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  required,
  options,
  placeholder = "Select an option",
  disabled,
  className,
}: FormSelectProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ control, name });

  return (
    <Field
      className={cn("w-full", className)}
      orientation="vertical"
      data-invalid={fieldState.invalid}
    >
      <FieldContent>
        {label && (
          <FieldLabel htmlFor={name}>
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </FieldLabel>
        )}
        <Select
          onValueChange={(val) => {
            field.onChange(val);
            field.onBlur();
          }}
          value={field.value}
          disabled={disabled}
        >
          {" "}
          <SelectTrigger id={name} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={typeof option === "string" ? option : option.value}
                value={typeof option === "string" ? option : option.value}
                disabled={
                  typeof option === "string" ? undefined : option.disabled
                }
              >
                {typeof option === "string" ? option : option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && <FieldDescription>{description}</FieldDescription>}
        {fieldState.invalid && (
          <FieldError
            errors={[fieldState.error]}
            className="text-xs"
          ></FieldError>
        )}
      </FieldContent>
    </Field>
  );
}

export { FormSelect, type FormOption };
