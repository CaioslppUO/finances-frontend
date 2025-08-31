export interface TableData {
    date: string;
    description: string;
    type: string;
    budget: string;
    payment: string;
    value: number;
}

export interface ExpensesTableProps {
    data: TableData[];
    month: string;
}

export interface ExpensesGraphProps {
    expenses: number[];
}
