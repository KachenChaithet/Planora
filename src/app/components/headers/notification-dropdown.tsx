"use client"

import { PopoverContent } from "@/components/ui/popover"
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useMarkAsRead } from "../hooks/use-notification";
import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import { Separator } from "@/components/ui/separator";

type RouterOutputs = inferRouterOutputs<AppRouter>
type Notification = RouterOutputs["notification"]["getNotifications"][number]
type NotificationDropdownProps = {
    data: Notification[]
    isLoading: boolean
}

export const NotificationDropdown = ({ data, isLoading }: NotificationDropdownProps) => {
    const { mutate: markAsRead } = useMarkAsRead()

    return (
        <PopoverContent className="w-80 p-0" side="left">

            <div className="px-4 py-3 font-semibold text-sm border-b bg-muted/40">
                Notifications
            </div>

            <div className="max-h-80 overflow-y-auto">

                {isLoading && (
                    <div className="p-4 text-sm text-muted-foreground">
                        Loading...
                    </div>
                )}

                {!isLoading && data.length === 0 && (
                    <div className="p-4 text-sm text-muted-foreground">
                        No notifications
                    </div>
                )}

                {data?.map((notification, index) => (
                    <div key={notification.id}>

                        <Link
                            href={notification.link}
                            onClick={() => markAsRead({ id: notification.id })}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-muted/60 transition-colors cursor-pointer"
                        >

                            {!notification.read && <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />}

                            <div className="flex flex-col">
                                <span className="text-sm font-medium leading-tight">
                                    {notification.type}
                                </span>

                                <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </span>
                            </div>

                        </Link>

                        {index !== data.length - 1 && <Separator />}
                    </div>
                ))}

            </div>

        </PopoverContent>
    )
}