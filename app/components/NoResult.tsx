import { BiSearchAlt2 } from "react-icons/bi";



export type NoResultsProps = {
    message?: string;
    details?: string;
    button?: React.ReactNode
};

export default function NoResults({ message, details, button }: NoResultsProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-sm bg-gray-50">
            <div className="flex flex-col items-center gap-4 text-center">
                <BiSearchAlt2 className="w-12 h-12 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-700">
                    {message || "No trips found"}
                </h2>
                <p className="text-sm text-gray-500">
                    {details ? details : "Nothing matches your search. Try adjusting the filters or explore other options."}
                </p>
                {button && <div className="mt-4">{button}</div>}
            </div>
        </div>
    );
}
