import { PlayerForm } from "@/components/admin/player-form"

export default function NewPlayerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#002E5D]">Add New Player</h1>
        <p className="text-gray-500">Create a new player entry</p>
      </div>

      <PlayerForm />
    </div>
  )
}

