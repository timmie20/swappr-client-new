"use client";

import { FieldPath, FieldValues, useController } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { BaseFormFieldProps } from "@/types/base-form";

interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFormFieldProps<TFieldValues, TName> {
  description?: string;
}

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  required,
  disabled,
  className,
}: FormCheckboxProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ control, name });
  const id = `${name}-checkbox`;

  return (
    <Field>
      <FieldContent
        className={cn("flex items-start justify-between gap-3", className)}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {label && (
            <FieldLabel htmlFor={id} className="w-full">
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </FieldLabel>
          )}
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </div>

        <Checkbox
          id={id}
          checked={!!field.value}
          onCheckedChange={(v) => field.onChange(!!v)}
          disabled={disabled}
          aria-invalid={!!fieldState.error}
        />
      </FieldContent>
    </Field>
  );
}
