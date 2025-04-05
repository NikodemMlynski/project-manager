import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {toast} from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLoginMutation } from "./useLoginMutation"
import { useAuth } from "@/context/AuthProvider";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export function LoginForm() {
    const {login} = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const mutation = useLoginMutation();
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(
        {email: values.email, password: values.password},
        {
            onSuccess: (data: {access_token: string, token_type: string}) => {
                console.log(data);
                login(data.access_token)
                
                toast.success("Succesfully login");
            },
            onError: (error) => {
                toast.error(error.message)
            }
        }
    )
    console.log(values)
  }

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-96 p-8 rounded-2xl shadow-lg"
          style={{
            backgroundColor: "var(--extra)",
            color: "var(--text)",
          }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />
          <Button 
          className="w-full bg-button-primary text-extra-green hover:bg-button-secondary"
          disabled={mutation.isPending}
          >
            {mutation.isPending ? "Pending...": "Submit"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/signup" className="hover:underline" style={{color: 'var(--accent)'}}>
                Sign up
            </Link>
            </p>

        </form>
      </Form>
    </div>
  )
}
