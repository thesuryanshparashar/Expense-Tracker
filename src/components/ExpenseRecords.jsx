import { useEffect, useState, useMemo } from "react"
import CategoryCards from "./CategoryCards"
import WalletCard from "./WalletCard"
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react"

export default function ExpenseRecords() {
    const [expenseRecords, setExpenseRecords] = useState([])

    const [newExpenseRecord, setNewExpenseRecord] = useState({
        date: "",
        description: "",
        category: "",
        amount: "",
        paymentMethod: ""
    })

    const [walletBalance, setWalletBalance] = useState(0)

    const [expenseCategories] = useState([
        "Bills & Utilities",
        "Education",
        "Entertainment",
        "Food",
        "Health & Wellness",
        "Shopping",
        "Transport",
        "Other"
    ])

    // Pagination state
    const [page, setPage] = useState(1)
    const rowsPerPage = 10
    const pages = Math.ceil(expenseRecords.length / rowsPerPage)

    // Paginate the data
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return expenseRecords.slice(start, end)
    }, [page, expenseRecords])

    // Load initial data from localStorage
    useEffect(() => {
        const savedExpenseRecords = JSON.parse(localStorage.getItem("expenseRecords")) || []
        setExpenseRecords(savedExpenseRecords)

        const savedWalletBalance = JSON.parse(localStorage.getItem("walletBalance")) || 0
        setWalletBalance(savedWalletBalance)
    }, [])

    // Save expense records to localStorage when they change
    useEffect(() => {
        localStorage.setItem("expenseRecords", JSON.stringify(expenseRecords))
    }, [expenseRecords])

    // Save wallet balance to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("walletBalance", JSON.stringify(walletBalance))
    }, [walletBalance])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewExpenseRecord((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddExpense = (event) => {
        event.preventDefault()

        const { date, description, category, amount, paymentMethod } = newExpenseRecord

        console.log("Current Expense Record Before Validation:", newExpenseRecord)

        if (date && description && category && amount && paymentMethod) {
            console.log("Adding Expense Record:", newExpenseRecord)

            const expenseAmount = parseFloat(amount)

            if (paymentMethod === "Wallet") {
                if (walletBalance >= expenseAmount) {
                    setWalletBalance(walletBalance - expenseAmount)
                } else {
                    alert("Insufficient wallet balance")
                    return
                }
            }

            setExpenseRecords([newExpenseRecord, ...expenseRecords])
            setNewExpenseRecord({
                date: "",
                description: "",
                category: "",
                amount: "",
                paymentMethod: ""
            })
        } else {
            alert("Please fill in all fields before adding a record")
        }
    }

    // useEffect(() => {
    //     localStorage.setItem("expenseRecords", JSON.stringify([
    //         { amount: "101", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "102", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "103", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "104", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "105", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "106", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "107", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "108", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "109", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "110", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "111", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //         { amount: "112", category: "Health & Wellness", date: "2024-12-04", description: "Lorem ipsum", paymentMethod: "Net Banking" },
    //     ]))
    // })


    const handleDeleteExpense = (index) => {
        const updatedRecords = expenseRecords.filter((_, recordIndex) => recordIndex !== index)
        setExpenseRecords(updatedRecords)
    }

    return (
        <>
            {expenseCategories && expenseRecords && (
                <CategoryCards
                    expenseRecords={expenseRecords}
                    expenseCategories={expenseCategories}
                />
            )}

            <WalletCard walletBalance={walletBalance} setWalletBalance={setWalletBalance} />

            <div className="expense-table">
                <form className="add-expense-form" onSubmit={handleAddExpense}>
                    <input
                        type="date"
                        name="date"
                        className="input-field"
                        value={newExpenseRecord.date}
                        onChange={(event) => handleInputChange(event)}
                        required
                        aria-label="Expense Date"
                    />
                    <input
                        type="text"
                        name="description"
                        className="input-field"
                        value={newExpenseRecord.description}
                        onChange={(event) => handleInputChange(event)}
                        placeholder="Description"
                        required
                        aria-label="Expense Description"
                    />
                    <select
                        name="category"
                        className="input-field"
                        value={newExpenseRecord.category}
                        onChange={(event) => setNewExpenseRecord((prev) => ({ ...prev, category: event.target.value }))}
                        placeholder="Category"
                        required
                        aria-label="Expense Category"
                    >
                        <option value="" disabled>Select a category</option>
                        {expenseCategories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>


                    <input
                        type="number"
                        name="amount"
                        className="input-field"
                        value={newExpenseRecord.amount}
                        onChange={(event) => handleInputChange(event)}
                        placeholder="Amount"
                        required
                        aria-label="Expense Amount"
                    />
                    <select
                        name="paymentMethod"
                        className="input-field"
                        value={newExpenseRecord.paymentMethod}
                        onChange={(event) => setNewExpenseRecord((prev) => ({ ...prev, paymentMethod: event.target.value }))}
                        placeholder="Payment Method"
                        required
                        aria-label="Payment Method"
                    >
                        <option value="" disabled>Select Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Wallet">Wallet</option>
                    </select>


                    <Button type="submit" className="add-button" aria-label="Add Expense">
                        Add Expense
                    </Button>
                </form>


                <Table
                    aria-label="Expense Records Table"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                                aria-label="Expense Records Pagination"
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                >
                    <TableHeader>
                        <TableColumn key="date" aria-label="Column: Date">Date</TableColumn>
                        <TableColumn key="description" aria-label="Column: Description">Description</TableColumn>
                        <TableColumn key="category" aria-label="Column: Category">Category</TableColumn>
                        <TableColumn key="amount" aria-label="Column: Amount">Amount</TableColumn>
                        <TableColumn key="paymentMethod" aria-label="Column: Payment Method">Payment Method</TableColumn>
                        <TableColumn key="action" aria-label="Column: Action">Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {items.map((record, index) => (
                            <TableRow key={index} aria-label={`Expense Record Row ${index + 1}`}>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>{record.description}</TableCell>
                                <TableCell>{record.category}</TableCell>
                                <TableCell>{record.amount}</TableCell>
                                <TableCell>{record.paymentMethod}</TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => handleDeleteExpense(index)}
                                        className="delete-button"
                                        aria-label={`Delete Expense Record ${index + 1}`}
                                    >
                                        {/* Delete */}
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 32 32">
                                            <linearGradient id="1rsYkBQg--ZOjOQk1rj-Wa_nTkpTS1GZpkb_gr1" x1="16" x2="16" y1="2.888" y2="29.012" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff624a"></stop><stop offset=".247" stop-color="#ff5940"></stop><stop offset=".672" stop-color="#fd4224"></stop><stop offset="1" stop-color="#fc2c0a"></stop></linearGradient><circle cx="16" cy="16" r="13" fill="url(#1rsYkBQg--ZOjOQk1rj-Wa_nTkpTS1GZpkb_gr1)"></circle><g opacity=".2"><linearGradient id="1rsYkBQg--ZOjOQk1rj-Wb_nTkpTS1GZpkb_gr2" x1="16" x2="16" y1="10.755" y2="21.245" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".1"></stop><stop offset="1" stop-opacity=".7"></stop></linearGradient><path fill="url(#1rsYkBQg--ZOjOQk1rj-Wb_nTkpTS1GZpkb_gr2)" d="M19.995,10.755 c-0.334,0-0.648,0.13-0.884,0.366L16,14.232l-3.111-3.111c-0.236-0.236-0.55-0.366-0.884-0.366c-0.334,0-0.648,0.13-0.884,0.366 c-0.487,0.487-0.487,1.28,0,1.768L14.232,16l-3.111,3.111c-0.487,0.487-0.487,1.28,0,1.768c0.236,0.236,0.55,0.366,0.884,0.366 c0.334,0,0.648-0.13,0.884-0.366L16,17.768l3.111,3.111c0.236,0.236,0.55,0.366,0.884,0.366s0.648-0.13,0.884-0.366 c0.487-0.487,0.487-1.28,0-1.768L17.768,16l3.111-3.111c0.487-0.487,0.487-1.28,0-1.768C20.643,10.885,20.329,10.755,19.995,10.755 L19.995,10.755z"></path></g><linearGradient id="1rsYkBQg--ZOjOQk1rj-Wc_nTkpTS1GZpkb_gr3" x1="16" x2="16" y1="3" y2="29" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".02"></stop><stop offset="1" stop-opacity=".15"></stop></linearGradient><path fill="url(#1rsYkBQg--ZOjOQk1rj-Wc_nTkpTS1GZpkb_gr3)" d="M16,3.25c7.03,0,12.75,5.72,12.75,12.75 S23.03,28.75,16,28.75S3.25,23.03,3.25,16S8.97,3.25,16,3.25 M16,3C8.82,3,3,8.82,3,16s5.82,13,13,13s13-5.82,13-13S23.18,3,16,3 L16,3z"></path><path fill="#fff" d="M17.414,16l3.288-3.288c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0L16,14.586	l-3.288-3.288c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L14.586,16l-3.288,3.288	c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0L16,17.414l3.288,3.288c0.391,0.391,1.024,0.391,1.414,0	c0.391-0.391,0.391-1.024,0-1.414L17.414,16z"></path>
                                        </svg>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
