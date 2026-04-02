import TextField, { type TextFieldProps } from "@mui/material/TextField";
import type { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type RHFTextFieldProps = Omit<
  TextFieldProps,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "error"
> & {
  name: string;
  /** Strip non-digits on change (e.g. national ID) */
  digitsOnly?: boolean;
  isReadOnly?: boolean;
};

/**
 * MUI v5 outlined TextField wired to react-hook-form (use inside FormProvider).
 */
function RHFTextField({
  name,
  helperText,
  type,
  isReadOnly = false,
  digitsOnly = false,
  InputProps,
  InputLabelProps,
  inputProps,
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const raw = field.value ?? "";
        const displayValue =
          type === "number" && (raw === "" || raw === null || raw === undefined)
            ? ""
            : raw;

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          let v = event.target.value;
          if (digitsOnly) {
            v = v.replace(/\D/g, "");
          }
          if (type === "number") {
            field.onChange(v === "" ? "" : Number(v));
          } else {
            field.onChange(v);
          }
        };

        return (
          <TextField
            {...other}
            name={field.name}
            type={type === "number" ? "number" : type}
            value={displayValue}
            onChange={handleChange}
            onBlur={field.onBlur}
            inputRef={field.ref}
            error={Boolean(error)}
            helperText={error ? error.message : helperText}
            inputProps={inputProps}
            InputProps={{
              readOnly: isReadOnly,
              ...InputProps,
            }}
            InputLabelProps={InputLabelProps}
          />
        );
      }}
    />
  );
}

export default RHFTextField;
