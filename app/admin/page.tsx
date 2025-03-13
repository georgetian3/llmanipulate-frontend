import { AuthGuard } from "@/components/auth";



function AdminPage() {
  return (
    <div>
      Admin Page
    </div>
  )
}

export default function AdminPageAuthed() {
  return (
    <AuthGuard admin>
      <AdminPage />
    </AuthGuard>
  )
}