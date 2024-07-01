import { useEffect, useState } from "react"
import Game from "./components/Game"
import Home from "./components/Home"
import Rules from "./components/Rules"

export default () => {
    const [join, setJoin] = useState(null)
    const [host, setHost] = useState(null)

    const inGame = join || host

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)

        const host = urlParams.get("host")
        if (host) setHost(host)

        const join = urlParams.get("join")
        if (join) setJoin(join)
    }, [])

    return (
        <div>
            <div className="w-full h-screen">
                {!inGame && <Home onJoin={setJoin} onHost={setHost} />}
                {inGame && <Game join={join} host={host} />}
            </div>
            <div className="container mx-auto">
                <Rules />
            </div>
        </div>
    )
}
