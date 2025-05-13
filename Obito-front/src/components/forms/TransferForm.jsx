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
import { useState } from "react"
import { useProfile } from "../../hooks/useProfile"
import Transfer from "../dialogs/transfer"

const formSchema = z.object({
    accountTo: z.coerce
        .number({ invalid_type_error: "ID must be a valid number." })
        .int({ message: "ID must be an integer." })
        .min(1, { message: "ID must be a number sequence." }),
        
    amount: z.coerce
        .number({ invalid_type_error: "Amount must be a valid number." })
        .positive({ message: "Amount must be a positive number." })
        .min(1, { message: "Amount must be greater than 0." }),
})

const TransferForm = () => {
    const { profile } = useProfile()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const form = useForm({
            resolver: zodResolver(formSchema),
        })

    const onSubmit = (data) => {
        setFormData(data);
        setIsDialogOpen(true);
    }

    const handleConfirm = async () => {
        if (!formData) return

        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/newTransaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountFrom: profile.accountid,
                    accountTo: formData.accountTo,
                    amount: formData.amount,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al procesar la transferencia')
            }

            // Transacción exitosa
            setSuccessMessage('Transfer successful!')
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000) // Ocultar el mensaje después de 3 segundos
            setIsDialogOpen(false)
            setFormData(null)
            form.reset()
        } catch (error) {
            form.setError('root', { type: 'manual', message: error.message });
            setIsDialogOpen(false) // Cerrar el diálogo para mostrar el error
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="accountTo"
                        render={({ field }) => (
                            <FormItem className="space-y-1 mb-5">
                                <FormLabel>Other User Account ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="123456" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the ID of the user you want to transfer money to.
                                    <br /> <b>Be sure to double-check the ID before proceeding.</b>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="space-y-1 mb-5">
                                <FormLabel>Amount of Money</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the amount of money you want to transfer.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    {/* Mostrar mensaje de éxito o error */}
                    {successMessage && (
                        <div className="text-green-500 text-sm mb-4">
                            {successMessage}
                        </div>
                    )}
                    {form.formState.errors.root && (
                        <div className="text-red-500 text-sm mb-4">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    <Button type="submit" className="w-full">
                        Transfer
                    </Button>
                                       
                </form>
            </Form>

            <Transfer
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                formData={formData}
                onSubmit={handleConfirm}
                form={form}
                setSuccessMessage={setSuccessMessage}
            /> 
        </>
    );
}
 
export default TransferForm;