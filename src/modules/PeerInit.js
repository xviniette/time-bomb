import Peers from "./Peers"

export default ({ join, host, onId }) => {
    let id = null

    const peers = new Peers()

    const socket = new WebSocket("ws://18.202.177.226:3000")
    peers.on("peer", data => socket.send(JSON.stringify({ type: "peer", data })))

    if (host) socket.addEventListener("open", () => socket.send(JSON.stringify({ type: "id", data: host })))

    socket.addEventListener("message", event => {
        try {
            let { type, data } = JSON.parse(event.data)
            switch (type) {
                case "id":
                    id = data
                    if (onId) onId(data)
                    if (join) peers.setPeer({ id: join, caller: true })
                    break
                case "peer":
                    peers.setPeer(data)
                    break
            }
        } catch (error) {}
    })

    return peers
}
