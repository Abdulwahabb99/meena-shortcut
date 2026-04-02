import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SearchSelect({
  label = "اختر",
  placeholder = "ابحث...",
  options = [],
  value,
  onChange,
  multiple = false,
  disabled = false,
  error,
  helperText,
  ...props
}) {
  return (
    <Autocomplete
      multiple={multiple}
      disableCloseOnSelect={multiple}
      options={options}
      value={value || (multiple ? [] : null)}
      onChange={(_, newValue) => onChange?.(newValue)}
      getOptionLabel={(o) => o?.label ?? ""}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {multiple && (
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
          )}
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={Boolean(error)}
          helperText={helperText}
        />
      )}
      filterSelectedOptions
      clearOnBlur={false}
      autoHighlight
      fullWidth
      disabled={disabled}
      {...props}
    />
  );
}
