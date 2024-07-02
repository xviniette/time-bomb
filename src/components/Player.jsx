import Card from "./Card"

export default ({ player, onCut }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div>{player.name}</div>
            <div className="flex gap-1 w-full">
                {player.cards?.map((card, index) => (
                    <Card key={index} value={card} onClick={() => onCut(player.id, index)} />
                ))}
            </div>
        </div>
    )
}
