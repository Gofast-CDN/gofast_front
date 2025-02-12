import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import AuthForm from "@/components/form/AuthForm";
import { useAuthMutation } from "@/hooks/auth/useAuthMutation";
import { LoginCredentials } from "@/types/auth";

const image = "/login_picture.jpeg";

type FormErrors = Record<string, { message?: string }>;

interface FormValues {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Login() {
  const { login } = useAuthMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
    (values: LoginCredentials) => {
      login.mutate(values);
    },
    [login]
  );

  return (
    <AuthForm<FormValues>
      title="Login"
      description="Enter your details to login to your account"
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
      ]}
      form={form}
      onSubmit={onSubmit}
      onError={onError}
      isLoading={login.isPending}
      image={image}
      buttonText="Login"
      redirectText="Didn't have an account? "
      redirectButton="Register"
      redirectLink="/register"
      reverseGrid={false}
    />
  );
}
