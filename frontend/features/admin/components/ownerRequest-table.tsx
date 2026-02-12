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

export default function OwnerRequestsPage() {
  const { requests, loading, actionId, approve, reject } =
    useOwnerRequestsAdmin();

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Owner Requests</h1>

      <Table className="bg-card border border-border">
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No pending requests
              </TableCell>
            </TableRow>
          )}

          {requests.map((req) => (
            <TableRow key={req._id}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={req.user.avatarURL} />
                  <AvatarFallback>{req.user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{req.user.fullName}</span>
              </TableCell>

              <TableCell>{req.user.email}</TableCell>

              <TableCell>
                {req.message || (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell>
                {new Date(req.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  disabled={actionId === req._id}
                  onClick={() => approve(req._id)}
                >
                  Approve
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  disabled={actionId === req._id}
                  onClick={() => reject(req._id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
