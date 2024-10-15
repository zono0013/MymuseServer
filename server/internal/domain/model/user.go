package model

type User struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
	AccessToken   string `json:"access_token"`
	RefreshToken  string `json:"refresh_token"`
	VerifiedEmail bool   `json:"verified_email"`
}
