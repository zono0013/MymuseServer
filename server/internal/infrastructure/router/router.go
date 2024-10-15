package router

import (
	"github.com/zono0013/MyMuseGolangAPI/internal/interface/handler"
	"github.com/zono0013/MyMuseGolangAPI/internal/interface/middleware"
	"net/http"
)

func NewRouter(userHandler *handler.UserHandler) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/auth/google/login", userHandler.HandleGoogleLogin)
	mux.HandleFunc("/auth/google/callback", userHandler.HandleGoogleCallback)
	mux.HandleFunc("/check-session", userHandler.CheckSession)
	mux.HandleFunc("/logout", userHandler.HandleLogout)

	handler := middleware.CORS(mux)
	return middleware.ApplyMiddleware(handler)
}
