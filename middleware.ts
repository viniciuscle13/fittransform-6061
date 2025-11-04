import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Permitir todas as rotas por enquanto
  // O controle de acesso será feito no lado do cliente
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}