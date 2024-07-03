import Card from "./Card"

export default ({ player, onCut }) => {
    return (
        <div className="flex flex-col justify-center items-center h-40">
            <div className="font-bold text-3xl">{player.name}</div>
            <div className="flex justify-center gap-4 h-60 w-full">
                {player.cards?.map((card, index) => (
                    <Card hidden={true} key={index} value={card} onClick={() => onCut(player.id, index)} />
                ))}
            </div>
        </div>
    )
}
