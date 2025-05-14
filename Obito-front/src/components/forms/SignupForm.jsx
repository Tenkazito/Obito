"use client"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { CountryDropdown } from "../ui/country-dropdown"
import { Link } from "react-router-dom"

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
import { useState } from "react"

const formSchema = z.object({
    name: z.string()
        .min(3, { message: "Name is required.", }),
    lastName: z.string()
        .min(3, { message: "Last name is required.", }),
    email: z.string()
        .email()
        .min(3, { message: "Email is required.", }),
    country: z.string()
        .min(3, { message: "Country is required.", }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
})

const onSubmit = async (data, form, setSuccessMessage) => {
    const { confirmPassword, ...userData } = data; // eslint-disable-line no-unused-vars

    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/newUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error creating user');
        }

        const result = await response.json();
        console.log('Usuario creado:', result);
        setSuccessMessage('User created successfully! now you can ');
        form.reset();

    } catch (error) {
        console.error('Error fetching data:', error.message);
        form.setError('root', { type: 'manual', message: error.message });
    }
};

const SignupForm = ({ setActiveTab }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            country: '',
            password: '',
            confirmPassword: '',
        },
    });
    const [successMessage, setSuccessMessage] = useState(null);

    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit((data) => onSubmit(data, form, setSuccessMessage))}>
                    <div className="flex flex-row gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-1 mb-5 flex-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mike" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="space-y-1 mb-5 flex-1">
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Oxsmall" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1 mb-5">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="myemail@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="space-y-1 mb-5">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                <CountryDropdown
                                    placeholder="Select country"
                                    defaultValue={field.value}
                                    onChange={(country) => { field.onChange(country.alpha3) }}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-row gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1 mb-5 flex-1">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-1 mb-5 flex-1">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                        {/* Mostrar mensaje de éxito o error */}
                        {successMessage && (
                            <div className="text-green-500 text-sm mb-4">
                                {successMessage}
                                <b onClick={() => setActiveTab("Log in")} className="text-blue-600">Log in</b>
                            </div>
                        )}
                        {form.formState.errors.root && (
                            <div className="text-red-500 text-sm mb-4">
                                {form.formState.errors.root.message}
                            </div>
                        )}
                        
                        <Button type="submit" className="w-full">Sign up</Button>
                </form>
            </Form>
        </>
    );
}
 
export default SignupForm;