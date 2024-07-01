import { useState } from "react"

export default ({ onJoin, onHost }) => {
    const [code, setCode] = useState("")

    return (
        <div className="h-full w-full flex items-center justify-center flex-col gap-2 bg-gray-800 text-white">
            <h1 className="text-4xl font-extrabold text-center">Time Bomb Online</h1>

            <button className="text-2xl text-black bg-white rounded-lg w-full w-80" onClick={() => onHost(Math.floor(Math.random() * 99999999))}>
                Create party
            </button>

            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        onJoin(code)
                    }}
                >
                    <input type="text" placeholder="Code" value={code} onChange={e => setCode(e.target.value)} />
                    <button type="submit">Join party</button>
                </form>
            </div>
        </div>
    )
}
