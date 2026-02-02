"use client"

import { useState } from "react"
import { Mail, Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
}

interface SubscribersManagerProps {
  initialSubscribers: Subscriber[]
}

export function SubscribersManager({ initialSubscribers }: SubscribersManagerProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers)
  const { toast } = useToast()

  const handleDelete = async (subscriber: Subscriber) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return

    const supabase = createClient()
    const { error } = await supabase.from("email_subscribers").delete().eq("id", subscriber.id)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    setSubscribers(subscribers.filter((s) => s.id !== subscriber.id))
    toast({ title: "Subscriber removed" })
  }

  const exportToCSV = () => {
    const headers = ["Email", "Subscribed Date", "Status"]
    const rows = subscribers.map((s) => [
      s.email,
      new Date(s.subscribed_at).toLocaleDateString(),
      s.is_active ? "Active" : "Inactive",
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `subscribers-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subscribers</h1>
          <p className="text-muted-foreground">Manage your email newsletter subscribers</p>
        </div>
        {subscribers.length > 0 && (
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        )}
      </div>

      {subscribers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No subscribers yet</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Email List</CardTitle>
            <CardDescription>{subscribers.length} total subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>{formatDate(subscriber.subscribed_at)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        subscriber.is_active 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                      }`}>
                        {subscriber.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(subscriber)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  )
}
