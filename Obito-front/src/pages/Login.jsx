import LoginForm from "../components/forms/LoginForm"
import SignupForm from "../components/forms/SignupForm"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { useState } from "react"
import { ModeToggle } from "../components/ui/mode-toggle"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"

const Login = () => {
    const [activeTab, setActiveTab] = useState("Log in");

    return (   
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-950 text-center px-4">
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
        Welcome to <span className="text-blue-600 dark:text-blue-400">Obito Bank</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
        Your money, your future. Safe, fast and always with you.
      </p>

      <div className="w-full max-w-4xl flex justify-center items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Log in">Log in</TabsTrigger>
                    <TabsTrigger value="Sign up">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="Log in">
                    <Card>
                    <CardHeader>
                        <CardTitle>Log in</CardTitle>
                        <CardDescription>
                            Fill your data to log in to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       <LoginForm />
                    </CardContent>        
                    </Card>
                </TabsContent>

                <TabsContent value="Sign up">
                    <Card>
                    <CardHeader>
                        <CardTitle>Sign up</CardTitle>
                        <CardDescription>
                        Register to create a new account and access al services.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <SignupForm setActiveTab={setActiveTab}/>
                    </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
      </div>
    </section> 
    );
}
 
export default Login;