import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-aoe-dark-blue flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-aoe-gold font-cinzel mb-2">Guardião do Foco</h1>
        <p className="text-aoe-light">Entre para continuar sua jornada</p>
      </div>

      <div className="bg-aoe-panel border border-aoe-border rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-cinzel text-aoe-gold mb-6 text-center">Login</h2>
        <LoginForm />
      </div>
    </div>
  )
}
