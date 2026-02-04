
"use client";

import { useState } from "react";
import { DollarSign, ArrowRightLeft } from "lucide-react";

const RATES: Record<string, number> = {
    VND: 25450,
    EUR: 0.92,
    JPY: 151.5,
    GBP: 0.78
};

export default function CurrencyConverter({ amountUSD }: { amountUSD: number }) {
    const [currency, setCurrency] = useState("VND");
    const [isOpen, setIsOpen] = useState(false);

    const converted = (amountUSD * RATES[currency]).toLocaleString(undefined, {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0
    });

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-xs flex items-center gap-1 text-primary hover:underline font-medium"
            >
                <ArrowRightLeft size={12} />
                Convert
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-red-100 shadow-xl rounded-lg p-3 z-50 min-w-[200px] animate-fade-in">
                    <div className="text-xs text-muted mb-2 font-semibold uppercase">Estimated Salary</div>
                    <div className="text-lg font-bold text-foreground mb-2">
                        {converted}
                    </div>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded p-1"
                    >
                        {Object.keys(RATES).map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}
