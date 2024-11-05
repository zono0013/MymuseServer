import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PencilSquareIcon } from '@heroicons/react/24/solid'; // Heroiconsからインポート
import { api } from '@/lib/api';
import {UpdateTagData} from "@/types/tag";

interface TagEditFormProps {
    tagId: string;  // 編集するタグのID
    currentName: string;  // 現在のタグ名
    onSuccess?: () => void;  // 編集成功時のコールバック
}

export function TagEditForm({ tagId, currentName, onSuccess }: TagEditFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(currentName);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();

    // ダイアログが開かれたときに、タグ名を初期化
    useEffect(() => {
        setName(currentName);
    }, [currentName, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            setIsSubmitting(true);
            await api.updateTag({
                id: Number(tagId),
                name: name
            });  // APIを呼び出してタグを更新

            toast({
                title: "成功",
                description: "タグが更新されました。",
            });

            setIsOpen(false);
            onSuccess?.();  // コールバック
        } catch (error) {
            toast({
                title: "エラー",
                description: "タグの更新に失敗しました。",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                    <PencilSquareIcon className="w-5 h-5 text-blue-500 mr-2" />
                    編集
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>タグを編集</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            タグ名
                        </label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="タグ名を入力"
                            required
                            className="mt-1"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '更新中...' : '保存'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}