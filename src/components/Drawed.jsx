import Card from "./Card"

export default ({ party }) => {
    return (
        <div className="flex justify-between">
            <div className="flex -space-x-16 overflow-hidden">
                {party.cards
                    .filter(c => c == 1)
                    .map((card, index) => (
                        <div key={index} className="w-20">
                            <Card key={index} value={card} />
                        </div>
                    ))}
            </div>

            <div className="flex -space-x-16">
                {party.cards
                    .filter(c => c == 0)
                    .map((card, index) => (
                        <div key={index} className="w-20">
                            <Card key={index} value={card} />
                        </div>
                    ))}
            </div>
        </div>
    )
}
