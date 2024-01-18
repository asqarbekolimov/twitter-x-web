import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Modal from "../ui/modal";
import useRegisterModel from "@/hooks/useRegisterModal";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerStep1Schema, registerStep2Schema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import useLoginModel from "@/hooks/useLoginModal";

export default function RegisterModal() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "" });

  const loginModal = useLoginModel();
  const registerModal = useRegisterModel();

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, []);

  const bodyContent =
    step === 1 ? (
      <RegisterSetp1 setData={setData} setStep={setStep} />
    ) : (
      <RegisterSetp2 />
    );
  const footer = (
    <div className="text-neutral-400 text-center mb-4">
      <p>
        Already have an account {""}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title="Create an account"
      body={bodyContent}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalSteps={2}
    />
  );
}

function RegisterSetp1({
  setData,
  setStep,
}: {
  setData: Dispatch<SetStateAction<{ name: string; email: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof registerStep1Schema>>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerStep1Schema>) {
    setData(values);
    setStep(2);
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
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
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          label="Next"
          type="submit"
          secondary
          fullWidth
          large
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
function RegisterSetp2() {
  const form = useForm<z.infer<typeof registerStep2Schema>>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerStep2Schema>) {
    console.log(values);
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          label="Register"
          type="submit"
          secondary
          fullWidth
          large
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
