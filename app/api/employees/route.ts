import { NextRequest, NextResponse } from "next/server";
import { getEmployees } from "@/lib/employees";

// GET /api/employees?page=1&page_size=5&search=...
export function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const page = Number(params.get("page")) || 1;
    const pageSize = Number(params.get("page_size")) || 5;
    const search = params.get("search") || "";

    return NextResponse.json(getEmployees(page, pageSize, search));
}
