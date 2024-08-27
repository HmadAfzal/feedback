import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./account-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Additional</h3>
        <p className="text-sm text-muted-foreground">
        Customize your thank you page.
        Add a personal message to show your appreciation.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}