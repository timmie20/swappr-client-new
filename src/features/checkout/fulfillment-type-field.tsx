"use client";

import { FieldPath, FieldValues, useController } from "react-hook-form";

import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypographyMuted } from "@/components/typography/muted";
import { BaseFormFieldProps } from "@/types/base-form";
import { FulfillmentType } from "@/types/checkout";

interface FulfillmentTypeFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFormFieldProps<TFieldValues, TName> {
  operationHours?: string | null;
}

function FulfillmentTypeField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  className,
  operationHours,
}: FulfillmentTypeFieldProps<TFieldValues, TName>) {
  const { field } = useController({ control, name });

  return (
    <Field className={className}>
      <FieldContent>
        <FieldLabel htmlFor={name}>Fulfillment</FieldLabel>
        <ToggleGroup
          id={name}
          type="single"
          variant="outline"
          value={field.value}
          onValueChange={(value) => {
            if (value) field.onChange(value as FulfillmentType);
          }}
        >
          <ToggleGroupItem value="delivery" className="text-sm">
            Delivery
          </ToggleGroupItem>
          <ToggleGroupItem value="pickup" className="text-sm">
            Pickup
          </ToggleGroupItem>
        </ToggleGroup>

        {field.value === "pickup" && (
          <TypographyMuted className="text-sm text-yellow-700">
            {operationHours
              ? `Vendor is typically available for pickup: ${operationHours}.`
              : "Pickup availability will be confirmed by the vendor."}{" "}
            The exact pickup date and time are set by the vendor after payment.
          </TypographyMuted>
        )}
      </FieldContent>
    </Field>
  );
}

export { FulfillmentTypeField };
