import {  useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../../components/ui/button";

const History = () => {
    const { profile } = useProfile();
    const [ error, setError ] = useState(null);
    const [ accountLog, setAccountLog ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => async () => {
        console.log(import.meta.env.VITE_BACK_URL)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/transactionsLog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountId: profile.accountid,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al procesar la transferencia')
            }
            setAccountLog(data.result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }, [profile])

    const handlePdf = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/pdfLog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountId: profile.accountid,
                    accountLog: accountLog,
                }),
            })
            if (!response.ok) {
                throw new Error('Error generating PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'movements_log.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="border p-4 rounded min-w-[150px]">
            <h1 className="text-xl font-semibold text-shadow-indigo-50 text-center pb-4 tracking-tight border-b-1">Movements Log</h1>
            {accountLog && (
                <Table>
                    <TableCaption>Last 20 Movements</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Log ID</TableHead>
                        <TableHead>Log Date</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accountLog.map((log) => (
                            <TableRow key={log.movementid}>
                                <TableCell className="font-medium">{log.movementid}</TableCell>
                                <TableCell>{ log.logdate }</TableCell>
                                <TableCell>{log.accountto}</TableCell>
                                <TableCell>{`${log.name} ${log.lastname}`}</TableCell>
                                <TableCell className="text-right">{`$${log.amount}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            )}
            <div className="flex justify-center pt-4 border-t-1 mt-4 flex-row">
                <Button onClick={handlePdf} className="tracking-tight">
                Download Logs
                </Button>
                {error && <p className="text-red-500">{error}</p>}
                {loading && <p className="text-gray-500">Loading...</p>}
            </div>
        </div>
    );
}
 
export default History;