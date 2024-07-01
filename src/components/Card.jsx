import clsx from "clsx"

export default ({ value, onClick }) => {
    const cardEmoji = ["", "✂️", "💣"]

    return (
        <div
            className={clsx(
                "bg-white rounded-lg shadow-xl aspect-[0.7] w-full border select-none flex justify-center items-center text-5xl duration-150",
                onClick && "hover:-translate-y-2 cursor-pointer",
                value == null && "bg-red-400"
            )}
        >
            {cardEmoji[value]}
        </div>
    )
}
