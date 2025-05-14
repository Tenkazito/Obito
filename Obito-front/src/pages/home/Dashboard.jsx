import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useProfile } from "@/hooks/useProfile";

const Dashboard = () => {
    const { profile } = useProfile();

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-200 mb-10 tracking-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500">Obito Bank</span>
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                        This is your dashboard. You can see your account information and other details here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Ms./Mr. {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <p>Account ID: {profile.accountid}</p>
                    <p>Active: {profile.active ? "Yes" : "No"}</p>
                </CardContent>
                <CardFooter>
                    <p>You can share your id with other people so they can send you money.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
 
export default Dashboard;