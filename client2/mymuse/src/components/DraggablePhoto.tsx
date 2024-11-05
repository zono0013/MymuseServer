import { useDrag, useDrop } from 'react-dnd';
import { PhotoDeleteForm } from "@/components/photo/PhotoDeleteForm";
import { PhotoEdit } from "@/components/photo/PhotoUpdateForm";
import { useAuth } from "@/hooks/useAuth";
import { usePhotoGallery } from "@/hooks/usePhotoGallery";

const ItemType = {
    PHOTO: 'photo',
};

interface Photo {
    ID: number;
    Title: string;
    DetailedTitle?: string;
    Content: string;
}

interface DraggablePhotoProps {
    photo: Photo;
    index: number;
    movePhoto: (fromIndex: number, toIndex: number) => Promise<void>;
}

const DraggablePhoto = ({ photo, index, movePhoto }: DraggablePhotoProps) => {
    const [{ isDragging }, ref] = useDrag({
        type: ItemType.PHOTO,
        item: { id: photo.ID, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const { user, isLoading: authLoading } = useAuth();
    const { isLoading: galleryLoading, error, mutate } = usePhotoGallery(user?.id || null);

    if (authLoading || galleryLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Please log in to view the gallery.</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">Error: {error.message}</div>
            </div>
        );
    }

    const [, drop] = useDrop({
        accept: ItemType.PHOTO,
        hover(item: { id: number; index: number }) {
            if (item.index !== index) {
                movePhoto(item.index, index);
                item.index = index;
            }
        },
    });

    const combinedRef = (node: HTMLDivElement | null) => {
        ref(node);
        drop(node);
    };

    return (
        <div
            ref={combinedRef}
            className={`flex-shrink-0 w-1/4 border rounded-lg p-4 shadow hover:shadow-lg transition-shadow ${isDragging ? 'opacity-50' : ''}`}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', minWidth: '220px' }}
        >
            <h3 className="font-semibold text-lg mb-2">{photo.Title}</h3>
            {photo.DetailedTitle && (
                <p className="text-sm text-gray-600 mb-2">{photo.DetailedTitle}</p>
            )}
            <img src={photo.Content} alt="Photo" className="max-w-full h-auto" />
            <div style={{ padding: '5px', display: 'flex', gap: '5px' }}>
                <PhotoEdit
                    photoId={photo.ID}
                    currentTitle={photo.Title}
                    currentDetailedTitle={photo.DetailedTitle ?? ""}
                    onSuccess={() => mutate(user.id)}
                />
                <PhotoDeleteForm
                    photoId={photo.ID}
                    onDeleteSuccess={() => mutate(user.id)}
                />
            </div>
        </div>
    );
};

export default DraggablePhoto;
