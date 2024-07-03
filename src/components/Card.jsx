import clsx from "clsx"

export default ({ value, onClick, hidden }) => {
    const cardEmoji = ["", "✂️", "💣"]

    return (
        <div
            className={clsx(
                "rounded-lg shadow-xl aspect-[0.7] max-w-full max-h-full border select-none flex justify-center items-center text-5xl duration-150",
                onClick && "hover:-translate-y-1 cursor-pointer",
                hidden ? "bg-red-400" : "bg-white"
            )}
            onClick={onClick}
        >
            {!hidden && cardEmoji[value]}
        </div>
    )
}
