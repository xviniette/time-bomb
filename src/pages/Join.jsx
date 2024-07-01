import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import PeerInit from "../modules/PeerInit"

export default () => {
    let { lobby } = useParams()

    const [lobbyId, setLobbyId] = useState()

    const [id, setId] = useState()
    const [peers, setPeers] = useState()
    const [state, setState] = useState()

    useEffect(() => {
        setLobbyId(lobby)
    }, [lobby])

    useEffect(() => {
        if (!lobbyId) return
        const peers = PeerInit({ lobby: lobbyId, onId: id => setId(id) })

        peers.on("message", message => {
            try {
                const { type, data } = JSON.parse(message.event.data)

                switch (type) {
                    case "state":
                        setState(data)
                        break
                }
            } catch (error) {}
        })

        setPeers(peers)
    }, [lobbyId])

    const me = state?.players?.find(p => p.id == id)
    const send = message => peers.sendTo(lobby, JSON.stringify(message))

    return (
        <div className="w-screen h-screen flex items-center justify-center p-2">
            {/* {JSON.stringify(state)} */}
            {!state ? (
                <div>CONNECTING</div>
            ) : (
                <div>
                    {!me && (
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                                send({ type: "join", data: { name: e.target[0].value } })
                            }}
                        >
                            <input
                                type="text"
                                className="text-3xl p-5 rounded-lg outline-none text-center"
                                value={me?.name}
                                placeholder="Player name"
                            />
                            <input type="submit" value="Connect" />
                        </form>
                    )}
                </div>
            )}
            {state?.answers && (
                <div className="w-full h-full flex flex-col">
                    <div className="grid grid-cols-2 w-full h-full gap-2">
                        {state.answers.map((answer, answerIndex) => (
                            <button
                                key={answerIndex}
                                onClick={() => send({ type: "answer", data: answerIndex })}
                                className="flex items-center justify-center bg-red-500 rounded text-white"
                            ></button>
                        ))}
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-xl font-bold">{me?.name || "Vincent Bazia"}</span>
                        <span className="px-5 py-2 bg-stone-800 text-white font-extrabold text-xl">{me?.score}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
