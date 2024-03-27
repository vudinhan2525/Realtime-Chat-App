import z from "zod";

export const LoginBody = z.object({
  username: z.string().trim().min(2).max(40),
  password: z.string().min(6).max(100),
});
export type LoginBodyType = z.TypeOf<typeof LoginBody>;
export const RegisterBody = z
  .object({
    username: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
