import { describe, it, expect } from "vitest";
import { getEmployees } from "./employees";

describe("getEmployees", () => {
    it("reports the right total and page size", () => {
        const result = getEmployees(1, 5, "");
        expect(result.total).toBe(15);
        expect(result.items).toHaveLength(5);
        expect(result.total_pages).toBe(3);
    });

    it("filters by name, case-insensitively", () => {
        expect(getEmployees(1, 5, "cruz").total).toBe(2);
        expect(getEmployees(1, 5, "CRUZ").total).toBe(2);
    });

    it("returns an empty list when nothing matches", () => {
        const result = getEmployees(1, 5, "zzznobody");
        expect(result.total).toBe(0);
        expect(result.items).toEqual([]);
    });

    it("paginates — page 2 starts at the 6th employee", () => {
        const page2 = getEmployees(2, 5, "");
        expect(page2.items[0].id).toBe(6);
    });
});
