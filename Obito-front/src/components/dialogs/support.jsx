import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { BadgeCheck } from "lucide-react"
import { useState } from "react"
import SupportForm from "../forms/SupportForm"

export default function Support() {
    const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <DropdownMenuItem
            onSelect={(e) => {
                e.preventDefault(); // Evita que el DropdownMenu se cierre
                setOpen(true); // Abre el diálogo
              }}
              className="flex flex-row gap-2 cursor-pointer"
        >
            <BadgeCheck className="h-4 w-4" />
            Support
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Feedback and Complaints</SheetTitle>
          <SheetDescription>
            Fill the form below and we will get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>
        
        <SupportForm setOpen={setOpen} />

      </SheetContent>
    </Sheet>
  )
}
