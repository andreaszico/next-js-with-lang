import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { useFieldContext } from "@/lib/form-context"
import { Fragment, ReactNode } from "react"

export type FormControlProps = {
  label: string
  description?: string
  type?: string
}

type FormBaseProps = FormControlProps & {
  children: ReactNode
  horizontal?: boolean
  controlFirst?: boolean
}

export function FormBase({
  children,
  label,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps) {
  const field = useFieldContext()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  )
  const errorElem = isInvalid && <FieldError errors={field.state.meta.errors} />

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <Fragment>
          {children}
          <FieldContent>
            {labelElement}
            {errorElem}
          </FieldContent>
        </Fragment>
      ) : (
        <Fragment>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElem}
        </Fragment>
      )}
    </Field>
  )
}