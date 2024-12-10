import { useMemo } from "react"

export default function CategoryCards({ expenseRecords, expenseCategories }) {
    // Ensure props are not undefined or null
    if (!expenseRecords || !expenseCategories) {
        console.error("Missing expenseRecords or expenseCategories props")
        return null
    }

    // Calculate total expense for each category
    const categoryTotals = useMemo(() => {
        const totals = {}
        expenseCategories.forEach((category) => {
            totals[category] = expenseRecords
                .filter((record) => record.category === category)
                .reduce((sum, record) => sum + parseFloat(record.amount || 0), 0)
        })
        return totals
    }, [expenseRecords, expenseCategories])

    return (
        <div className="format-container">
            <div className="categories_box">
                {expenseCategories.map((category, index) => (
                    <div key={index} className="categories-item">
                        <div className={`categories-item_bg categories-item_bg-${(index % 8) + 1}`}></div>

                        <div className="categories-item_title">{category}</div>

                        <div className="categories-amount-box">
                            Total Expense: &nbsp;
                            <span className="categories-amount">
                                ₹{categoryTotals[category]?.toFixed(2) || 0}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add WalletCard here */}
            {/* <WalletCard walletBalance={walletBalance} setWalletBalance={setWalletBalance} /> */}
        </div>
    )
}
