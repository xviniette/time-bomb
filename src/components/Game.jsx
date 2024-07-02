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
        console.log(fromId, toId, cardIndex)
        if (party.turn != fromId) return

        const players = [...party.players]

        const destPlayerIndex = players.findIndex(p => p.id == toId)

        const card = players[destPlayerIndex].cards[cardIndex]

        players[destPlayerIndex] = { ...players[destPlayerIndex], cards: players[destPlayerIndex].cards.toSpliced(cardIndex, 1) }

        setParty(p => ({ ...p, players: players, cards: [...p.cards, card] }))
    }

    const start = () => {
        const players = [...party.players].map(p => ({ id: p.id, name: p.name, cards: [], role: 0 }))

        setParty(p => ({ players: players, cards: [], turn: players[Math.floor(Math.random() * players.length)].id }))
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
                        cards: [0, 1, 0],
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
                cards: [0, 0, 0, 2, 1],
            })
        }
    }, [host])

    useEffect(() => {
        if (!host) return
        if (!peers) return
        peers.sendToAll(JSON.stringify({ type: "party", data: party }))
    }, [party, host])

    if (!party) return null

    const players = party?.players?.filter(p => p.role !== undefined)

    const otherPlayers = players.filter(p => p.id != id)
    const localPlayer = players.find(p => p.id == id)

    return (
        <div className="h-full w-full flex flex-col justify-between bg-amber-900">
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
            <div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-5">
                {otherPlayers.map((player, index) => (
                    <Player
                        player={player}
                        key={index}
                        onCut={(playerId, cardIndex) => {
                            console.log("ok")
                            cut(id, playerId, cardIndex)
                        }}
                    />
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
