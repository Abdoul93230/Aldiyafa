import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, offerId, category, notes } = await req.json();
    if (!userId || !offerId || !category) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }
    const reservation = await prisma.reservation.create({
      data: { userId, offerId, category, notes },
      include: { offer: true },
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId requis" }, { status: 400 });
  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: { offer: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
