'use client';

import { useRouter } from 'next/navigation';
import { usePhotoGallery } from '@/hooks/usePhotoGallery';
import { useAuth } from '@/hooks/useAuth';
import { TagCreateForm } from '@/components/tag/TagCreateForm';
import { PhotoCreateForm} from '@/components/photo/PhotoCreateForm';
import { PhotoDeleteForm } from '@/components/photo/PhotoDeleteForm';
import { PhotoEdit } from "@/components/photo/PhotoUpdateForm";
import {TagEditForm} from "@/components/tag/TagUpdateForm";
import {TagDeleteForm} from "@/components/tag/TagDeleteForm";


export default function HomePage() {
    const router = useRouter();
    const { user, isLoading: authLoading, checkSession } = useAuth();
    const { data, isLoading: galleryLoading, error, mutate } = usePhotoGallery(user?.id || null);

    if (authLoading) {
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

    if (galleryLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading photos...</div>
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

    return (
        <div
            className="grid grid-rows-[20px_minmax(calc(100vh-160px),1fr)_20px_minmax(calc(100vh-180px),1fr)]
  items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20"
            style={{fontFamily: 'var(--font-geist-sans)'}}
        >
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="">
                    <p className="custom-paragraph">
                        バーチャルで
                    </p>
                    <br/>
                    <br/>
                    <p className="custom-paragraph2">
                        あなただけの
                        <br/>
                        <br/>
                        美術館を作ろう
                    </p>
                </div>
            </main>
            <div className="row-start-4 border rounded-lg p-4 shadow bg-white overflow-y-auto " style={{ width: 'calc(100vw - 160px)', minHeight: 'calc(100vh - 240px)' }}>
                {data?.tags === null ? (
                    <p className="text-gray-500">まだ部屋がありません。</p>
                ) : ( data?.tags.map((tag) => (
                        <div
                            key={tag.ID}
                            className="mb-8"
                            style={{
                                backgroundImage: 'url("/spring.svg")',
                                backgroundPosition: 'center',
                                backgroundSize: '1300px 650px', // 固定サイズ
                                backgroundRepeat: 'no-repeat',
                                width: '100%', // 必要に応じて親要素の幅を調整
                                overflow: 'hidden', // はみ出た部分を隠す
                            }}
                        >
                            <div
                                style={{
                                    padding: '10px',
                                    display: 'flex',
                                    gap: '20px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    alignItems: 'center'
                                }}
                            >
                                <div className="text-xl font-semibold">{tag.name}</div>
                                <TagEditForm
                                    tagId={tag.ID} currentName={tag.name}
                                    onSuccess={() => mutate(user.id)}
                                />

                                <TagDeleteForm
                                    tagId={tag.ID}
                                    onDeleteSuccess={() => mutate(user.id)}
                                    disabled={(tag.photos?.length ?? 0) !== 0}
                                />

                                <PhotoCreateForm
                                    tagId={tag.ID}
                                    existingPhotosCount={tag.photos?.length ?? 0}
                                    onSuccess={() => mutate(user.id)}
                                />
                            </div>
                            {tag.photos === null ? (
                                <p className="text-gray-500">部屋の中に写真がありません。</p>
                            ) : (
                                <div className="flex overflow-x-auto gap-4"
                                     style={{margin: '10px', padding: '0 10px 10px 10px',}}
                                >
                                    {tag.photos.map((photo) => (
                                        <div
                                            key={photo.ID}
                                            className="flex-shrink-0 w-1/4 border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                                            style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', minWidth: '220px'}}
                                        >
                                            <h3 className="font-semibold text-lg mb-2">{photo.Title}</h3>
                                            {photo.DetailedTitle && (
                                                <p className="text-sm text-gray-600 mb-2">{photo.DetailedTitle}</p>
                                            )}
                                            <img src={photo.Content} alt="Photo" className="max-w-full h-auto"/>
                                            <div style={{padding: '5px', display: 'flex', gap: '5px'}}>
                                                <PhotoEdit
                                                    photoId={photo.ID}
                                                    currentTitle={photo.Title}
                                                    currentDetailedTitle={photo.DetailedTitle}
                                                    onSuccess={() => mutate(user.id)}
                                                />
                                                <PhotoDeleteForm
                                                    photoId={photo.ID}
                                                    onDeleteSuccess={() => mutate(user.id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
                <TagCreateForm
                    existingTagsCount={data?.tags?.length ?? 0}
                    onSuccess={() => mutate(user.id)} // データを再取得
                />
            </div>
        </div>
    );
}