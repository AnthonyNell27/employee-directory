"use client";

import { useEffect, useState } from "react";
import { fmtMoney } from "@/lib/format";
import { validateMobile } from "@/lib/validate";
import type { Employee } from "@/lib/employees";

const PAGE_SIZE = 5;

export default function Home() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Same-origin API route — no external URL needed.
        const url = `/api/employees?page=${page}&page_size=${PAGE_SIZE}&search=${encodeURIComponent(search)}`;
        setError("");
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setEmployees(data.items);
                setTotal(data.total);
                setTotalPages(data.total_pages || 1);
            })
            .catch(() => {
                setEmployees([]);
                setError("Could not load employees. Please try again.");
            });
    }, [page, search]);

    return (
        <main className="page">
            <div className="container">
                <header className="header">
                    <h1>Employee Directory</h1>
                    <p className="subtitle">{total} employees</p>
                </header>

                <div className="card">
                    <input
                        className="search"
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                    {error && <p className="error">{error}</p>}

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th style={{ textAlign: "right" }}>Monthly Rate</th>
                                <th>Contact Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td className="empty" colSpan={4}>
                                        No employees found.
                                    </td>
                                </tr>
                            ) : (
                                employees.map((emp) => {
                                    const check = validateMobile(emp.contact_number);
                                    return (
                                        <tr key={emp.id}>
                                            <td>{emp.name}</td>
                                            <td>{emp.department}</td>
                                            <td className="rate">{fmtMoney(emp.monthly_rate)}</td>
                                            <td>
                                                {emp.contact_number}
                                                <span
                                                    className={check.valid ? "badge badge-valid" : "badge badge-invalid"}
                                                    title={check.reason}
                                                >
                                                    {check.valid ? "valid" : "invalid"}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                            Prev
                        </button>
                        <span className="page-info">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="btn"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page >= totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
