// React
import type React from "react";

// Toolpad
import { type AppTheme } from "@toolpad/core/AppProvider";

export interface TableData {
    date: string;
    description: string;
    type: string;
    budget: string;
    payment: string;
    value: number;
}

export interface ExpensesTableProps {
    date: Date;
}

export interface ExpensesGraphProps {
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export interface TypesProps {
    showTypes: boolean;
    setShowTypes: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

export interface Month {
    abbreviation: string;
    complete: string;
}

// Meses do ano
export const months: Month[] = [
    {
        abbreviation: "Jan",
        complete: "Janeiro",
    },
    {
        abbreviation: "Fev",
        complete: "Fevereiro",
    },
    {
        abbreviation: "Mar",
        complete: "Março",
    },
    {
        abbreviation: "Abr",
        complete: "Abril",
    },
    {
        abbreviation: "Mai",
        complete: "Maio",
    },
    {
        abbreviation: "Jun",
        complete: "Junho",
    },
    {
        abbreviation: "Jul",
        complete: "Julho",
    },
    {
        abbreviation: "Ago",
        complete: "Agosto",
    },
    {
        abbreviation: "Set",
        complete: "Setembro",
    },
    {
        abbreviation: "Out",
        complete: "Outubro",
    },
    {
        abbreviation: "Nov",
        complete: "Novembro",
    },
    {
        abbreviation: "Dez",
        complete: "Dezembro",
    },
];

export interface ExpensesProps {
    theme: AppTheme | undefined;
}

export interface ExpensesBackendProps {
    expense_id: number;
    description: string;
    value: string;
    date: string;
    type_name: string;
    budget_name: string;
    payment_method: string;
    fk_type_id: number;
    fk_budget_id: number;
    fk_payment_id: number;
}

export interface ExpenseTypeBackendProps {
    expense_type_id: number;
    type: string;
    is_active: boolean;
    fk_user_id: number;
}

export interface BudgetsBackendProps {
    expense_budget_id: number;
    budget: string;
    is_active: boolean;
    fk_user_id: number;
}

export interface PaymentsBackendProps {
    expense_payment_id: number;
    payment: string;
    is_active: boolean;
    fk_user_id: number;
}

export interface ExpensesManagementProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
