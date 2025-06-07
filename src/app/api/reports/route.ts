import { getDbConnection } from "@/app/lib/db";
import type { DisasterReport, DisasterType } from "@/types/disaster";
import { format } from "date-fns";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

interface DBReport {
  id: number;
  title: string;
  disaster_category: DisasterType;
  location: string;
  description: string;
  author: string;
  documentation?: string | null | undefined;
  created_at: number;
  likes: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const db = getDbConnection();
    const reportsFromDb = db
      .prepare(
        `
      SELECT id, title, disaster_category, location, description, author, documentation, created_at, likes
      FROM reports
      ORDER BY created_at DESC
    `
      )
      .all() as DBReport[];

    const reports: DisasterReport[] = reportsFromDb.map((dbReport) => ({
      ...dbReport,
      id: String(dbReport.id),
      documentation: dbReport.documentation ? JSON.parse(dbReport.documentation) : [],
      created_at: Number(dbReport.created_at),
      likes: Number(dbReport.likes),
    }));

    return NextResponse.json(reports);
  } catch (error) {
    console.error("API GET /api/reports - Failed to fetch reports:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: "Failed to fetch reports", error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const disaster_category = formData.get("disaster_category") as DisasterType;
    const location = formData.get("location") as string;
    const author = formData.get("author") as string;
    const description = formData.get("description") as string;
    const filesInput = formData.getAll("documentation") as File[];

    if (!title || !disaster_category || !location || !author || !description) {
      return NextResponse.json({ message: "Semua field bertanda * wajib diisi." }, { status: 400 });
    }

    const uploadedFilePaths: string[] = [];
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    for (const file of filesInput) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const originalName = file.name;
        const timestampPrefix = format(new Date(), "yyyyMMddHHmmssSSS");

        const fileExtension = path.extname(originalName).toLowerCase(); // Contoh: '.jpg'

        let fileNameWithoutExt = path.basename(originalName, path.extname(originalName));

        fileNameWithoutExt = fileNameWithoutExt
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/g, "")
          .replace(/_{2,}/g, "_")
          .replace(/-{2,}/g, "-")
          .substring(0, 100);

        if (!fileNameWithoutExt) {
          fileNameWithoutExt = "file";
        }

        const uniqueFilename = `${timestampPrefix}_${fileNameWithoutExt}${fileExtension}`;

        const filePath = path.join(uploadDir, uniqueFilename);

        await fs.writeFile(filePath, buffer);
        uploadedFilePaths.push(`/uploads/${uniqueFilename}`);
      }
    }

    const db = getDbConnection();
    const stmt = db.prepare(`
      INSERT INTO reports (title, disaster_category, location, author, description, documentation, created_at, likes)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0)
    `);

    const documentationString = uploadedFilePaths.length > 0 ? JSON.stringify(uploadedFilePaths) : null;
    const createdAtTimestamp = Date.now();

    const info = stmt.run(title, disaster_category, location, author, description, documentationString, createdAtTimestamp);

    return NextResponse.json(
      {
        message: "Laporan berhasil dikirim! Terima kasih telah berkontribusi.",
        reportId: String(info.lastInsertRowid),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API POST /api/reports - Failed to submit report:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: "Gagal menyubmit laporan.", error: errorMessage }, { status: 500 });
  }
}
