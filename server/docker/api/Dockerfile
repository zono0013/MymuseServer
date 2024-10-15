# Goのベースイメージを指定
FROM golang:1.23-alpine

# ワーキングディレクトリを設定
WORKDIR /app

# ソースコードをコピー
COPY ../.. .

# 依存関係をダウンロード
RUN go mod download


# アプリケーションをビルド
RUN go build -o main ./cmd/api

# コンテナが起動したときのコマンドを指定
CMD ["./main"]
