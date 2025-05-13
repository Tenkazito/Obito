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

import { SheetFooter, SheetClose } from "../ui/sheet"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    title: z.string()
        .min(5, { message: "Title is required.", })
        .max(50, { message: "Title must be less than 50 characters.", }),
    description: z.string()
        .min(10, { message: "Description is required.", })
        .max(500, { message: "Description must be less than 500 characters.", }),
})

const onSubmit = (data) => {
    console.log(data)
}

const SupportForm = ({ setOpen }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    return (
        <> 
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="space-y-1 mb-5">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descriptive Title" {...field} />
                                </FormControl>
                                {/*<FormDescription>
                                    This is the title of your message.
                                </FormDescription>*/}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="space-y-1 mb-5">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Message..." {...field} />
                                </FormControl>
                                {/*<FormDescription>
                                    This is the description of your message.
                                </FormDescription>*/}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <SheetFooter className="mt-0 pl-4 pt-2 ml-50 mr-0 pr-0">
                        <SheetClose asChild>
                            <Button type="submit" onClick={() => setOpen(false)}>Send</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </Form>
        </>
    );
}
 
export default SupportForm;