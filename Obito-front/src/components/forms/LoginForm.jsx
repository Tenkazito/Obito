"use client"

import { Input } from "../ui/input"
import { Button } from "../ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useContext } from "react"
import { ProfileContext } from "@/context/profileContext"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email address." }),
    password: z.string()
        .min(5, { message: "Password is required.", }),
})

const LoginForm = () => {
    const { updateProfile } = useContext(ProfileContext);
    const Navigate = useNavigate()

    const onSubmit = async (data, form) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/logIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error creating user');
            }
    
            const { result } = await response.json();
            
            updateProfile({
                name: result.name,
                lastname: result.lastname,
                email: result.email,
                accountid: result.accountid,
                active: result.active,
            });
            Navigate("/home", { replace: true });
        } catch (error) {
            console.error('Error fetching data:', error.message);
            form.setError('root', { type: 'manual', message: error.message });
        }
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => onSubmit(data, form))}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1 mb-5">
                                <FormLabel>Account Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Obito@bank.com" {...field} />
                                </FormControl>
                                {/*<FormDescription>
                                    This is the Email associated to your account.
                                    <br /> If you don't have an account, go to Sign Up.
                                </FormDescription>*/}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="space-y-1 mb-5">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                {/*<FormDescription>
                                    This is the password of your account. You can find it in the app.
                                    <br /> If you don't have an account, go to Sign Up.
                                </FormDescription>*/}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                        {form.formState.errors.root && (
                            <div className="text-red-500 text-sm mb-4">
                                {form.formState.errors.root.message}
                            </div>
                        )}

                    <Button type="submit" className="w-full">Log in</Button>
                </form>
            </Form>
        </>
    );
}
 
export default LoginForm;