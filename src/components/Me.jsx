import Card from "./Card"

export default ({ player }) => {
    const roleEmoji = ["😇", "😈"]

    return (
        <div className="flex justify-between items-end">
            {player?.name}

            <div className="flex justify-center gap-1">
                {player?.cards.map((card, index) => (
                    <Card key={index} value={card} />
                ))}
            </div>

            <div>{roleEmoji[player?.role]}</div>
        </div>
    )
}
