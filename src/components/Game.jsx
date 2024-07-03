import { useEffect, useRef, useState } from "react"

import Player from "./Player"

import PeerInit from "../modules/PeerInit"
import Drawed from "./Drawed"
import Me from "./Me"

import shuffle from "../modules/shuffle"

export default ({ host, join }) => {
    const peers = useRef()

    const [id, setId] = useState()

    const [party, setParty] = useState()

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

        peers.current = p
    }, [host, join])

    const cut = (fromId, toId, cardIndex) => {
        if (party.turn != fromId) return

        const players = [...party.players]

        const destPlayerIndex = players.findIndex(p => p.id == toId)

        const card = players[destPlayerIndex].cards[cardIndex]

        players[destPlayerIndex] = { ...players[destPlayerIndex], cards: players[destPlayerIndex].cards.toSpliced(cardIndex, 1) }

        setParty(p => ({ ...p, players: players, cards: [...p.cards, card] }))
    }

    const startParty = () => {
        if (!host) return

        const nbPlayers = party.players.length
        const nbCards = nbPlayers * 5
        const cards = shuffle([2, ...Array(nbPlayers).fill(1), ...Array(nbCards - nbPlayers - 1).fill(0)])

        const players = [...party.players].map(p => ({ id: p.id, name: p.name, cards: [], role: 0 }))

        players.forEach((p, index) => {
            p.cards = cards.slice(index * 5, index * 5 + 5)
        })

        //AFFECTATION MECHANT
        let nbEvil = 1
        while (nbEvil > 0) {
            let index = Math.floor(Math.random() * nbPlayers)

            if (players[index].role == 0) {
                players[index].role = 1
                nbEvil--
            }
        }

        setParty(p => ({ players: players, cards: [], turn: host }))
    }

    useEffect(() => {
        if (!party && host) {
            setParty({
                started: false,
                players: [
                    {
                        id: host,
                        name: "Host",
                        cards: [0, 2, 1, 0, 0],
                        role: 0,
                    },
                    {
                        id: "1",
                        name: "ltime",
                        cards: [0, 0, 0, 0, 0],
                        role: 0,
                    },
                    {
                        id: "2",
                        name: "Aze",
                        cards: [0, 0, 0, 0, 0],
                        role: 0,
                    },
                ],
                cards: [],
                turn: host,
            })
        }
    }, [party, host])

    useEffect(() => {
        if (!host) return
        if (!peers) return
        peers.current.sendToAll(JSON.stringify({ type: "party", data: party }))
    }, [party, host])

    if (!party) return null

    const players = party?.players?.filter(p => p.role !== undefined)

    const otherPlayers = players.filter(p => p.id != id)
    const localPlayer = players.find(p => p.id == id)

    return (
        <div className="h-full w-full flex flex-col justify-between bg-stone-400 p-2">
            <Drawed party={party} />

            <div className="flex-1 h-full overflow-hidden grid grid-cols-2 items-center justify-center gap-5">
                {otherPlayers.map((player, index) => (
                    <Player player={player} key={index} onCut={(playerId, cardIndex) => cut(id, playerId, cardIndex)} />
                ))}
            </div>

            <button onClick={startParty}>Start</button>

            <Me player={localPlayer} />
        </div>
    )
}
