import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Space</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see your space.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}