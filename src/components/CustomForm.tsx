import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { formSchema } from "./AuthForm";
import { z } from "zod";

interface CustomFormProps {
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  isPassword?: boolean;
  placeholder: string;
  name: "email" | "password";
}

const CustomForm = ({
  control,
  label,
  isPassword = false,
  placeholder,
  name,
}: CustomFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={isPassword ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomForm;
