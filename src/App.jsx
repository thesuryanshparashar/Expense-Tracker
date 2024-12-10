// import CategoryCards from "./components/CategoryCards"
import Container from "./components/Container"
import ExpenseRecords from "./components/ExpenseRecords"

import "./App.css"
// import CategoryCards from "./components/CategoryCards"

const App = () => {
  return (
    <Container>
      {/* <CategoryCards expenseRecords={expenseRecords} expenseCategories={expenseCategories} /> */}
      <h1>Expense Tracker</h1>
      <ExpenseRecords />
      {/* <CategoryCards /> */}
    </Container>
  )
}

export default App
