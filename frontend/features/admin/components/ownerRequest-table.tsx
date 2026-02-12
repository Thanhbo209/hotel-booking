"use client";

import useOwnerRequestsAdmin from "@/features/admin/hooks/useOwnerRequestsAdmin";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function OwnerRequestsPage() {
  const { requests, loading, actionId, approve, reject } =
    useOwnerRequestsAdmin();

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Owner Requests</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage pending owner access requests
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-4 py-2">
          {requests.length} Pending
        </Badge>
      </div>

      {/* Table Card */}
      <Card className="border-none shadow-lg">
        <CardContent className="">
          <div className="overflow-hidden  rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50  hover:bg-muted/50 border-b">
                  <TableHead className="font-semibold text-center">
                    User
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Contact
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Message
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Requested
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {requests.length === 0 && (
                  <TableRow className="hover:bg-transparent ">
                    <TableCell colSpan={5} className="h-64 ">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="rounded-full bg-muted p-6 mb-4">
                          <CheckCircle2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">
                          All caught up!
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-sm">
                          There are no pending owner requests at the moment.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {requests.map((req) => (
                  <TableRow
                    key={req._id}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    {/* User Info */}
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-3">
                        <Avatar className="h-10 w-10  ring-2 ring-background">
                          <AvatarImage src={req.user.avatarURL} />
                          <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-500 text-white font-semibold">
                            {req.user.fullName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold  text-sm">
                            {req.user.fullName}
                          </p>
                          <p className="text-xs  text-muted-foreground">
                            ID: {req.user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground ">
                          {req.user.email}
                        </span>
                      </div>
                    </TableCell>

                    {/* Message */}
                    <TableCell className="py-4 max-w-xs">
                      {req.message ? (
                        <div className="flex items-start justify-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {req.message}
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm italic">
                          No message
                        </span>
                      )}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {new Date(req.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(req.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          disabled={actionId === req._id}
                          onClick={() => approve(req._id)}
                          className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1.5" />
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={actionId === req._id}
                          onClick={() => reject(req._id)}
                          className="shadow-sm"
                        >
                          <XCircle className="h-4 w-4 mr-1.5" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
