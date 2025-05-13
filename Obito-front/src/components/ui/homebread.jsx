import { Link } from "react-router-dom"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbWithCustomSeparator({ component, route }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="underline">
          <Link to="/home">Home</Link>
        </BreadcrumbItem>
        { route != "" &&
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="underline">
              <Link to={ "/home" + route }>{ component }</Link>
            </BreadcrumbItem>
          </>
        }     
      </BreadcrumbList>
    </Breadcrumb>
  )
}
