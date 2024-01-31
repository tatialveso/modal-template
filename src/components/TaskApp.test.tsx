import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from "../App"
import TaskApp from "./TaskApp"

test('demo', () => {
    expect(true).toBe(true)
})

test('renders the main page', () => {
    render(<App />)
    expect(true).toBeTruthy()
})

test('renders task app', () => {
    render(<TaskApp />)
    expect(true).toBeTruthy()
})

test('opens modal when button clicked', () => {
    render(<TaskApp/>)
    const openBtn = screen.getByRole('button', {name: "Adicionar tarefa"})
    fireEvent.click(openBtn)
    const modal = screen.getByTestId('modal')
    expect(modal).toBeVisible()
})