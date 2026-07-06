import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    if (!name || !subject || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }
    await prisma.contactMessage.create({
      data: { name, email: email ?? "", phone, subject, message },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
