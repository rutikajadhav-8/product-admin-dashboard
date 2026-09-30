export default function ConfirmModel({open, title, message, onConfirm, onCancel}){

    if(!open) return null;

    return(
        <div className="flex items-center justify-center rounded fixed inset-0 bg-black/50">

           <div className="bg-amber-200 rounded-lg p-6 w-80 shadow-lg">
            <h2 className="font-semibold text-lg mb-2">{title || "Are you sure?"}</h2>
            <p className="text-gray-700 mb-5">{message}</p>

            <div className="flex gap-2 justify-center">
                <button
                   onClick={onCancel}
                   className="border rounded px-4 py-1 bg-gray-100 "
                >Cancel</button>

                <button
                   onClick={onConfirm}
                   className="border rounded px-4 py-1 bg-gray-100 "
                >Delete</button>
            </div>

           </div>

        </div>
    );
}