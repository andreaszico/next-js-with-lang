import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from "@/lib/form-context";
import { FormInput } from '@/components/custom/form/TextField';
import { FormTextarea } from '@/components/custom/form/FormTextArea';
import { FormSelect } from '@/components/custom/form/FormSelect';
import { FormCheckbox } from '@/components/custom/form/FormCheckbox';

const { useAppForm } = createFormHook({
    fieldContext: fieldContext,
    formContext: formContext,
    fieldComponents: {
        Input: FormInput,
        Textarea: FormTextarea,
        Select: FormSelect,
        Checkbox: FormCheckbox,
    },
    formComponents: {},
});


export { useAppForm };