import { EventFilterTypes } from "@/types/Events";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/Prisma";

// GET all events
export async function GET(req: NextApiRequest) {
  const baseURL = process.env.NEXTAUTH_URL! || "http://localhost:3000";
  const url = new URL(req.url!, baseURL);

  const filter: EventFilterTypes = url.searchParams.get(
    "filter"
  ) as EventFilterTypes;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Set to the start of the day
  const todayEnd = new Date(todayStart);
  todayEnd.setHours(23, 59, 59, 999); // Set to the end of the day

  let events;

  try {
    if (filter === EventFilterTypes.TODAY) {
      events = await prisma.event.findMany({
        where: {
          date: {
            gte: todayStart,
            lt: todayEnd,
          },
        },
      });
    } else if (filter === EventFilterTypes.FUTURE) {
      events = await prisma.event.findMany({
        where: {
          date: {
            gt: todayEnd,
          },
        },
      });
    } else if (filter === EventFilterTypes.PAST) {
      events = await prisma.event.findMany({
        where: {
          date: {
            lt: todayStart,
          },
        },
      });
    } else {
      events = await prisma.event.findMany();
    }

    return NextResponse.json(events);
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create a new event
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, date } = await req.json();

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        addedById: session.user.id,
      },
    });
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update existing events
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { ids, published } = await req.json();

  try {
    const updatedEvents = await prisma.event.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        published: published,
      },
    });
    return NextResponse.json(updatedEvents);
  } catch (error: any) {
    console.error("Error updating events:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// DELETE an event
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  try {
    await prisma.event.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
