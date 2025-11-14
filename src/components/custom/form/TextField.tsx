import { Input } from "@/components/ui/input"
import { useFieldContext } from "@/lib/form-context"
import { FormBase, FormControlProps } from "./FormBase"

export function FormInput(props: FormControlProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={e => {
          if (field.state.meta.errorMap) {
            field.setErrorMap({
              onChange: undefined,
            })
          }
          field.handleChange(e.target.value)
        }}        
        aria-invalid={isInvalid}
        type={props.type}
      />
    </FormBase>
  )
}