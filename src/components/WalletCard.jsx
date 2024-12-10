import { useState } from "react"
import { Button, Alert } from "@nextui-org/react"

export default function WalletCard({ walletBalance, setWalletBalance }) {
    // Update wallet balance and localStorage together
    const updateWalletBalanceInStorage = (newBalance) => {
        setWalletBalance(newBalance)
        localStorage.setItem("walletBalance", JSON.stringify(newBalance))
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [amountToAdd, setAmountToAdd] = useState("")
    const [isAlertVisible, setIsAlertVisible] = useState(false)


    // Handle adding balance
    const handleAddBalance = () => {
        setIsModalOpen(true)
    }

    const handleSaveBalance = () => {
        const parsedAmount = parseFloat(amountToAdd)
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
            setTimeout(() => {
                updateWalletBalanceInStorage(walletBalance + parsedAmount)
                setIsModalOpen(false)
                setAmountToAdd("")
            }, 300)
        } else {
            setIsAlertVisible(true)
            setTimeout(() => setIsAlertVisible(false), 3000)
        }

    }

    const handleCancel = () => {
        setTimeout(() => {
            setIsModalOpen(false)
            setIsAlertVisible(false)
            setAmountToAdd("")
        }, 300)
    }

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains("modal-backdrop")) {
            setIsModalOpen(false)
            setIsAlertVisible(false)
            setAmountToAdd("")
        }
    }

    const alertStyle = {
        background: "#312107c0",
        position: "fixed",
        top: "20px",
        // margin: "1rem auto",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "9999",
        width: "max-content",

    }

    return (
        <>
            <div className="wallet-card-container">
                <div className="wallet-card">
                    <h3 className="categories-item_title">Wallet Balance</h3>
                    <p className="categories-amount">₹ {walletBalance.toFixed(2)}</p>
                    <Button
                        className="add-balance-btn"
                        onPress={handleAddBalance}
                        radius="full"
                    >
                        Add Balance
                    </Button>
                </div>
            </div>

            {isAlertVisible && (
                <Alert color="warning" className="valid-amount-alert" title="Please enter a valid amount" style={alertStyle} />
            )}

            {isModalOpen && (
                <div className="modal-backdrop" onClick={handleBackdropClick}>
                    <div className="modal">
                        <h2>Add Wallet Balance</h2>
                        <input
                            type="number"
                            value={amountToAdd}
                            onChange={(e) => setAmountToAdd(e.target.value)}
                            placeholder="Enter amount"
                            className="input-field model-amount-input"
                        />
                        <div className="modal-actions">
                            <Button onPress={handleSaveBalance} className="save-button">Save</Button>
                            <Button onPress={handleCancel} className="cancel-button">Cancel</Button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
