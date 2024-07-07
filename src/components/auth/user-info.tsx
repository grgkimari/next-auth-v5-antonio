
import { Card, CardContent, CardHeader } from "../ui/card";
import DisplayRow from "../display-row";
import { User } from "next-auth";

interface UserInfoProps{
    label : string,
    user? : User
}
export function UserInfo({label, user} : UserInfoProps){
    return <Card className="w-[600px] h-[600px] shadow-md">
        <CardHeader>
            <p className="text-2xl text-center font-semibold">{label}</p>

        </CardHeader>
        <CardContent className="space-y-4">
            <DisplayRow label="ID" content={user?.id || "Unknown"} />
            <DisplayRow label="Name" content={user?.name || "Unknown"} />
            <DisplayRow label="Email address" content={user?.email || "Unknown"} />
            
        </CardContent>
    </Card>
}