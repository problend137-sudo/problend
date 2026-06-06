import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { writeAuditLog } from "@/db/queries/analytics";
import { getAdminExportRows, isAdminExportDataset } from "@/db/queries/admin-operations";
import { requireAdmin } from "@/features/admin-auth/guards";
import { analyticsEvents } from "@/features/analytics/events";
import { trackEventAction } from "@/features/analytics/actions";
import { toCsv } from "@/lib/csv";
import { getRequestMetadata } from "@/lib/request";

type ExportContext = {
  params:
    | Promise<{
        dataset: string;
      }>
    | {
        dataset: string;
      };
};

export async function GET(request: NextRequest | Request, context: ExportContext) {
  const admin = await requireAdmin();
  const { dataset } = await context.params;

  if (!isAdminExportDataset(dataset)) {
    return NextResponse.json({ message: "Unsupported export dataset." }, { status: 404 });
  }

  const rows = await getAdminExportRows(dataset);
  const csv = toCsv(rows);
  const { ipAddress, userAgent } = await getRequestMetadata();
  const sourcePath = new URL(request.url).pathname;

  await Promise.all([
    writeAuditLog({
      adminUserId: admin.user.id,
      action: "admin.export.created",
      entityType: "export",
      entityId: null,
      metadata: {
        dataset,
        rowCount: rows.length
      },
      ipAddress,
      userAgent
    }),
    trackEventAction({
      eventName: analyticsEvents.exportCreated,
      sourcePath,
      sessionId: admin.session.id,
      metadata: {
        dataset,
        rowCount: rows.length
      }
    })
  ]);

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${dataset}.csv"`
    }
  });
}
