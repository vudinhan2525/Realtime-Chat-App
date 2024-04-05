"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import http from "@/lib/http";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const response = await http.post<any>("/users/login", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === "success") {
        router.push("/home");
      }
    } catch (error: any) {}
  }
  return (
    <div className="min-w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 font-semibold px-6 min-w-[100px] "
          >
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
}
