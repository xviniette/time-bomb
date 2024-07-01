import { useEffect, useState, useRef, useMemo } from "react"

import PeerInit from "../modules/PeerInit"
import QRCode from "react-qr-code"

import { useParams } from "react-router-dom"

import indexedDB from "../modules/indexedDB"

export default ({}) => {
    let { quizId } = useParams()

    const [id, setId] = useState()

    const peers = useRef()

    const [players, setPlayers] = useState([])
    const [quiz, setQuiz] = useState()
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const fetchQuiz = async id => {
        let quiz = await (await indexedDB).get("quizs", id * 1)
        if (!quiz) return
        setQuiz(q => ({ ...q, ...quiz }))
    }

    useEffect(() => {
        if (!quizId) return
        fetchQuiz(quizId)
    }, [quizId])

    useEffect(() => {
        const poors = PeerInit({ onId: id => setId(id) })

        poors.on("open", data =>
            setPlayers(p => [...p, { id: data.peer.id, name: "New Player " + Math.floor(Math.random() * 99999), answers: [], score: 0 }])
        )
        poors.on("close", data => setPlayers(players => players.filter(p => p.id !== data.peer.id)))
        poors.on("message", message => {
            try {
                let playerId = message.peer.id
                console.log(playerId)
                let { type, data } = JSON.parse(message.event.data)

                switch (type) {
                }
            } catch (error) {}
        })

        peers.current = poors
    }, [])

    const state = useMemo(() => {
        return { players, answers: quiz?.questions[currentQuestion]?.answers }
    }, [players, quiz, currentQuestion])

    useEffect(() => {
        broadcast()
    }, [state])

    const broadcast = () => {
        const json = JSON.stringify({ type: "state", data: state })
        players.forEach(p => peers.current.sendTo(p.id, json))
    }

    const url = window.location.origin + "/#/join/" + id

    return (
        <div className="h-screen w-screen bg-purple-500 flex flex-col justify-between">
            <div className="flex justify-between items-center p-2 bg-white">
                <div>
                    <h1>Join the quiz :</h1>
                    <a href={url} target="_blank" className="text-3xl font-bold">
                        {url}
                    </a>
                </div>

                {url && (
                    <a href={url} target="_blank">
                        <div className="h-40">
                            <QRCode size={256} style={{ height: "100%", width: "100%" }} value={url} viewBox={`0 0 256 256`} />
                        </div>
                    </a>
                )}
            </div>

            <div className="grid grid-cols-3 gap-2">
                {players.map((player, playerIndex) => (
                    <div key={playerIndex} className="bg-white px-4 py-2 rounded-lg text-2xl font-light">
                        {player.name}
                    </div>
                ))}
            </div>

            <button onClick={() => setCurrentQuestion(q => q + 1)} className="text-4xl px-5 py-2 bg-gray-100 hover:bg-white font-bold">
                Start - {players.length} player{players.length > 1 ? "s" : ""}
            </button>
        </div>
    )
}
