import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { IUserIn, useSignUpMutation } from "./useSignUpMutation";

const formSchema = z
  .object({
    username: z
      .string()
      .min(4, "Minimum 4 znaki")
      .max(50, "Maksymalnie 50 znaków"),
    email: z.string().email("Nieprawidłowy email"),
    password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Hasła muszą być takie same",
    path: ["passwordConfirm"],
  });

export function SignUpForm() {
    const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const mutation = useSignUpMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(
        {
            username: values.username,
            email: values.email,
            password: values.password
        },
        {
            onSuccess: (data: IUserIn) => {
                console.log(data);
                toast.success("Successfully created account")
                navigate("/signin");
            },
            onError: (error) => {
                console.log(error);
                toast.error(error.message);
            }
        }
    )    
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="your_username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-button-primary text-extra-green hover:bg-button-secondary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Pending..." : "Submit"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="hover:underline"
              style={{ color: "var(--accent)" }}
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
