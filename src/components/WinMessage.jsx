export const WinMessage = ({moves}) => {
    return (
        <div className="win-message">
            <h2>Congratulations</h2>
            <p>You completd this game in {moves} moves!</p>
        </div>
    )
}