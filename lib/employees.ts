export interface Employee {
    id: number;
    name: string;
    department: string;
    monthly_rate: number;
    contact_number: string;
}

// Fake seed data (a real app would read this from a database).
export const EMPLOYEES: Employee[] = [
    { id: 1, name: "Ana Reyes", department: "Engineering", monthly_rate: 85000, contact_number: "09171234567" },
    { id: 2, name: "Juan dela Cruz", department: "Engineering", monthly_rate: 92000, contact_number: "+639181234567" },
    { id: 3, name: "Maria Santos", department: "Human Resources", monthly_rate: 65000, contact_number: "09221234567" },
    { id: 4, name: "Jose Garcia", department: "Finance", monthly_rate: 78000, contact_number: "09331234567" },
    { id: 5, name: "Liza Bautista", department: "Marketing", monthly_rate: 70000, contact_number: "+639441234567" },
    { id: 6, name: "Mark Villanueva", department: "Sales", monthly_rate: 60000, contact_number: "09551234567" },
    { id: 7, name: "Grace Mendoza", department: "Finance", monthly_rate: 81000, contact_number: "09661234567" },
    { id: 8, name: "Paolo Aquino", department: "Engineering", monthly_rate: 99000, contact_number: "+639171234568" },
    { id: 9, name: "Bea Ramos", department: "Operations", monthly_rate: 58000, contact_number: "09171234569" },
    { id: 10, name: "Carlo Tan", department: "Sales", monthly_rate: 62500, contact_number: "09181234560" },
    { id: 11, name: "Diana Cruz", department: "Human Resources", monthly_rate: 67000, contact_number: "09191234561" },
    { id: 12, name: "Erwin Lim", department: "Engineering", monthly_rate: 88000, contact_number: "+639201234562" },
    { id: 13, name: "Faith Gonzales", department: "Marketing", monthly_rate: 72000, contact_number: "09211234563" },
    { id: 14, name: "Gabriel Torres", department: "Operations", monthly_rate: 56000, contact_number: "09221234564" },
    { id: 15, name: "Hannah Flores", department: "Finance", monthly_rate: 83000, contact_number: "+639231234565" },
];

export interface EmployeesPage {
    items: Employee[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
}

/**
 * Return a paginated, optionally name-filtered page of employees.
 * Pure logic (no web/HTTP) so it's easy to unit-test.
 */
export function getEmployees(page = 1, pageSize = 5, search = ""): EmployeesPage {
    const filtered = EMPLOYEES.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
    );
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return {
        items,
        total,
        page,
        page_size: pageSize,
        total_pages: Math.max(1, Math.ceil(total / pageSize)),
    };
}
