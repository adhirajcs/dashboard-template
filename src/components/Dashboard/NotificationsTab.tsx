import { Card, CardContent } from "@/components/ui/card"

export function NotificationsTab() {
  const notifications = [
    { id: 1, title: "New Order", description: "Order #12345 placed successfully", time: "2 minutes ago" },
    { id: 2, title: "Payment Received", description: "Payment of $1,999.00 received from Olivia Martin", time: "1 hour ago" },
    { id: 3, title: "System Update", description: "Dashboard system has been updated to v2.5", time: "3 hours ago" },
    { id: 4, title: "Low Stock Alert", description: "Product XYZ has low inventory levels", time: "5 hours ago" },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {notifications.map((notif) => (
          <Card key={notif.id} className="py-0 cursor-pointer transition-colors hover:bg-accent/80">
            <CardContent className="py-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{notif.title}</h4>
                  <p className="text-sm text-muted-foreground">{notif.description}</p>
                </div>
                <span className="ml-4 whitespace-nowrap text-xs text-muted-foreground">{notif.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
