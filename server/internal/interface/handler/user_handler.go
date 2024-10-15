package handler

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/sessions"
	"github.com/zono0013/MyMuseGolangAPI/internal/usecase"
	"github.com/zono0013/MyMuseGolangAPI/internal/usecase/input"
	"net/http"
)

type UserHandler struct {
	userUseCase usecase.UserUseCase
	store       *sessions.CookieStore
}

func NewUserHandler(userUseCase usecase.UserUseCase, store *sessions.CookieStore) *UserHandler {
	return &UserHandler{
		userUseCase: userUseCase,
		store:       store,
	}
}

func (h *UserHandler) HandleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Handler")
	url := h.userUseCase.GetAuthURL()
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func (h *UserHandler) HandleGoogleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")

	input := input.GoogleAuthCallback{
		Code:  code,
		State: state,
	}

	user, err := h.userUseCase.HandleGoogleCallback(r.Context(), input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// セッションの取得
	session, err := h.store.Get(r, "session-name")
	if err != nil {
		http.Error(w, "Session error", http.StatusInternalServerError)
		return
	}

	// セッションにユーザー情報を保存
	session.Values["user_id"] = user.ID
	session.Values["email"] = user.Email
	session.Values["name"] = user.Name

	// セッションの設定を調整
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   100 * 1,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	if err := session.Save(r, w); err != nil {
		http.Error(w, "Failed to save session", http.StatusInternalServerError)
		return
	}

	// フロントエンドのダッシュボードへリダイレクト
	http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusFound)
}

// 新しいエンドポイント: セッション検証
func (h *UserHandler) CheckSession(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Request: $s", r)
	fmt.Println("CheckSession")
	session, err := h.store.Get(r, "session-name")
	fmt.Println(session.Values["user_id"])
	if err != nil {
		http.Error(w, "Session error", http.StatusInternalServerError)
		return
	}

	if auth, ok := session.Values["user_id"].(string); !ok || auth == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "authenticated"})
}

func (h *UserHandler) HandleLogout(w http.ResponseWriter, r *http.Request) {
	// セッションを取得
	session, err := h.store.Get(r, "session-name")
	if err != nil {
		http.Error(w, "Session error", http.StatusInternalServerError)
		return
	}

	// セッションの値をクリア
	session.Values = make(map[interface{}]interface{})

	// セッションの有効期限を0に設定して、すぐに無効化
	session.Options.MaxAge = -1

	// セッションを保存（これで削除が確定する）
	if err := session.Save(r, w); err != nil {
		http.Error(w, "Failed to clear session", http.StatusInternalServerError)
		return
	}

	fmt.Printf("logout: $s", session.Values)

	// ログインページまたは別のページにリダイレクト
	http.Redirect(w, r, "http://localhost:3000/", http.StatusFound)
}
