import type { AnyFormApi } from "@tanstack/react-form";

export function useFormErrors<TFormData>(formApi: AnyFormApi) {
  return {
    setFieldError: (
      fieldName: keyof TFormData,
      message: string,
      timing: "onChange" | "onBlur" | "onSubmit" = "onChange"
    ) => {
      formApi.setErrorMap({
        [timing]: {
          fields: {
            [fieldName]: {
              message,
            },
          },
        },
      });
    },

    setFieldErrors: (
      errors: Partial<Record<keyof TFormData, string>>,
      timing: "onChange" | "onBlur" | "onSubmit" = "onChange"
    ) => {
      const fields = Object.entries(errors).reduce((acc, [field, message]) => {
        if (message) {
          acc[field] = { message: message as string };
        }
        return acc;
      }, {} as Record<string, { message: string }>);

      formApi.setErrorMap({
        [timing]: {
          fields,
        },
      });
    },

    clearFieldError: (fieldName: keyof TFormData) => {
      const currentErrorMap = formApi.state.errorMap || {};
      
      Object.keys(currentErrorMap).forEach((timing) => {
        const timingErrors = currentErrorMap[timing as keyof typeof currentErrorMap];
        if (timingErrors && 'fields' in timingErrors && timingErrors.fields) {
          const newFields = { ...timingErrors.fields };
          delete newFields[fieldName as string];
          
          formApi.setErrorMap({
            ...currentErrorMap,
            [timing]: {
              fields: newFields,
            },
          });
        }
      });
    },

    clearAllErrors: () => {
      formApi.setErrorMap({});
    },
  };
}