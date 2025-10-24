


import { CreditCard } from "lucide-react"
import { Field,
        FieldDescription,
        FieldGroup,
        FieldLabel,
        FieldSet,
 } from "../ui/field"

 import { Input } from "../ui/input"
 import { Button } from "../ui/button"



export default function Budget() {


  return (
    <div>
        <CreditCard />
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">name</FieldLabel>
            <Input id="username" type="text" placeholder="Enter budget name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password"> total_amount</FieldLabel>
            <Input id="password" type="password" placeholder="Enter total_budget amount" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">limit_amount</FieldLabel>
            <Input id="password" type="password" placeholder="Enter budget_limit" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">start_date</FieldLabel>
            <Input id="password" type="password" placeholder="Enter start_date for your budget" />
          </Field>
           <Field>
            <FieldLabel htmlFor="password">end_date</FieldLabel>
            <Input id="password" type="password" placeholder="Enter end_date for your budget" />
          </Field>
            <Field orientation="horizontal">
            <Button type="submit">Save</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
      
    </div>
  )
}
