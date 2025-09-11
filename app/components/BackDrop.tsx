type BackdropProp = {
    imageURL?: string;
    title?: string;
    description?: string;
}

export default function BackDrop({ imageURL, title, description }: BackdropProp) {
    return (
        <div
            className="relative flex h-[100vh] items-center justify-start w-full bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url('${imageURL}')` }}
            id="hero"
        >
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="p-6 h-10 md:w-200 mx-[20vw] sm:w-300 flex flex-col gap-8" style={{ fontFamily: "var(--popping)" }}>
                <h2 className="text-white text-2xl md:text-5xl font-bold">
                    " {title}"
                </h2>
                <p className="md:text-2xl">
                    {description}
                </p>
            </div>
        </div>
    )
}