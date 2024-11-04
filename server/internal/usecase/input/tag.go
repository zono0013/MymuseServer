package input

type CreateTagInput struct {
	Name   string `json:"name"`
	UserID string `json:"user_id"`
	Order  int    `json:"order"`
}

type UpdateTagInput struct {
	ID     uint
	Name   string
	UserID string
	Order  int
}
