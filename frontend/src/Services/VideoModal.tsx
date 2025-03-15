import { FC } from "react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

export const VideoModal: FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div className="relative max-w-full max-h-full p-4">
                <video
                    src={videoUrl}
                    controls
                    className="max-w-full max-h-screen"
                    autoPlay
                />
                <button
                    className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};