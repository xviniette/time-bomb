import { useState, useEffect } from "react"

import Card from "./Card"
import Player from "./Player"

import PeerInit from "../modules/PeerInit"

export default ({ host, join }) => {
    const [peers, setPeers] = useState()

    const [id, setId] = useState(null)
    const [party, setParty] = useState()

    const roleEmoji = ["😇", "😈"]

    useEffect(() => {
        const p = PeerInit({ host, join, onId: id => setId(id) })

        p.on("open", data => host && setParty(p => ({ ...p, players: [...p.players, { id: data.peer.id, name: "New player" }] })))
        p.on("close", data => host && setParty(p => ({ ...p, players: p.players.filter(p => p.id !== data.peer.id) })))

        p.on("message", message => {
            try {
                let playerId = message.peer.id

                let { type, data } = JSON.parse(message.event.data)

                console.log(type, data)

                switch (type) {
                    case "party":
                        setParty(data)
                        break
                    case "cut":
                        if (!host) return

                        break
                }
            } catch (error) {}
        })

        setPeers(p)
    }, [host, join])

    const cut = (fromId, toId, cardIndex) => {
        if (party.turn != fromId) return

        const players = [...party.players]

        const destPlayer = players.find(p => p.id == toId)

        const card = destPlayer.cards[cardIndex]

        destPlayer.cards.splice(cardIndex, 0)

        setParty(p => ({ ...p, turn: toId, players: players, cards: [...p.cards, card] }))
    }

    useEffect(() => {
        if (!party && host) {
            setParty({
                players: [
                    {
                        id: host,
                        name: "Host",
                        cards: [0, 2, 1, 0, 0],
                        role: 0,
                    },
                    {
                        id: "465454",
                        name: "Host",
                        cards: [0, 0, 0, 0],
                        role: 0,
                    },
                    {
                        id: "8465123",
                        name: "Host",
                        cards: [0, 0, 0],
                        role: 0,
                    },
                    {
                        id: "25455",
                        name: "Host",
                        cards: [0, 0, 0, 0],
                        role: 0,
                    },
                ],
                turn: host,
                cards: [],
            })
        }
    }, [host])

    useEffect(() => {
        if (!host) return
        if (!peers) return
        peers.sendToAll(JSON.stringify({ type: "party", data: party }))
    }, [party, host])

    if (!party) return null

    const players = party?.players?.filter(p => p.cards && p.cards.length > 0)

    const otherPlayers = players.filter(p => p.id != id)
    const localPlayer = players.find(p => p.id == id)

    return (
        <div className="h-full w-full flex flex-col justify-between bg-amber-900">
            <div></div>
            <div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-5">
                {otherPlayers.map((player, index) => (
                    <Player player={player} key={index} />
                ))}
            </div>
            <div className="flex justify-between items-end">
                {localPlayer?.name}

                <div className="flex justify-center gap-1">
                    {localPlayer?.cards.map((card, index) => (
                        <Card key={index} value={card} />
                    ))}
                </div>

                <div>{roleEmoji[localPlayer?.role]}</div>
            </div>
        </div>
    )
}
