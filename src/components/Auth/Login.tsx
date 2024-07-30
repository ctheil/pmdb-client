import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { PMDB } from "@/api/pmdb-api"

const formSchema = z.object({
  email: z.string().min(3, { message: "Username must be at least 3 characters." }).email("Must be a valid email"),
  password: z.string().min(3, { message: "Username must be at least 3 characters." })
})

export default function Login() {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const pmdb = new PMDB()
    const loginResult = await pmdb.login(values.email, values.password)
    console.log(loginResult)
  }

  return <div className="w-screen h-screen flex items-center justify-center">
    <div className="w-[80%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="something@pmdb.com" {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.email?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.password?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  </div>
}
