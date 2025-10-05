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
    setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
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
