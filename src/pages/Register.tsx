import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import AuthForm from "@/components/form/AuthForm";
import { useAuthMutation } from "@/hooks/auth/useAuthMutation";
import type { RegisterCredentials } from "@/types/auth";

const image = "/register_picture.png";

type FormErrors = Record<string, { message?: string }>;

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const formSchema = z
  .object({
    email: z.string().email({
      message: "Email must be a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(32, {
        message: "Password must be less than 32 characters.",
      })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const { register } = useAuthMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onError = useCallback((errors: FormErrors) => {
    Object.values(errors).forEach((error) => {
      toast({
        variant: "destructive",
        title: "Form submission failed",
        description: error.message,
      });
    });
  }, []);

  const onSubmit = useCallback(
    (values: FormValues) => {
      const credentials: RegisterCredentials = {
        email: values.email,
        password: values.password,
      };
      register.mutate(credentials);
    },
    [register]
  );

  return (
    <AuthForm<FormValues>
      title="Sign Up"
      description="Enter your details to create a new account"
      fields={[
        {
          label: "Email",
          type: "email",
          id: "email",
          placeholder: "johndoe@gmail.com",
          name: "email",
        },
        {
          label: "Password",
          type: "password",
          id: "password",
          placeholder: "",
          name: "password",
        },
        {
          label: "Confirm Password",
          type: "password",
          id: "confirmPassword",
          placeholder: "",
          name: "confirmPassword",
        },
      ]}
      form={form}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={register.isPending}
      image={image}
      buttonText="Register"
      redirectText="Already have an account? "
      redirectButton="Login"
      redirectLink="/login"
      reverseGrid={true}
    />
  );
}
