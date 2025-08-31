import type React from "react";

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

export interface ExpensesTypesProps {
    showExpensesTypes: boolean;
    setShowExpensesTypes: React.Dispatch<React.SetStateAction<boolean>>;
}
